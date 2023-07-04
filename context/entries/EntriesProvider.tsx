import { useEffect } from "react";

import { FC, PropsWithChildren, useReducer } from "react";
import { useSnackbar } from "notistack";

import { entriesReducer, EntriesContext } from "./";
import { entriesApi } from "../../apis";

import { Entry } from "../../interfaces/entry";
export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    refreshEntries();
  }, []);

  const refreshEntries = async () => {
    const { data } = await entriesApi<Entry[]>("/entries");
    dispatch({ type: "[Entries] - Refresh Entries", payload: data });
  };

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({ type: '[Entries] - Add', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async (entry: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, entry);
      dispatch({ type: '[Entries] - Update Entry', payload: data });

      if (showSnackbar) {
        enqueueSnackbar('Entrada actualizada 🙋‍♂️', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EntriesContext.Provider
      value={{ ...state, addNewEntry, updateEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
