import React, { useEffect, useState } from "react";
import "./PostCard.css";

import axios from 'axios';

import { HiArrowUp, HiArrowDown } from "react-icons/hi";

import { Link } from 'react-router-dom';

const activeReactionCSS = "inline-block px-3 mx-1 py-2.5 bg-blue-600 border-2 border-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";
const inactiveReactionCSS = "inline-block px-3 mx-1 py-2.5 bg-white text-blue-600 border-blue-600 border-2 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";

function PostCard({postId, imageURI, text, react}) {
    const [email, setEmail] = useState(null);
    const [reaction, setReaction] = useState(react);

    useEffect(() => {
        setEmail(localStorage.getItem("email"));
    }, []);

    useEffect(() => {
        setReaction(react);
    }, [react]);

    const reactToPost = (r) => {
        axios
            .post("http://127.0.0.1:8080/api/reaction", {
                'email': email,
                'postId': postId,
                'reaction': r,
                'target': 'POST'
            })
            .then((res) => {
                setReaction(r);
            });
    }

    return (
        <div className="flex justify-center w-full">
            <div className="rounded-lg shadow-lg bg-white max-w-md">
                <Link
                    to={`/post/${postId}`}
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                >
                    <img 
                        className="rounded-t-lg"
                        src={(imageURI === null || imageURI === undefined || imageURI.length < 1) ? "https://mdbootstrap.com/img/new/standard/nature/182.jpg" : imageURI}
                        alt=""
                    />
                </Link>
                <div className="p-6">
                    <p className="text-gray-700 text-base mb-4">
                        {text}
                    </p>
                    {   email !== null &&
                        <>
                            <button
                                type="button"
                                className={reaction === 'LIKE' ? activeReactionCSS : inactiveReactionCSS}
                                onClick={() => reactToPost('LIKE')}
                            >
                                <HiArrowUp size={18} />
                            </button>
                            <button
                                type="button"
                                className={reaction === 'DISLIKE' ? activeReactionCSS : inactiveReactionCSS}
                                onClick={() => reactToPost('DISLIKE')}
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

export default PostCard;
