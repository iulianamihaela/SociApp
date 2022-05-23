import React, { useEffect, useState } from "react";
import "./CommentCard.css";

import { Link } from 'react-router-dom';
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

import axios from "axios";

const activeReactionCSS = "inline-block px-3 mx-1 bg-blue-600 border-2 border-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";
const inactiveReactionCSS = "inline-block px-3 mx-1 py-2.5 bg-white text-blue-600 border-blue-600 border-2 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";

function CommentCard({commentId, name, email, text, react}) {
    const [reaction, setReaction] = useState(react);

    const reactToComment = (r) => {
        axios
            .post("http://127.0.0.1:8080/api/reaction", {
                'email': localStorage.getItem('email'),
                'postId': commentId,
                'reaction': r,
                'target': 'COMMENT'
            })
            .then((res) => {
                setReaction(r);
            });
    }

    return (
        <div className="flex justify-center w-full mt-4">
            <div className="rounded-lg shadow-lg bg-white md:w-6/12 flex border-2 border-gray-200 p-2">
                <div className="px-6 flex flex-row w-full">
                    <Link to={`/userprofile/${email}`} className="text-gray-700 text-base mb-4 border-r-2 italic font-bold border-gray-600 pr-4">
                        {name}
                    </Link>
                    <p className="pl-4 flex flex-row w-xl w-full">
                        {text}
                    </p>
                    {   localStorage.getItem('email') !== null &&
                        <>
                            <button
                                type="button"
                                className={`${reaction === 'LIKE' ? activeReactionCSS : inactiveReactionCSS} h-12`}
                                onClick={() => reactToComment('LIKE')}
                            >
                                <HiArrowUp size={18} />
                            </button>
                            <button
                                type="button"
                                className={`${reaction === 'DISLIKE' ? activeReactionCSS : inactiveReactionCSS} h-12`}
                                onClick={() => reactToComment('DISLIKE')}
                            >
                                <HiArrowDown size={18} />
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default CommentCard;
