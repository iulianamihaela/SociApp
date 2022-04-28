import React from "react";
import { useState } from "react";
import "./Register.css";

import axios from 'axios';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [isValidFirstName, setIsValidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [isValidLastName, setIsValidLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);

    const [password2, setPassword2] = useState('');
    const [isValidPassword2, setIsValidPassword2] = useState(true);

    const [birthDate, setBirthDate] = React.useState(new Date('2000-01-01T10:00:00'));
    const [isValidBirthDate, setIsValidBirthDate] = useState(true);

    const [isValidAccount, setIsValidAccount] = useState(false);

    const changeFirstname = (e) => {
        setFirstName(e.target.value);
        setIsValidFirstName(e.target.value.length > 0);

        updateAccountValidity();
    }

    const changeLastName = (e) => {
        setLastName(e.target.value);
        setIsValidLastName(e.target.value.length > 0);

        updateAccountValidity();
    }

    const changePassword = (e) => {
        setPassword(e.target.value);

        if (e.target.value.length == 0) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(e.target.value));
        }

        updateAccountValidity();
    }

    const changePassword2 = (e) => {
        setPassword2(e.target.value);
                
        if (e.target.value.length == 0) {
            setIsValidPassword2(true);
        } else {
            setIsValidPassword2(password == e.target.value);
        }

        updateAccountValidity();
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
        setIsValidEmail(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value));

        updateAccountValidity();
    }

    const changeBirthDate = (value) => {
        setBirthDate(value);

        const ageDifMs = Date.now() - value;
        const ageDate = new Date(ageDifMs); 
        const years = Math.abs(ageDate.getUTCFullYear() - 1970)

        setIsValidBirthDate(years >= 16 && value <= Date.now());

        updateAccountValidity();
    }

    const updateAccountValidity = (e) => {
        setIsValidAccount(isValidFirstName && isValidLastName && isValidPassword && isValidPassword2 && isValidEmail && isValidBirthDate);
    }

    const createUser = () => {
        axios.post('http://127.0.0.1:8080/api/user', {
            "email": email,
            "password": password,
            "firstName": firstName, 
            "lastName": lastName,
            "birthDate": birthDate
        }).then(res => {
            console.log(res);
            setFirstName('');
            setLastName('');
            setPassword('');
            setPassword2('');
            setEmail('');
        });
    }

    return (
        <div className="flex justify-center md:mb-6 md:mt-20">
            <form className="w-full max-w-lg items-center md:p-10 md:pb-4 md:bg-gray-100 md:border-2 md:rounded-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">First Name</label>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${isValidFirstName ? 'border-gray-200' : 'border-red-500'}`}
                            id="grid-first-name"
                            type="text"
                            placeholder="Jane"
                            value={firstName}
                            onChange={(e) => changeFirstname(e)}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">Last Name</label>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isValidLastName ? 'border-gray-200' : 'border-red-500'}`}
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => changeLastName(e)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">Email</label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-email"
                            type="text"
                            placeholder="address@email.com"
                            value={email}
                            onChange={(e) => {changeEmail(e)}}
                        />
                        {
                            !isValidEmail &&
                            <p className="text-red-500 text-xs italic">
                                The email address is not valid.
                            </p>
                        }
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
                            onChange={(e) => {changePassword(e)}}
                        />
                        {
                            !isValidPassword && 
                            <p className="text-red-500 text-xs italic">
                                Password must contain at least one lowercase letter, one uppercase letter, one digit and one special character. Password length must be greater than 8.
                            </p>
                        }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password2"
                        >
                            Confirm password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password2"
                            type="password"
                            placeholder="********"
                            value={password2}
                            onChange={(e) => changePassword2(e)}
                        />
                        {
                            !isValidPassword2 && 
                            <p className="text-red-500 text-xs italic">
                                The passwords do not match.
                            </p>
                        }
                    </div>
                </div>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Birth date"
                        inputFormat="MM/dd/yyyy"
                        value={birthDate}
                        onChange={(value) => changeBirthDate(value)}
                        renderInput={(params) => <TextField className="w-full" {...params} />}
                    />
                </LocalizationProvider>
                {
                    !isValidBirthDate &&
                    <p className="text-red-500 text-xs italic">
                        You must be at least 16 years old.
                    </p>
                }

                <div className="flex flex-wrap mb-4 mt-10 text-center justify-center">
                    <button onClick={createUser} disabled={!isValidAccount} className="bg-transparent disabled:hover:cursor-not-allowed hover:bg-blue-500 text-blue-700 font-semibold hover:text-white disabled:hover:bg-gray-100 disabled:hover:text-blue-700 disabled:hover:border-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
