import { UIState } from './';


type UIActionType =
   | { type: 'UI - Open Sidebar' }
   | { type: 'UI - Close Sidebar' }
   | { type: 'ENTRY - Open FormEntry' }
   | { type: 'ENTRY - Close FormEntry' }
   | { type: 'DRAG - Start Draging' }
   | { type: 'DRAG - Stop Draging' }

export const uiReducer = (state: UIState, action: UIActionType) => {

   switch (action.type) {
      case 'UI - Open Sidebar':
         return {
            ...state,
            sidemenuOpen: true,
         }
      case 'UI - Close Sidebar':
         return {
            ...state,
            sidemenuOpen: false,
         }
      case 'ENTRY - Open FormEntry':
         return {
            ...state,
            isAddingEntry: true,
         }
      case 'ENTRY - Close FormEntry':
         return {
            ...state,
            isAddingEntry: false,
         }
      case 'DRAG - Start Draging':
         return {
            ...state,
            isDraging: true,
         }
      case 'DRAG - Stop Draging':
         return {
            ...state,
            isDraging: false,
         }

      default:
         return state;
   }
}