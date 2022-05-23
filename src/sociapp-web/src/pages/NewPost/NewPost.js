import React, { useEffect } from "react";
import { useState } from "react";
import "./NewPost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPost() {
    const navigate = useNavigate();

    const [imageURI, setImageURI] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        if (localStorage.getItem('email') === null) {
            navigate('../login', { replace: true });
        }
    }, []);

    const addPost = () => {
        axios.post('http://127.0.0.1:8080/api/post/', {
            "email": localStorage.getItem('email'),
            "imageURI": imageURI,
            "text": text
            
        }).then(res => {
            navigate('/');
        }).catch(res => {
            if (res.response.status === 404) {
                setImageURI('');
                setText('');
            }
        });
    }

    return (
        <div className="flex justify-center sm:px-4 md:mb-6 md:mt-20">
            <div className="w-full items-center px-4 md:max-w-3xl md:p-10 md:pb-4 md:bg-gray-100 md:border-2 md:rounded-lg">
                <div className="flex justify-center">
                    <div className="w-full">
                        <label
                            htmlFor="exampleFormControlInput5"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Image URL
                        </label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={imageURI}
                            onChange={(e) => setImageURI(e.target.value)}
                            aria-label="readonly input example"
                            placeholder="Image URL"
                        />
                    </div>
                </div>
                <br/>
                <div className="flex justify-center">
                    <div className="mb-3 w-full">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Post content
                        </label>
                        <textarea
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows="8"
                            placeholder={"Post content"}
                        ></textarea>
                    </div>
                </div>
                <div className="flex flex-wrap mb-4 mt-10 text-center justify-center">
                    <button
                        onClick={addPost}
                        className="bg-transparent disabled:hover:cursor-not-allowed hover:bg-blue-500 text-blue-700 font-semibold hover:text-white disabled:hover:bg-gray-100 disabled:hover:text-blue-700 disabled:hover:border-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewPost;
