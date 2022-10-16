import { List, Paper } from '@mui/material';
import { FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries';

import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';


const stylesPaper = {
   height: "calc(100vh - 180px)",
   overflow: "scroll",
   backgroundColor: "transparent",
   padding: "1px 5px",
   "&::-webkit-scrollbar": { display: "none" },
};

interface Props {
   status: EntryStatus
}


export const EntryList: FC<Props> = ({ status }) => {

   const { entries } = useContext(EntriesContext)

   const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries]);

   return (
      <div>
         <Paper sx={stylesPaper}>

            <List sx={{ opacity: 1 }}>
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