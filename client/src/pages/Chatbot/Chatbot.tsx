import React, { useEffect } from "react";
import { Chatbot } from "ollama-chat-client";
import "./Chatbot.css";

const LlChatbot: React.FC = ({}) => {
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, []);

    return (
        <main className="chatbot__wrapper">
            <Chatbot baseURI="https://6dc8-101-115-129-33.ngrok-free.app" />
        </main>
    );
};

export default LlChatbot;
