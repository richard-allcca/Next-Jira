import { EntriesState } from './';
import { Entry } from './../../interfaces/entry';

type EntriesActionType =
  | { type: '[Entries] - Add', payload: Entry; }
  | { type: '[Entries] - Update Entry', payload: Entry; }
  | { type: '[Entries] - Refresh Entries', payload: Entry[]; };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

  switch (action.type) {
    case '[Entries] - Add':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };

    case '[Entries] - Update Entry':
      return {
        ...state,
        entries: state.entries.map(entry => {

          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        })
      };
    case '[Entries] - Refresh Entries':
      return {
        ...state,
        entries: [...action.payload]
      };

    default:
      return state;
  }
};