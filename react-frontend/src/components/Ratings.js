import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";

import DeleteRecipeModal from "./DeleteRecipeModal";
import ImageModal from "./ImageModel";

import { Rating } from '@smastrom/react-rating';


export default function Ratings(props) {
    const { register, control, handleSubmit, watch, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onFormSubmit = (data) => { 
        console.log(data);
        const formData = new FormData();

        formData.append('recipe', props.recipe_id);
        formData.append('review', data.review);
        formData.append('rating', data.rating);

        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': localStorage.getItem('access_token') ?
                'Bearer ' + localStorage.getItem('access_token') :
                null,
            },
        };
        axiosInstance.post('/ratings/', formData, config).then((response) => {
            console.log(response.data);
            navigate(0);
        });
    };

    const onErrors = (errors) => console.error(errors);

    return(
        <div className="max-w-4xl m-auto py-10 mt-10 mb-10 px-12 border bg-white rounded-md">
            <label className="text-2xl font-bold font-medium block">Ratings</label>
            <hr className="my-5"></hr>
            <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                <div>
                    <label className="text-xl font-bold font-medium block">My Rating</label>
                    <Controller
                    control={control}
                    name="rating"
                    rules={{
                        validate: (rating) => rating > 0,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Rating
                        value={value}
                        isRequired
                        onChange={onChange}
                        visibleLabelId="rating_label"
                        onBlur={onBlur}
                        style={{ maxWidth: 175 }}
                        />
                    )}
                    />
                    {errors.rating && <div>Rating is required.</div>}
                </div>
                <label className="text-xl pt-5 font-bold font-medium block">My Review</label>
                <textarea 
                    className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                    name="review"
                    rows={5}
                    {...register('review', { required: { value: true, message: "This field is required"}})} 
                />
                <button
                    className="mt-4 w-full bg-blue-400 hover:bg-blue-600 text-blue-100 border py-3 px-6 font-semibold text-md rounded"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            { props.ratings.map( (rating) => (
                <div>
                    <hr className="my-5"></hr>
                    <p>{rating.username}</p>
                    <Rating
                        style={{ maxWidth: 100 }}
                        value={3}
                        readOnly
                    />
                    <p>{rating.date_published}</p>
                    <p>{rating.review}</p>
                </div>
            ))}
        </div>
    )
}