import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { EntryModel, IEntry } from "../../../models";

type Data = { message: string } | IEntry[] | IEntry;

// http://localhost:3000/api/entries
export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getEntries(res);

		case "POST":
			return postEntry(req, res);

		default:
			res.status(400).json({ message: "Endpoint no existe" });
	}
}

const getEntries = async (res: NextApiResponse<Data>) => {
	try {
		await db.connect();
		const entries = await EntryModel.find().sort({ createdAt: "ascending" });
		await db.disconnect();

		res.status(200).json(entries);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "No se pudo encontrar entradas",
		});
	}
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { description } = req.body;

	if (!description)
		return res.status(400).json({ message: "Descripción es requerida" });

	const newEntry = new EntryModel({
		description,
		createAt: Date.now(),
	});

	try {
		await db.connect();
		await newEntry.save();
		await db.disconnect();

		return res.status(201).json(newEntry);
	} catch (error) {
		await db.disconnect();
		console.log(error);
		return res
			.status(500)
			.json({ message: "Algo salio mal, revisar consola del servidor" });
	}
};
