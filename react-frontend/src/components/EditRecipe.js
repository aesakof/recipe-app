import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../Context';
import { useForm } from "react-hook-form";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';


export default function EditRecipe() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const { id } = useParams();
	const blankFormData = {
        recipe_name: '',
        username: '',
        photo: '',
        life_story: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        ingredients: '',
        equipment: '',
        directions: '',
        published_date: Moment().format('YYYY-MM-DD 12:00:00'),
        updated_date: Moment().format('YYYY-MM-DD 12:00:00'),
        rating: ''
    };

	const [initialFormData, setInitialFormData] = useState(blankFormData);

    const { username } = useContext(Context);

    useEffect(() => {
        axiosInstance.get('/recipes/' + id).then((res) => {
            setValue('recipe_name', res.data.recipe_name)
            setValue('photo', res.data.photo)
            setValue('life_story', res.data.life_story)
            setValue('prep_time', res.data.prep_time)
            setValue('cook_time', res.data.cook_time)
            setValue('servings', res.data.servings)
            setValue('ingredients', res.data.ingredients)
            setValue('equipment', res.data.equipment)
            setValue('directions', res.data.directions)
            setValue('rating', res.data.rating)
        });
    }, [username])

    const onFormSubmit = (data) => { 
        console.log(data);
        const formData = new FormData();
        formData.append('photo', data.photo[0]);
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
        axiosInstance.put('/recipes/' + id + '/', formData, config).then((response) => {
            console.log(response.data);
        });
    };

    const onErrors = (errors) => console.error(errors);

    return (
        <React.Fragment>
            <form 
                className="max-w-2xl m-auto py-10 mt-10 mb-10 px-12 border bg-white rounded-md"
                onSubmit={handleSubmit(onFormSubmit, onErrors)}
            >
                <h1 className="text-center text-4xl font-semibold mt-10">Edit Recipe</h1>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Recipe Name</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        name="recipe_name"
                        {...register('recipe_name', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.recipe_name && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.recipe_name.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Photo</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                        name="photo"
                        type="file"
                        accept="image/jpeg,image/png,image/gif" 
                        {...register('photo', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.photo && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.photo.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Life Story</label>
                    <textarea 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="life_story"
                        rows={5}
                        {...register('life_story', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.life_story && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.life_story.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Prep Time</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="prep_time"
                        type="number"
                        {...register('prep_time', { required: { value: true, message: "This field is required"}, min: { value: 0, message: "Prep time cannot be below zero minutes!" }})} 
                    />
                    {errors.prep_time && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.prep_time.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Cook Time</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="cook_time"
                        type="number"
                        {...register('cook_time', { required: { value: true, message: "This field is required"}, min: { value: 0, message: "Cook time cannot be below zero minutes!"}})} 
                    />
                    {errors.cook_time && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.cook_time.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Servings</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="servings"
                        type="number"
                        {...register('servings', { required: { value: true, message: "This field is required"}, min: { value: 0, message: "Servings cannot be below zero!" }})} 
                    />
                    {errors.servings && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.servings.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Ingredients</label>
                    <textarea 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="ingredients"
                        rows={5} 
                        {...register('ingredients', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.ingredients && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.ingredients.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Equipment</label>
                    <textarea 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="equipment"
                        rows={5}
                        {...register('equipment', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.equipment && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.equipment.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Directions</label>
                    <textarea 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="directions"
                        rows={5} 
                        {...register('directions', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.directions && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.directions.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Rating</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="rating" 
                        {...register('rating', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.rating && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.rating.message}
                    </div>
                    )}
                </div>
                <button
                    className="mt-4 w-full bg-blue-400 hover:bg-blue-600 text-blue-100 border py-3 px-6 font-semibold text-md rounded"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </React.Fragment>
    );
};