import { createContext, useState } from "react";

// Context için varsayılan (boş) bir değer tanımla
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const clearUser = ()=>{
    setUser(null);
  }

  const contextValue = {
    user,
    setUser,
    clearUser
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
