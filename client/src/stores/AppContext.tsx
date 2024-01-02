import React, { useEffect, useState, useRef, useCallback } from "react";
import UserRepository from "../repositories/UserRepository";
import IAppContextProvider from "./Interface/IAppContextProvider";
import IAppContextProps from "./Interface/IAppContextProps";
import UserNameResponse from "../repositories/Response/UserNameResponse";

export const AppContext = React.createContext<IAppContextProvider>({
    userName: "",
    loginStatus: false,
    addToQueue: (item: HTMLDivElement) => {}
});


export const AppContextProvider: React.FC<IAppContextProps> = ({ children }) => {
    const [userName, setUserName] = useState<string>("");
    const [loginStatus, setLoginStatus] = useState<boolean>(false);
    const queueRef = useRef<HTMLDivElement[]>([]);

    function addToQueue(element: HTMLDivElement) {
        queueRef.current.push(element);
        return 1
    };

    const processQueue = useCallback(() => {
        if (queueRef.current.length === 0) return;

        const element = queueRef.current.shift();
        if (element) {
            fadeInElement(element);
        }

        setTimeout(processQueue, 200);
    }, []); // Empty dependency array to ensure it doesn't change

    const fadeInElement = (element: Element) => {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.transition = 'opacity 1s ease-in';
    };

    useEffect(() => {
        processQueue();
    }, [processQueue]);

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
        <AppContext.Provider value={{ userName, loginStatus, addToQueue }}>
            {children}
        </AppContext.Provider>
    );
};

export { IAppContextProps, IAppContextProvider };
