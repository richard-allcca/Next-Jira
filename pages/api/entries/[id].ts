import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { EntryModel } from "../../../models";
import { IEntry } from "./../../../models/Entry";

type Data = { message: string } | IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		res.status(400).json({ message: "El id no es valido" + id });
	}

	switch (req.method) {
		case "PUT":
			return updateEntry(req, res);

		case "GET":
			return getEntry(req, res);

		default:
			res.status(400).json({ message: "Metodo invalido" });
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();

	const entryToUpdate = await EntryModel.findById(id);

	if (!entryToUpdate) {
		await db.disconnect();
		res.status(400).json({ message: `No hay entrada con el id: ${id}` });
	}

	const {
		description = entryToUpdate?.description,
		status = entryToUpdate?.status,
	} = req.body;

	try {
		// NOTE - runValidators: valida que el estatus sea un valido indicado en la interface
		// -  new: retorna la información actualizada
		const updatedEntry = await EntryModel.findByIdAndUpdate(
			id,
			{ description, status },
			{ runValidators: true, new: true }
		);

		await db.disconnect();
		res.status(200).json(updatedEntry!);
	} catch (error: any) {
		console.log(error);
		await db.disconnect();
		res.status(400).json({ message: error.errors.status.message });
	}
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();

	const entryDb = await EntryModel.findById(id);

	await db.disconnect();

	if (!entryDb) {
		db.disconnect();
		res.status(400).json({ message: `La entrada con el id: ${id} no existe` });
	}

	res.status(200).json(entryDb!);
};
