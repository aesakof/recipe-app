import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

import DeleteRecipeModal from "./DeleteRecipeModal";
import ImageModal from "./ImageModel";


export default function Ratings(ratings) {
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();


    const onFormSubmit = (data) => { 
        console.log(data);
        const formData = new FormData();
        if(data.photo.length >= 1) {
            formData.append('photo', data.photo[0]);
        }
        formData.append('recipe_name', data.recipe_name);
        formData.append('life_story', data.life_story);
        formData.append('prep_time', data.prep_time);
        formData.append('cook_time', data.cook_time);
        formData.append('servings', data.servings);
        formData.append('ingredients', data.ingredients);
        formData.append('equipment', data.equipment);
        formData.append('directions', data.directions);
        formData.append('rating', data.rating);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': localStorage.getItem('access_token') ?
                'Bearer ' + localStorage.getItem('access_token') :
                null,
            },
        };
        axiosInstance.post('/recipes/', formData, config).then((response) => {
            console.log(response.data);
            navigate('/recipe/' + response.data.id);
        });
    };

    const onErrors = (errors) => console.error(errors);

    return(
        <div className="max-w-4xl m-auto py-10 mt-10 mb-10 px-12 border bg-white rounded-md">
            <label className="text-2xl font-bold font-medium block">Ratings</label>
            <hr className="my-5"></hr>
            <form>
                <label className="text-xl font-bold font-medium block">My Review</label>
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
            { ratings.ratings.map( (rating) => (
                <div>
                    <hr className="my-5"></hr>
                    <p>{rating.username}</p>
                    <p>{rating.rating}</p>
                    <p>{rating.date_published}</p>
                    <p>{rating.comment}</p>
                </div>
            ))}
        </div>
    )
}