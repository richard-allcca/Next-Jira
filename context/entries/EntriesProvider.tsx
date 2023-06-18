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

export const EntriesProvider: FC<PropsWithChildren> = ({
	children,
}): JSX.Element => {
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
		// const newEntry: Entry = { /* Method con front sin persistencia en mongo */
		// 	_id: description,
		// 	description: description,
		// 	createAt: Date.now(),
		// 	status: "pending",
		// };
    // dispatch({ type: '[Entries] - Add', payload:  newEntry});
		try {
		  const { data } = await entriesApi.post<Entry>('/entries', { description });
		  dispatch({ type: '[Entries] - Add', payload:  data});
		} catch (error) {
		  console.log(error);
		}
	};

	const changeStateEntry = async (entry: Entry, showSnackbar = false) => {
		// dispatch({ type: "[Entries] - Update State", payload: entry }); /* use in dev sin mongo */
		try {
		  const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, entry);
		  dispatch({ type: '[Entries] - Update State', payload: data });

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
			value={{ ...state, addNewEntry, changeStateEntry }}
		>
			{children}
		</EntriesContext.Provider>
	);
};
