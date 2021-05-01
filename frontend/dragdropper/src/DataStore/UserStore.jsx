import { createContext, useContext, useReducer } from "react";

export const UserStorageContext = createContext();
export const UserStorageProvider = ({ defaultValue, reducer, children }) => {
  return (
    <UserStorageContext.Provider value={useReducer(reducer, defaultValue)}>
      {children}
    </UserStorageContext.Provider>
  );
};
export const UserStorageValue = () => {
  return useContext(UserStorageContext);
};
export const UserStorageReducer = (previousState, newState) => {
  switch (newState.operation) {
    case UserStorageOps.UPDATE:
      console.log(newState);
      return {
        ...previousState,
        userName: newState.userName,
        profilePicture: newState.profilePicture,
      };
    default:
      return { ...previousState };
  }
};
export const UserStorageOps = {
  UPDATE: "UPDATE_DATA",
  DELETE: "DELETE_DATA",
};
export const getUserStorageDefaultValue = (userName, profilePicture) => {
  return {
    userName: userName || "",
    profilePicture: profilePicture || "",
  };
};
export const UserStorageUpdateFormatter = (userName, profilePicture) => {
  return {
    userName: userName,
    profilePicture: profilePicture,
    operation: UserStorageOps.UPDATE,
  };
};
export const UserStorageDefaultValue = getUserStorageDefaultValue();
