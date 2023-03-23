import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


export default function SignUp() {
	const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

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
                        {...register('email_address', { required: { value: true, message: "This field is required"}})} 
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
                        {...register('username', { required: { value: true, message: "This field is required"}})} 
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
                        {...register('password', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.password && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.password.message}
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