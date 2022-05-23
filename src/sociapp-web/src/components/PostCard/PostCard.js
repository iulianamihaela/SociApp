import React, { useEffect, useState } from "react";
import "./PostCard.css";

import axios from 'axios';

import { HiArrowUp, HiArrowDown } from "react-icons/hi";

const activeReactionCSS = "inline-block px-3 mx-1 py-2.5 bg-blue-600 border-2 border-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";
const inactiveReactionCSS = "inline-block px-3 mx-1 py-2.5 bg-white text-blue-600 border-blue-600 border-2 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";

function PostCard({postId, imageURI, text, react}) {
    const [email, setEmail] = useState(null);
    const [reaction, setReaction] = useState(react);

    useEffect(() => {
        console.log(postId)
        setEmail(localStorage.getItem("email"));
    }, []);

    const reactToPost = (r) => {
        axios
            .post("http://127.0.0.1:8080/api/reaction", {
                'email': email,
                'postId': postId,
                'reaction': r,
            })
            .then((res) => {
                setReaction(r);
            });
    }

    return (
        <div class="flex justify-center w-full">
            <div class="rounded-lg shadow-lg bg-white max-w-md">
                <a
                    href="#!"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                >
                    <img
                        class="rounded-t-lg"
                        src={imageURI ?? "https://mdbootstrap.com/img/new/standard/nature/182.jpg"}
                        alt=""
                    />
                </a>
                <div class="p-6">
                    <p class="text-gray-700 text-base mb-4">
                        {text}
                    </p>
                    {   email !== null &&
                        <>
                            <button
                                type="button"
                                class={reaction === 'LIKE' ? activeReactionCSS : inactiveReactionCSS}
                                onClick={() => reactToPost('LIKE')}
                            >
                                <HiArrowUp size={18} />
                            </button>
                            <button
                                type="button"
                                class={reaction === 'DISLIKE' ? activeReactionCSS : inactiveReactionCSS}
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
