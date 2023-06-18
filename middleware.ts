import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE - Usa un "if" por cada ruta - This function can be marked 'async' if using 'await' inside

export function middleware(req: NextRequest) {
	// const pathUsedInRequest = req.nextUrl.pathname
	if (req.nextUrl.pathname.startsWith("/api/entries/")) {
		const id = req.nextUrl.pathname.replace("/api/entries/", ""); //remove path to get id

		const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
		if (!checkMongoIDRegExp.test(id)) {
			const url = req.nextUrl.clone();
			url.pathname = "/api/bad-request"; // change rute (reditection)
			url.search = `?message=${id} id not a valid MongoId`; //add msj in request

			return NextResponse.rewrite(url); //send response whith new route and msj
		}
	}
	return NextResponse.next(); // whithout fail continue
}

export const config = {
	matcher: [
		// ruta o rutas que disparan este middleware
		// '/api/:path',
		"/api/entries/:path/",
	],
};
