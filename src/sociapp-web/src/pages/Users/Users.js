import React, { useEffect, useState } from "react";
import "./Users.css";
import { Transition } from "@headlessui/react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function Users() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("email") === null) {
            navigate("../login", { replace: true });
        }
    }, []);

    const searchUsers = () => {
        axios
            .get(`http://127.0.0.1:8080/api/user/search?filter=${filter}`)
            .then((res) => {
                setUsers(
                    res.data.filter(
                        (x) => x.Email != localStorage.getItem("email")
                    )
                );
            });
    };

    return (
        <div className="text-black flex flex-row flex-wrap">
            <div className="w-full flex flex-col sm:w-12/12 md:w-12/12">
                <h1 className="flex justify-center mt-4 text-3xl font-bold">
                    Users
                </h1>
                <br />
                <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <input
                                type="search"
                                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="button-addon2"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <button
                                className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                                type="button"
                                id="button-addon2"
                                onClick={searchUsers}
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="search"
                                    className="w-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
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
                                                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm text-center font-bold text-gray-900 px-6 py-4"
                                            >
                                                View profile
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u, idx) => (
                                            <tr key={`usr-${idx}`} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {idx}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {u.FirstName}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {u.LastName}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {u.Email}
                                                </td>
                                                <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <Link 
                                                        className="btn px-6 py-2.5 bg-blue-600 text-center text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                                                        to={`/userprofile/${u.Email}`}
                                                    >
                                                        Visit
                                                    </Link>
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

export default Users;
