import React, { createContext, useState, useContext } from "react";

// Create a context for file data
const FileContext = createContext();

// Create a provider component
export const FileProvider = ({ children }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

  // Function to update the file URL
  const selectFile = (fileUrl) => {
    setSelectedFileUrl(fileUrl);
  };

  return (
    <FileContext.Provider value={{ selectedFileUrl, selectFile }}>
      {children}
    </FileContext.Provider>
  );
};

// Custom hook to use the file context
export const useFileContext = () => useContext(FileContext);