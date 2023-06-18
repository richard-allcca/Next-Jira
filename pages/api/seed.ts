import { NextApiResponse, NextApiRequest } from "next";
import { db, seedData } from "../../database";
import { EntryModel } from "../../models";

type Data = {
	ok: boolean;
	message: string;
};

// IMPORTANT - DO NOT USE THIS FILE - IT IS ONLY FOR DEVELOPMENT - CHARGE FIRST DATA IN DDBB

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
  // evita pugar la db en prod
	if (process.env.NODE_ENV === "production") {
		return res
			.status(401)
			.json({ ok: false, message: "No tiene acceso a este servicio" });
	}

	db.connect();

	await EntryModel.deleteMany(); // NOTE - esto elimina toda la base de datos
	await EntryModel.insertMany(seedData.entries);

  db.disconnect();

	res.status(200).json({
    ok: true,
		message: "Proceso terminado correctamente",
	});
}
