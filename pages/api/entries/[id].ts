import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { EntryModel } from "../../../models";
import { IEntry } from "./../../../models/Entry";

type Data = { message: string } | IEntry;

// http://localhost:3000/api/entries/[mongoId]
export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id))
		res.status(400).json({ message: "El id no es valido" + id });

	switch (req.method) {
		case "GET":
			return getEntry(req, res);

		case "PUT":
			return updateEntry(req, res);

		default:
			res.status(400).json({ message: "Metodo invalido" });
	}
}

/**
 * NOTE - peticion para obtener una entrada con id
 * NOTE - peticion no implementada en el cliente solo demo
 * @param req mongoId
 * @param res Entry
 */
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
		const updatedEntry = await EntryModel.findByIdAndUpdate(
			id,
			{ description, status },
			{ runValidators: true, new: true }//runValidators(valida status?) - new(retorna info nueva?)
		);

		await db.disconnect();
		res.status(200).json(updatedEntry!);
	} catch (error: any) {
		console.log(error);
		await db.disconnect();
		res.status(400).json({ message: error.errors.status.message });
	}
};

