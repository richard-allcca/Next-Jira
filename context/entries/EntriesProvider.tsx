import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from "uuid";

import { Entry } from '../../interfaces/entry';

import { entriesReducer, EntriesContext } from './';

export interface EntriesState {
   entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
   entries: [],
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