import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

import DeleteRecipeModal from "./DeleteRecipeModal";
import ImageModal from "./ImageModel";
import Ratings from "./Ratings";
import Loading from "./Loading";


export default function AllRecipes() {
    const { username } = useContext(Context);
    const [ recipe, setRecipe ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const { id } = useParams();

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ showImageModal, setShowImageModal ] = useState(false);

    useEffect(() => {
        axiosInstance.get('/recipes/' + id).then((res) => {
            setRecipe(res.data);
            setIsLoading(false);
        });
    }, [])

    if (isLoading) {
        return <Loading />
    }
    return(
        <div>
            <div>
                <div className="max-w-4xl m-auto py-10 mt-10 mb-10 px-12 border bg-white rounded-md">
                    <p>Tags: tag 1   tag 2   tag 3</p>
                    <h1 className="text-left text-7xl py-2 font-bold">{recipe.recipe_name}</h1>
                    <p className="py-2">It's a really good sandwich</p>
                    <div>
                        <ion-icon size="small" name="star"></ion-icon>
                        <ion-icon size="large" name="star"></ion-icon>
                        <ion-icon className="blue" name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-half"></ion-icon>
                    </div>

                    <div class="flex items-center">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    </div>

                    <p className="py-2">Rating: {recipe.rating} stars</p>
                    <p className="py-2">by: {recipe.username} | Published: {recipe.date_published} Updated: {recipe.date_last_updated}</p>
                    
                    {   
                        username !== recipe.username ?
                        <></> :
                        <Link to={'/recipe/edit/' + recipe.id} className="mt-4 bg-blue-400 hover:bg-blue-600 text-blue-100 border py-3 px-6 font-semibold text-md rounded">
                            Edit Recipe
                        </Link>
                    }
                    {
                        username !== recipe.username ?
                        <></> :
                        <>
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(true)}
                                className="mt-3 bg-red-400 hover:bg-red-600 text-red-100 border py-3 px-6 font-semibold text-md rounded"
                            >
                                Delete Recipe
                            </button>
                            {   
                                showDeleteModal ? <DeleteRecipeModal id={id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                                : null
                            }
                        </>
                    }
                    <div onClick={() => setShowImageModal(true)} className="aspect-w-3 aspect-h-2">
                        <img className="object-cover" src={recipe.photo}/>
                    </div>
                    {
                        showImageModal ? <ImageModal showImageModal={showImageModal} setShowImageModal={setShowImageModal} image={recipe.photo} /> : null
                    }

                    <label className="text-2xl font-bold font-medium block mt-5">Life Story</label>
                    <p>{recipe.life_story}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Prep Time</label>
                    <p>{recipe.prep_time}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Cook Time</label>
                    <p>{recipe.cook_time}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Servings</label>
                    <p>{recipe.servings}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Ingredients</label>
                    <p>{recipe.ingredients}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Equipment</label>
                    <p>{recipe.equipment}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Directions</label>
                    <p>{recipe.directions}</p>
                </div>

                <Ratings ratings={recipe.ratings} recipe_id={id} />

            </div>
        </div>
    );
}