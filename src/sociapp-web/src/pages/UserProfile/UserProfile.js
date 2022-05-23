import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Transition } from "@headlessui/react";

import PostCard from '../../components/PostCard/PostCard';

import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

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

function UserProfile() {
    let {userEmail} = useParams();

    const [id, setId] = useState(-1);
    const [birthDate, setBirthDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [isFriend, setIsFriend] = useState(false);
    const [existsFriendRequest, setExistsFriendRequest] = useState(false);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (userEmail === undefined) 
            userEmail = localStorage.getItem('email')

        axios
            .get(
                `http://127.0.0.1:8080/api/user?email=${userEmail}&visitoremail=${localStorage.getItem('email')}`
            )
            .then((res) => {
                setId(res.data.Id);
                setBirthDate(new Date(res.data.BirthDate));
                setEmail(res.data.Email);
                setFirstName(res.data.FirstName);
                setLastName(res.data.LastName);
                setRole(res.data.Role);
                setLocation(res.data.Location);
                setDescription(res.data.Description);
                setIsFriend(res.data.IsFriend);
                setExistsFriendRequest(res.data.ExistsFriendRequest)
            })
            .then((res) => axios.get(`http://127.0.0.1:8080/api/post/user?email=${localStorage.getItem("email")}&userProfile=${userEmail}`))
            .then((res) => setPosts(res.data));
    }, []);

    const sendFriendRequest = async () => {
        axios
            .post("http://127.0.0.1:8080/api/friendconnection", {
                firstEmail: localStorage.getItem("email"),
                secondEmail: userEmail
            }).then(() => setExistsFriendRequest(true));
    };

    return (
        <div className="text-black flex flex-row flex-wrap">
            <div className="w-full flex flex-col md:fixed sm:w-12/12 md:w-4/12 min-h-full md:border-r-2 border-gray-200">
                <h1 className="flex justify-center mt-4 text-3xl font-bold">
                    Profile
                </h1>
                {
                    (localStorage.getItem('email') !== null) && (isFriend ?
                    <div className="flex bg-green-200 max-w-xs mx-auto p-2 mt-2 rounded-lg hover:bg-green-400 hover:cursor-pointer">
                        Your friend
                    </div>
                    :
                    (existsFriendRequest ? 
                    <div className="flex bg-green-200 max-w-xs mx-auto p-2 mt-2 rounded-lg hover:cursor-default">
                        Friend request sent
                    </div>    
                        :
                    <div className="flex bg-green-200 max-w-xs mx-auto p-2 mt-2 rounded-lg hover:cursor-pointer" onClick={sendFriendRequest}>
                        Send friend request
                    </div>))
                }
                <br/>
                <div className="flex justify-center">
                    <div className="xl:w-96">
                        <label
                            htmlFor="exampleFormControlInput5"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={email}
                            aria-label="readonly input example"
                            readOnly={true}
                        />
                    </div>
                </div>
                <br />
                <div className="flex justify-center">
                    <div className="xl:w-96">
                        <label
                            htmlFor="exampleFormControlInput5"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            First name
                        </label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={firstName}
                            aria-label="readonly input example"
                            readOnly={true}
                        />
                    </div>
                </div>
                <br />
                <div className="flex justify-center">
                    <div className="xl:w-96">
                        <label
                            htmlFor="exampleFormControlInput5"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={lastName}
                            aria-label="readonly input example"
                            readOnly={true}
                        />
                    </div>
                </div>
                <br />
                <div className="flex justify-center">
                    <div className="xl:w-96">
                        <label
                            htmlFor="exampleFormControlInput5"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Birth date
                        </label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={
                                birthDate.getDay() +
                                " " +
                                monthNames[birthDate.getMonth()] +
                                " " +
                                birthDate.getFullYear()
                            }
                            aria-label="readonly input example"
                            readOnly={true}
                        />
                    </div>
                </div>
                <br />
                <div className="flex justify-center">
                    <div className="xl:w-96">
                        <label
                            htmlFor="exampleFormControlInput5"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Role
                        </label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={role}
                            aria-label="readonly input example"
                            readOnly={true}
                        />
                    </div>
                </div>
                <br />
                <div className="flex justify-center">
                    <div className="xl:w-96">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Location
                        </label>
                        <textarea
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            rows="3"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            placeholder={"Location"}
                            readOnly={true}
                        ></textarea>
                    </div>
                </div>
                <br />
                <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            placeholder={"Description"}
                            readOnly={true}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col sm:w-12/12 md:w-8/12 md:ml-[33%]">
                <h1 className="flex justify-center mt-4 text-3xl font-bold">
                    Posts
                </h1>
                <br />
                {
                    posts.map(post => <div key={`post-${post.Id}`}><PostCard key={`post-${post.Id}`} postId={post.Id} imageURI={post.ImageURI} text={post.Text} react={post.Reaction} /><br/></div>)
                }
            </div>
        </div>
    );
}

export default UserProfile;
