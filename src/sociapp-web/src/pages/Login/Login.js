import React from "react";
import { useState } from "react";
import "./Login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [authFailed, setAuthFailed] = useState(false);

    const authenticateUser = () => {
        axios.post('http://127.0.0.1:8080/api/user/login', {
            "email": email,
            "password": password
        }).then(res => {
            setAuthFailed(false);
            localStorage.setItem('token', res.data.jwt);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('fullName', res.data.fullName);
            navigate('/');
        }).catch(res => {
            if (res.response.status === 404) {
                setAuthFailed(true);
                setEmail('');
                setPassword('');
            }
        });
    }

    return (
        <div className="flex justify-center md:mb-6 md:mt-20">
            <div className="w-full max-w-lg items-center md:p-10 md:pb-4 md:bg-gray-100 md:border-2 md:rounded-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">Email</label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-email"
                            type="text"
                            placeholder="address@email.com"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                </div>

                {
                    authFailed &&
                    <p className="text-red-500 text-xs italic">
                        No combination of username and password was found.
                    </p>
                }

                <div className="flex flex-wrap mb-4 mt-10 text-center justify-center">
                    <button onClick={authenticateUser} className="bg-transparent disabled:hover:cursor-not-allowed hover:bg-blue-500 text-blue-700 font-semibold hover:text-white disabled:hover:bg-gray-100 disabled:hover:text-blue-700 disabled:hover:border-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
