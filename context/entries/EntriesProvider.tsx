import { useEffect } from 'react';

import { FC, PropsWithChildren, useReducer } from 'react';
import { useSnackbar } from 'notistack'

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
   const { enqueueSnackbar } = useSnackbar();


   const addNewEntry = async (description: string) => {

      const { data } = await entriesApi.post<Entry>('/entries', { description })

      dispatch({ type: '[Entries] - Add', payload: data });
   }

   const changeStateEntry = async (entry: Entry, showSnackbar = false) => {

      try {

         // NOTE - para no devolver todo el entry destructura en el parametro recibido solo lo necesario
         const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, entry)
         dispatch({ type: '[Entries] - Update State', payload: data })

         // STUB - Snackbar example
         if (showSnackbar) {

            enqueueSnackbar('Entrada actualizada 🙋‍♂️', {
               variant: 'success',
               autoHideDuration: 1500,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               }
            })
         }

      } catch (error) {
         console.log(error)
      }
   }

   const refreshEntries = async () => {

      const { data } = await entriesApi<Entry[]>('/entries');

      dispatch({ type: '[Entries] - Refresh Entries', payload: data })
   }

   useEffect(() => { refreshEntries() }, [])


   return (
      <EntriesContext.Provider value={{ ...state, addNewEntry, changeStateEntry }}>
         {children}
      </EntriesContext.Provider>
   )
}

// NOTE - método de "addNewEntry" para agregar entradas sin back-end
// const newEntry: Entry = { // Este proceso fue delegado a axios
      //    _id: uuidv4(),
      //    description,
      //    status: 'pending',
      //    createAt: Date.now()
      // }