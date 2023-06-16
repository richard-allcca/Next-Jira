import { UIState } from './';

type UIActionType =
  | { type: 'UI - Open Sidebar'; }
  | { type: 'UI - Close Sidebar'; }
  | { type: 'ENTRY - Open add input'; }
  | { type: 'ENTRY - Close add input'; }
  | { type: 'DRAG - Start Draging'; }
  | { type: 'DRAG - Stop Draging'; };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        isOpenSidemenu: true,
      };
    case 'UI - Close Sidebar':
      return {
        ...state,
        isOpenSidemenu: false,
      };
    case 'ENTRY - Open add input':
      return {
        ...state,
        isAddingEntry: true,
      };
    case 'ENTRY - Close add input':
      return {
        ...state,
        isAddingEntry: false,
      };
    case 'DRAG - Start Draging':
      return {
        ...state,
        isDraging: true,
      };
    case 'DRAG - Stop Draging':
      return {
        ...state,
        isDraging: false,
      };

    default:
      return state;
  }
};
