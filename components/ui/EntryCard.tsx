import { DragEvent, FC, useContext } from 'react';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { UIContext } from './../../context/ui-context/UIContext';
import { Entry } from '../../interfaces';

interface Props {
   entry: Entry;
}


export const EntryCard: FC<Props> = ({ entry }) => {

   const { startDraging, stopDraging } = useContext(UIContext)

   const onDragStart = (event: DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData('text', entry._id)
      // TODO - modificar el estado, para indicar que estoy haciendo el drag
      startDraging();
   }

   const onDragEnd = () => {
      stopDraging();
   }

   return (
      <Card
         sx={{ marginBottom: 1 }}
         draggable={true}
         onDragStart={onDragStart}
         onDragEnd={onDragEnd}
      >
         <CardActionArea>
            <CardContent>
               <Typography sx={{ whiteSpace: "pre-line" }}>
                  {entry.description}
               </Typography>

               <CardActions
                  sx={{
                     display: "flex",
                     justifyContent: "end",
                     paddingRight: 2,
                  }}
               >
                  <Typography variant="body2">hace 30 minutos</Typography>
               </CardActions>
            </CardContent>
         </CardActionArea>

      </Card>
   );
}

// NOTE - La propiedad "draggable" no es soportada en Brave