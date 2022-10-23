import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE - Usa un "if" por cada ruta 

// This function can be marked 'async' if using 'await' inside
export function middleware(req: NextRequest) {

   // const resp = req.nextUrl.pathname
   if (req.nextUrl.pathname.startsWith('/api/entries/')) {
      const id = req.nextUrl.pathname.replace('/api/entries/', '')
      const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

      if (!checkMongoIDRegExp.test(id)) {
         const url = req.nextUrl.clone();

         url.pathname = '/api/bad-request';
         //esto agrega a la url este mensaje que es recibido en bad-request
         url.search = `?message=${id} id not a valid MongoId🤦‍♂️`;

         return NextResponse.rewrite(url);
      }
   }

   return NextResponse.next();
}


// NOTE - Aquí indicas con que rutas disparas este middleware

// See "matching Paths" below to learn more
export const config = {
   // matcher: '/about'
   matcher: [
      // '/api/:path', 
      '/api/entries/:path/'
   ]
}