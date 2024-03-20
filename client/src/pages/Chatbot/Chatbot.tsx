import React, { useEffect } from "react";
import { Chatbot } from "ollama-chat-client";
import "./Chatbot.css";

const LlChatbot: React.FC = ({}) => {
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, []);

    return (
        <div className="chatbot__wrapper">
            <Chatbot baseURI="http://localhost:8000/api/proxy_post?url=http://124.148.171.97" />
        </div>
    );
};

export default LlChatbot;
