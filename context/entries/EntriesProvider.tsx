import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from "uuid";
import { useEffect } from 'react';

import { Entry } from '../../interfaces/entry';

import { entriesReducer, EntriesContext } from './';
import { entriesApi } from '../../apis';

export interface EntriesState {
   entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
   entries: [],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {

   const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

   const addNewEntry = async (description: string) => {

      // const newEntry: Entry = { // Este proceso fue delegado a axios
      //    _id: uuidv4(),
      //    description,
      //    status: 'pending',
      //    createAt: Date.now()
      // }

      const { data } = await entriesApi.post<Entry>('/entries', { description })

      dispatch({ type: '[Entries] - Add', payload: data });
   }

   const changeStateEntry = (entry: Entry) => {

      dispatch({ type: '[Entries] - Update State', payload: entry })
   }

   const refreshEntries = async () => {
      const { data } = await entriesApi<Entry[]>('/entries');
      // console.log(resp)
      dispatch({ type: '[Entries] - Refresh Entries', payload: data })
   }

   useEffect(() => {

      refreshEntries();

   }, [])


   return (
      <EntriesContext.Provider value={{ ...state, addNewEntry, changeStateEntry }}>
         {children}
      </EntriesContext.Provider>
   )
}