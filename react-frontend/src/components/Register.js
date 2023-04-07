import React, { useState, useRef } from 'react';
import axiosInstance from '../axios';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


export default function SignUp() {
	const navigate = useNavigate();
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm({ mode: "onBlur", reValidateMode: "onBlur"});

    const password = useRef({});
    password.current = watch("password", "");

    const onFormSubmit = (data) => { 
        console.log(data);
        const formData = new FormData();
        formData.append('email', data.email_address);
        formData.append('user_name', data.username)
        formData.append('password', data.password);

        axiosInstance
            .post('/user/create/', formData)
            .then((response) => {
                navigate('/login/')
            });
    };

    const checkUsernameExists = (user_name) => {
        const formData = new FormData();
        formData.append('user_name', user_name)
        return axiosInstance
            .post('/user/checkusernameexists/', formData)
            .then((response) => {
                return response.data.isAvailable || "This username is already in use";
            });
    };

    const checkEmailExists = (email) => {
        // console.log(email !== 'aesakof@gmail.com')
        // return email !== 'aesakof@gmail.com' || "This email address is already in use"

        const formData = new FormData();
        formData.append('email', email)
        return axiosInstance
            .post('/user/checkemailexists/', formData)
            .then((response) => {
                return response.data.isAvailable || "This email address is already in use";
            });

        // const formData = new FormData();
        // formData.append('email', email)
        // const response = await axiosInstance
        //     .post('/user/checkemailexists/', formData);
        // console.log(response.data.isAvailable);
        // return response.data.isAvailable || "This email address is already in use";
    };

    const onErrors = (errors) => console.error(errors);

	return (
        <React.Fragment>
            <form 
                className="max-w-md m-auto py-10 mt-10 mb-10 px-12 border bg-white rounded-md"
                onSubmit={handleSubmit(onFormSubmit, onErrors)}
            >
                <h1 className="text-center text-4xl font-semibold mt-10">Sign Up</h1>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Email Address</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        name="email_address" 
                        type= "text"
                        {...register('email_address', { 
                            required: { value: true, message: "This field is required"}, 
                            validate: {
                                checkEmailExists: (value) => checkEmailExists(value),
                            },
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                    />
                    {errors.email_address && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.email_address.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Username</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        name="username" 
                        {...register('username', { 
                            required: { value: true, message: "This field is required"},
                            validate: {
                                checkUsernameExists: (value) => checkUsernameExists(value),
                            }
                        })} 
                    />
                    {errors.username && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.username.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Password</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="password"
                        type="password"
                        {...register('password', { required: { value: true, message: "This field is required"}, minLength: { value: 8, message: "Password must have at least 8 characters"}})} 
                    />
                    {errors.password && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.password.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Confirm Password</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="confirm_password"
                        type="password"
                        {...register('confirm_password', { validate: value => value === password.current || "The passwords do not match"})} 
                    />
                    {errors.confirm_password && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.confirm_password.message}
                    </div>
                    )}
                </div>
                <button
                    className="mt-4 w-full bg-blue-400 hover:bg-blue-600 text-blue-100 border py-3 px-6 mb-3  font-semibold text-md rounded"
                    type="submit"
                >
                    Submit
                </button>
                <Link to="/login" className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
					Already have an account? Sign In
				</Link>
            </form>
        </React.Fragment>
	);
}