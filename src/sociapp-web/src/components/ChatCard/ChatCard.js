import React, { useEffect, useState } from "react";
import "./ChatCard.css";

import { Link } from 'react-router-dom';

function ChatCard({name, text}) {
    return (
        <div className="flex justify-center w-full mt-4">
            <div className="rounded-lg shadow-lg bg-white md:w-6/12 flex border-2 border-gray-200 p-2">
                <div className="px-6 flex flex-row w-full">
                    <p className="text-gray-700 text-base mb-4 border-r-2 italic font-bold border-gray-600 pr-4">
                        {name}
                    </p>
                    <p className="pl-4 flex flex-row w-xl w-full">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ChatCard;
