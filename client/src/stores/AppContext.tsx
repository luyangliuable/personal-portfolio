import React, { useEffect, useState } from "react";
import IAppContextProvider from "./Interface/IAppContextProvider";
import IAppContextProps from "./Interface/IAppContextProps";

export const AppContext = React.createContext<IAppContextProvider>({
    userId: "",
    userName: "",
});

export const AppContextProvider: React.FC<IAppContextProps> = (props) => {
    const [userId, setUserId] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const initialize = async () => {};
        initialize();
    }, []);

    return <AppContext.Provider value={{ userId, userName }}>{props.children}</AppContext.Provider>;
};

export { IAppContextProps, IAppContextProvider };
