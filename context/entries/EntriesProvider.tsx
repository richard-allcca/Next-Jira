import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from "uuid";

import { Entry } from '../../interfaces/entry';

import { entriesReducer, EntriesContext } from './';

export interface EntriesState {
   entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
   entries: [
      {
         _id: uuidv4(),
         description: 'Pending: Do culpa quis mollit adipisicing do commodo adipisicing nulla et sint incididunt reprehenderit consectetur.',
         status: 'pending',
         createAt: Date.now()
      },
      {
         _id: uuidv4(),
         description: 'Terminate: Consectetur excepteur eiusmod enim qui esse in incididunt exercitation velit esse velit.',
         status: 'in-progress',
         createAt: Date.now() - 100000
      },
      {
         _id: uuidv4(),
         description: 'Finished: Dolor pariatur incididunt nulla reprehenderit ex eu esse duis.',
         status: 'finished',
         createAt: Date.now() - 1000000
      },
   ],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {

   const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

   const addNewEntry = (description: string) => {
      const newEntry: Entry = {
         _id: uuidv4(),
         description,
         status: 'pending',
         createAt: Date.now()
      }

      dispatch({ type: '[Entries] - Add', payload: newEntry });
   }

   const changeStateEntry = (entry: Entry) => {

      dispatch({ type: '[Entries] - Update State', payload: entry })
   }

   return (
      <EntriesContext.Provider value={{ ...state, addNewEntry, changeStateEntry }}>
         {children}
      </EntriesContext.Provider>
   )
}