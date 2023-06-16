import { FC, PropsWithChildren, useReducer } from "react";

import { UIContext, uiReducer } from './';
export interface UIState {
  isOpenSidemenu: boolean;
  isAddingEntry: boolean;
  isDraging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isAddingEntry: false,
  isOpenSidemenu: false,
  isDraging: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  };

  const openAddingEntry = () => {
    dispatch({ type: 'ENTRY - Open add input' });
  };

  const closeAddingEntry = () => {
    dispatch({ type: 'ENTRY - Close add input' });
  };

  const startDraging = () => {
    dispatch({ type: 'DRAG - Start Draging' });
  };

  const endDraging = () => {
    dispatch({ type: 'DRAG - Stop Draging' });
  };

  const data = {
    ...state,
    openSideMenu,
    closeSideMenu,
    openAddingEntry,
    closeAddingEntry,
    startDraging,
    endDraging
  };

  return (
    <UIContext.Provider value={data} >
      {children}
    </UIContext.Provider>
  );
};