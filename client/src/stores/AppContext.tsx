import React, { useEffect, useState } from "react";
import IAppContextProvider from "./Interface/IAppContextProvider";
import IAppContextProps from "./Interface/IAppContextProps";
import UserRepository from "../repositories/UserRepository";

export const AppContext = React.createContext<IAppContextProvider>({
    userName: "",
    loginStatus: false
});

export const AppContextProvider: React.FC<IAppContextProps> = (props) => {
    const [userName, setUserName] = useState<string>("");
    const [loginStatus, setLoginStatus] = useState<boolean>(false);

    useEffect(() => {
        const initialize = async () => {
            UserRepository.getUserName().then((response: any) => {
                setUserName(response.username);
                setLoginStatus(true);
            });
        };
        initialize();
    }, []);

    return <AppContext.Provider value={{ userName, loginStatus }}>{props.children}</AppContext.Provider>;
};

export { IAppContextProps, IAppContextProvider };
