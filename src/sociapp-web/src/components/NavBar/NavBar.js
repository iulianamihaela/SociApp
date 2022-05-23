import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Transition } from "@headlessui/react";

import { HiUserCircle } from "react-icons/hi";

import { Link, useNavigate } from "react-router-dom";

import NavBarButton from "../NavBarButton/NavBarButton";

function NavBar() {
    const navigate = useNavigate();

    const [isDropdownOpen, toggleDropdown] = useState(false);

    return (
        <nav className="bg-gray-800 w-full sticky-top">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-2xl text-white">SociApp</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                <NavBarButton
                                    isSmallScreen={false}
                                    location="home"
                                    text="Home"
                                />

                                {localStorage.getItem("email") !== null && (
                                        <>
                                            <NavBarButton
                                                isSmallScreen={false}
                                                location="newpost"
                                                text="New post"
                                            />
                                        </>
                                    )}

                                {localStorage.getItem("role") !== null &&
                                    localStorage.getItem("role") ===
                                        "Administrator" && (
                                        <>
                                            <NavBarButton
                                                isSmallScreen={false}
                                                location="reports"
                                                text="Reports"
                                            />
                                        </>
                                    )}

                                <span className="items-center float-right">
                                    <div className="flex justify-center">
                                        <div>
                                            <div className="dropdown relative">
                                                <button
                                                    className="dropdown-toggle px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-200 hover:shadow-lg hover:text-blue-700 transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                                                    type="button"
                                                    id="dropdownMenuButton1"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <HiUserCircle size={30} />
                                                </button>
                                                <ul
                                                    className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
                                                    aria-labelledby="dropdownMenuButton1"
                                                >
                                                    {localStorage.getItem(
                                                        "token"
                                                    ) !== null ? (
                                                        <>
                                                            <li>
                                                                <Link
                                                                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                                    to="/profile"
                                                                >
                                                                    Profile
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                                    onClick={() => {
                                                                        localStorage.removeItem(
                                                                            "token"
                                                                        );
                                                                        localStorage.removeItem(
                                                                            "role"
                                                                        );
                                                                        localStorage.removeItem(
                                                                            "email"
                                                                        );
                                                                        navigate(
                                                                            "/login"
                                                                        );
                                                                    }}
                                                                >
                                                                    Logout
                                                                </button>
                                                            </li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li>
                                                                <Link
                                                                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                                    to="/login"
                                                                >
                                                                    Login
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                                    to="/register"
                                                                >
                                                                    Register
                                                                </Link>
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => toggleDropdown(!isDropdownOpen)}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white active:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isDropdownOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isDropdownOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="md:hidden" id="mobile-menu">
                        <div
                            ref={ref}
                            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                        >
                            <NavBarButton
                                isSmallScreen={true}
                                location="home"
                                text="Home"
                            />

                            {localStorage.getItem("email") !== null && (
                                <>
                                    <NavBarButton
                                        isSmallScreen={true}
                                        location="newpost"
                                        text="New post"
                                    />
                                </>
                            )}

                            {localStorage.getItem("role") !== null &&
                                localStorage.getItem("role") ===
                                    "Administrator" && (
                                    <NavBarButton
                                        isSmallScreen={true}
                                        location="reports"
                                        text="Reports"
                                    />
                                )}

                            <span className="items-center">
                                <div className="flex justify-center">
                                    <div>
                                        <div className="dropdown relative">
                                            <button
                                                className="dropdown-toggle px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-200 hover:shadow-lg hover:text-blue-700 transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <HiUserCircle size={30} />
                                            </button>
                                            <ul
                                                className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
                                                aria-labelledby="dropdownMenuButton1"
                                            >
                                                <li>
                                                    <Link
                                                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                        to="/login"
                                                    >
                                                        Login
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                        to="/register"
                                                    >
                                                        Register
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    );
}

export default NavBar;
