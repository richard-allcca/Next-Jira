import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo, DragEvent } from 'react';
import { EntriesContext } from '../../context/entries';

import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { UIContext } from './../../context/ui-context/UIContext';

import styles from './EntryList.module.css'
interface Props {
   status: EntryStatus
}


export const EntryList: FC<Props> = ({ status }) => {

   const { entries, changeStateEntry } = useContext(EntriesContext)
   const { isDraging, stopDraging } = useContext(UIContext)

   const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries]);

   const allowDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

   }

   const onDropEntry = (event: DragEvent<HTMLDivElement>) => {

      const id = event.dataTransfer.getData('text');

      const selectEntry = entries.find((e) => e._id === id)!;
      selectEntry.status = status;
      changeStateEntry(selectEntry)

      stopDraging();
   }

   return (
      <div onDrop={onDropEntry}
         onDragOver={allowDrop}
         className={isDraging ? styles.dragging : ''}
      >

         <Paper sx={{ "&::-webkit-scrollbar": { display: "none" } }} className={styles.paper} >

            <List sx={{ opacity: isDraging ? 0.2 : 1, transition: 'all .3s' }}>
               {
                  entriesByStatus.map((entry) => {
                     return <EntryCard key={entry._id} entry={entry} />
                  })
               }
            </List>

         </Paper>

      </div>
   )
}

// NOTE - Aqui hacemos el drop
// REVIEW - con la info el _id del entry se puede validar mas cosas como por ejemplo si esta permitida la targeta para dejarla caer aqui o si el elemento puede ser arrastrado o no y mas