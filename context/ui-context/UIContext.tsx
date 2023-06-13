import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDraging: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;

  openAddingEntry: () => void;
  closeAddingEntry: () => void;

  startDraging: () => void;
  stopDraging: () => void;
}


export const UIContext = createContext({} as ContextProps);
