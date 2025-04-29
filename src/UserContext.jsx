import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: ""
  });
  
  const [blobUrl, setBlobUrl] = useState(null);
  const [fileType, setFileType] = useState('text');
  
  const updateUserData = (firstName, lastName) => {
    setUserData({ firstName, lastName });
  };
  
  const updateBlobUrl = (url) => {
    setBlobUrl(url);
  };
  
  const updateFileType = (type) => {
    setFileType(type);
  };

  const value = {
    userData,
    updateUserData,
    blobUrl,
    updateBlobUrl,
    fileType,
    updateFileType
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};