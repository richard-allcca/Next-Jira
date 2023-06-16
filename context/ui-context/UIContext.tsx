import { createContext } from "react";

interface ContextProps {
  isOpenSidemenu: boolean;
  isAddingEntry: boolean;
  isDraging: boolean;

  openSideMenu: () => void;
  closeSideMenu: () => void;

  openAddingEntry: () => void;
  closeAddingEntry: () => void;

  startDraging: () => void;
  endDraging: () => void;
}


export const UIContext = createContext({} as ContextProps);