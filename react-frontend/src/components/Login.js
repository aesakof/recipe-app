import React, { useState, useContext } from 'react';
import axiosInstance from '../axios';
import { useNavigate, redirect, Link } from 'react-router-dom';
import { Context } from '../Context';
import { useForm } from "react-hook-form";


export default function Login() {
	const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { username, setUsername } = useContext(Context)

    const onFormSubmit = (data) => { 
        console.log(data);
        const formData = new FormData();
        formData.append('email', data.email_address);
        formData.append('password', data.password);

        axiosInstance
            .post('/token/', formData)
            .then((response) => {
				localStorage.setItem('access_token', response.data.access);
				localStorage.setItem('refresh_token', response.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'Bearer ' + localStorage.getItem('access_token');

                axiosInstance.get(`/user/checkauthuser`).then((response) => {
                    setUsername(response.data.username)
                    localStorage.setItem('username', response.data.username)
                })

				navigate('/');
                console.log("should have redirected");            
            });
    };

    const onErrors = (errors) => console.error(errors);

	return (
        <React.Fragment>
            <form 
                className="max-w-md m-auto py-10 mt-10 mb-10 px-12 border bg-white rounded-md"
                onSubmit={handleSubmit(onFormSubmit, onErrors)}
            >
                <h1 className="text-center text-4xl font-semibold mt-10">Sign In</h1>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Email Address</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        name="email_address" 
                        {...register('email_address', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.email_address && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.email_address.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Password</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="password"
                        type="password"
                        {...register('password', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.password && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.password.message}
                    </div>
                    )}
                </div>
                <Link to="#" className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
					Forgot password?
				</Link>
                <button
                    className="mt-4 w-full bg-blue-400 hover:bg-blue-600 text-blue-100 border py-3 px-6 mb-3  font-semibold text-md rounded"
                    type="submit"
                >
                    Submit
                </button>
                <Link to="/Register" className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
					Don't have an account? Sign Up
				</Link>
            </form>
        </React.Fragment>
	);
}
