import { createContext, useContext, useState } from "react";

const actionContext = createContext();

function ActionProvider({ children }) {
  const [confirmDeleteActivate, setConfirmDeleteActivate] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [passwordUpdateClicked, setPasswordUpdateClicked] = useState(false);
  const [isNightModeOn, setIsNightModeOn] = useState(false);

  function handleUpdatingUser(value) {
    setUpdatingUser(value);
  }

  function handleDeleteActivate(value) {
    setConfirmDeleteActivate(value);
  }

  function toggleNightMode() {
    setIsNightModeOn((value) => !value);
  }

  return (
    <actionContext.Provider
      value={{
        updatingUser,
        handleUpdatingUser,
        confirmDeleteActivate,
        handleDeleteActivate,
        passwordUpdateClicked,
        setPasswordUpdateClicked,
        isNightModeOn,
        toggleNightMode,
      }}
    >
      {children}
    </actionContext.Provider>
  );
}

export function useAction() {
  const context = useContext(actionContext);
  if (context === undefined) {
    throw new Error("The User provider has used outside of its scope.");
  }
  return context;
}

export default ActionProvider;
