# Next.js - Open Jira app

- Detalles

## Para correr en local - Se utilizo `yarn` en lugar de `npm`

- First, run the development server:

      ```bash
         npm run dev
         # or
         yarn dev
      ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuararciones iniciales

1. Reconstruir los modulos con `npm i`

   - Importante agregar `mongo/` al gitignore

2. Para correr en local se necesita la base de datos

         ``` Docker
            docker-compose up -d
         ```

   - El -d, significa __detached__

3. Configuarar variables de entorno

   - Renombrar crear el archivo __.env.example__ a __.env__

4. MongoDB URL Local, para conexion con la base de datos.

         ``` URI
            mongodb://localhost:27017/entriesdb
         ```

5. Llenar la base de datos con información de prueba

   - use GET

         ```url
         http://localhost:3000/api/seed
         ```

## Dependecias

         ``` npm
            yarn add @mui/material @emotion/react @emotion/styled
            yarn add @mui/icons-material
            yarn add uuid
            yarn add notistack
            yarn add date-fns
         ```

## Enlaces

   - [Material UI](https://mui.com/)
   - [Drag & Drop react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)
   - [Codigos de respuesta http](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
   - [Middleware Next](https://nextjs.org/docs/advanced-features/middleware)
   - [Guia de migración Middleware Next](https://nextjs.org/docs/messages/middleware-upgrade-guide#breaking-changes)
   - [Snackbar](https://mui.com/material-ui/react-snackbar/)
   - [notistack](https://github.com/iamhosseindhv/notistack)
   - [date-fns](https://date-fns.org/)

## Notas - Errores y Ocurrencias

   1. Nota: Quitar el scroll Y and X en
      - ejemplo en pages "EntryLlist" ln/9

            ```styles Paper

               const stylesPaper = {
                  height: "calc(100vh - 180px)",
                  overflow: "scroll",
                  backgroundColor: "transparent",
                  padding: "1px 5px",
                  "&::-webkit-scrollbar": { display: "none" },
                  
               };
            ```

   2. Ocurrencia: La Propiedad `draggable` de Card no es soportada en "Brave"

   3. Nota: con Next puedes usar variables de entorno anteponiendo `NEXT_PUBLIC_NAME`

   4. Nota: Expresión regular para validar `Mongo Id`

            ```REGEXP
               const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            ```

   5. Nota: uso de `notisnack` ejemplo en `EntriesProvider`;
   6. Nota: uso de `date-fns` ejemplo en `EntryCards` implementación en `utils`

## Temas tocados en este proyecto

### Sección 7

   1. Manejo del contexto

   2. Material UI

   3. Temas de Material UI

   4. Creación de snippets

### Sección 9

   1. MongoDB

   2. Docker-compose

   3. Volumenes de docker

   4. Semillas de base de datos

   5. Validaciones

   6. Next.js Middlewares (Nuevo desde Next.js 12.0.0)

   7. Crear en base de datos

   8. Actualizar en base de datos

   9. Leer desde base de datos

   10. Mantener persistente nuestra data
