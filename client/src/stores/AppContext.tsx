import React, { useEffect, useState } from "react";
import UserRepository from "../repositories/UserRepository";
import IAppContextProvider from "./Interface/IAppContextProvider";
import IAppContextProps from "./Interface/IAppContextProps";
import UserNameResponse from "../repositories/Response/UserNameResponse";

export const AppContext = React.createContext<IAppContextProvider>({
  userName: "",
  loginStatus: false,
});


export const AppContextProvider: React.FC<IAppContextProps> = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      UserRepository.getUserName()
        .then((response: UserNameResponse) => {
          setUserName(response.username);
          setLoginStatus(true);
        })
        .catch((error) => {
          // Handle errors
          console.error("An error occurred:", error);
        });
    };

    initialize();
  }, []);

  return (
    <AppContext.Provider value={{ userName, loginStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export { IAppContextProps, IAppContextProvider };
