import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { UIContext } from './../../context/ui-context/UIContext';
import { Entry } from '../../interfaces';

import { getCreationDate } from '../../utils';
interface Props {
  entry: Entry;
}

// NOTE - La propiedad "draggable" no es soportada en Brave

export const EntryCard: FC<Props> = ({ entry }) => {

  const { startDraging, endDraging: stopDraging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id);
    startDraging();
  };

  const onDragEnd = () => {
    stopDraging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      draggable
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
            <Typography variant="body2">{getCreationDate(entry.createAt)}</Typography>
          </CardActions>
        </CardContent>
      </CardActionArea>

    </Card>
  );
};
