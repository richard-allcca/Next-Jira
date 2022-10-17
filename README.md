# Next - Open Jira

- Detalles

## Getting Started - Se utilizo `yarn` en lugar de `npm`

First, run the development server:

```bash
   npm run dev
   # or
   yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependecias

``` npm
   yarn add @mui/material @emotion/react @emotion/styled
   yarn add @mui/icons-material
   yarn add uuid
```

## Enlaces

- [Material UI](https://mui.com/)
- [Drag & Drop react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)

## Curiosidades - Errores y Ocurrencias

1. Curiosidad: Quitar el scroll Y and X en
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
