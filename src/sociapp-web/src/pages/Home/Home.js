import React, { useEffect, useState } from "react";
import "./Home.css";
import { Transition } from "@headlessui/react";

import PostCard from '../../components/PostCard/PostCard';

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function Profile() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8080/api/post?email=${localStorage.getItem("email")}&userProfile=`)
            .then((res) => {setPosts(res.data); console.log(res)});
    }, []);

    return (
        <div className="text-black flex flex-row flex-wrap">
            <div className="w-full flex flex-col sm:w-12/12 md:w-12/12">
                <h1 className="flex justify-center mt-4 text-3xl font-bold">
                    Posts
                </h1>
                <br />
                {
                    posts.map(post => <><PostCard postId={post.Id} imageURI={post.ImageURI} text={post.Text} react={post.Reaction} /><br/></>)
                }
            </div>
        </div>
    );
}

export default Profile;
