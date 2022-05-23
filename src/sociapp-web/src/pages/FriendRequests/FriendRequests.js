import React, { useEffect, useState } from "react";
import "./FriendRequests.css";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function FriendRequests() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("email") === null) {
            navigate("../login", { replace: true });
        }

        axios.get(`http://127.0.0.1:8080/api/friendconnection?email=${localStorage.getItem("email")}`)
            .then(res => setFriendRequests(res.data));
    }, []);

    const acceptFriendRequest = (sender) => {
        axios.post(`http://127.0.0.1:8080/api/friendconnection/accept`, {
            'sender': sender,
            'receiver': localStorage.getItem('email')
        }).then(() => {
            setFriendRequests(friendRequests.filter(x => x.Sender != sender));
        })
    }

    const declineFriendRequest = (sender) => {
        axios.post(`http://127.0.0.1:8080/api/friendconnection/decline`, {
            'sender': sender,
            'receiver': localStorage.getItem('email')
        }).then(() => {
            setFriendRequests(friendRequests.filter(x => x.Sender != sender));
        })
    }

    return (
        <div className="text-black flex flex-row flex-wrap">
            <div className="w-full flex flex-col sm:w-12/12 md:w-12/12">
                <h1 className="flex justify-center mt-4 text-3xl font-bold">
                    Friend requests
                </h1>
                <br />
                <div className="flex flex-col sm:w-full md:w-8/12 m-auto">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                            >
                                                First name
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                            >
                                                Last name
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm text-center font-bold text-gray-900 px-6 py-4"
                                            >
                                                View profile
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm text-center font-bold text-gray-900 px-6 py-4"
                                            >
                                                Accept
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm text-center font-bold text-gray-900 px-6 py-4"
                                            >
                                                Decline
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {friendRequests.map((u, idx) => (
                                            <tr key={`usr-${idx}`} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {idx + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {u.FirstName}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {u.LastName}
                                                </td>
                                                <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <Link 
                                                        className="btn px-6 py-2.5 bg-blue-600 text-center text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                                                        to={`/userprofile/${u.Email}`}
                                                    >
                                                        Visit
                                                    </Link>
                                                </td>
                                                <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button className="btn px-6 py-2.5 text-white text-xs font-medium uppercase rounded shadow-md bg-green-500 hover:bg-green-600" onClick={() => acceptFriendRequest(u.Sender)}>
                                                        Accept
                                                    </button>
                                                </td>
                                                <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button className="btn px-6 py-2.5 text-white text-xs font-medium uppercase rounded shadow-md bg-red-500 hover:bg-red-600" onClick={() => declineFriendRequest(u.Sender)}>
                                                        Decline
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendRequests;
