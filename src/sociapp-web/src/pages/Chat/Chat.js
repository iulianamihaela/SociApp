import React, { useEffect } from "react";
import { useState } from "react";
import "./Chat.css";
import queryString from "query-string";
import io from "socket.io-client";

import ChatCard from '../../components/ChatCard/ChatCard';

let socket;

function Chat() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("sociappchat");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const ENDPOINT = "http://localhost:8082";

    useEffect(() => {
        socket = io(ENDPOINT);
        setRoom('sociappchat');
        
        socket.emit("join", { name: localStorage.getItem('fullName'), room: 'sociappchat' }, (error) => {
            if (error) {
                alert(error);
            }
        });

        socket.on("message", (m) => {
            setMessages(messages => [...messages, m]);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit("sendMessage", { message });
            setMessage("");
        };
    };

    return (
        <div className="text-black flex flex-row flex-wrap">
        <div className="w-full flex flex-col sm:w-12/12 md:w-12/12 mt-4">
            <br />
            {localStorage.getItem("email") !== null && (
                <div className="flex justify-center">
                    <div className="mb-3 sm:w-12/12 md:w-4/12">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <input
                                type="search"
                                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Comment"
                                aria-label="Comment"
                                aria-describedby="button-addon2"
                                value={message}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setMessage(e.target.value)
                                }}
                            />
                            <button
                                className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                                type="button"
                                id="button-addon2"
                                onClick={handleSubmit}
                            >
                                Send message
                            </button>
                        </div>
                    </div>
                </div> 
            )}
            {messages.sort((a, b) => (new Date(a)).getTime() > (new Date(b)).getTime()).map((m, idx) => (
                <ChatCard
                    key={`msg-${idx}`}
                    name={m.user}
                    text={m.text}
                />
            ))}
        </div>
        </div>
    );
}

export default Chat;
