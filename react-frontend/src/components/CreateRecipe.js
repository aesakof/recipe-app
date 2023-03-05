import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from '../axios';
  

export default function CreateRecipe() {
    const { register, handleSubmit, formState: { errors } } = useForm();

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
        formData.append('published_date', data.published_date);
        formData.append('updated_date', data.updated_date);
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
        });
    };

    const onErrors = (errors) => console.error(errors);

    return (
        <React.Fragment>
            <form 
                className="max-w-xl m-auto py-10 mt-10 mb-10 px-12 border"
                onSubmit={handleSubmit(onFormSubmit, onErrors)}
            >
                <h1 className="text-center text-4xl font-semibold mt-10">New Recipe</h1>
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
                    <label className="text-gray-600 font-medium block mt-4">Published Date</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="published_date" 
                        {...register('published_date', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.published_date && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.published_date.message}
                    </div>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-medium block mt-4">Updated Date</label>
                    <input 
                        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                        name="updated_date" 
                        {...register('updated_date', { required: { value: true, message: "This field is required"}})} 
                    />
                    {errors.updated_date && (
                    <div className="mb-3 text-normal text-red-500">
                        {errors.updated_date.message}
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