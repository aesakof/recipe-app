import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import DeleteRecipeModal from "./DeleteRecipeModal";
import ImageModal from "./ImageModel";


export default function AllRecipes() {
    const { username } = useContext(Context);
    const [ recipe, setRecipe ] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ showImageModal, setShowImageModal ] = useState(false);

    useEffect(() => {
        axiosInstance.get('/recipes/' + id).then((res) => {
            setRecipe(res.data);
        });
    }, [])

    return(
        <div>
            {
                recipe === null ?
                <h5>Loading recipes data...</h5> :
                <div className="max-w-4xl m-auto py-10 mt-10 mb-10 px-12 border bg-white rounded-md">
                    <p>Tags: tag 1   tag 2   tag 3</p>
                    <h1 className="text-left text-7xl py-2 font-bold">{recipe.recipe_name}</h1>
                    <p className="py-2">It's a really good sandwich</p>
                    <p className="py-2">Rating: 5 stars</p>
                    <p className="py-2">Recipe by: {recipe.username} | Published: {recipe.date_published} Updated: {recipe.date_last_updated}</p>
                    
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
                    <p>Life Story: {recipe.life_story}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Prep Time</label>
                    <p>Prep Time: {recipe.prep_time}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Cook Time</label>
                    <p>Cook Time: {recipe.cook_time}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Servings</label>
                    <p>Servings: {recipe.servings}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Ingredients</label>
                    <p>Ingredients: {recipe.ingredients}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Equipment</label>
                    <p>Equipment: {recipe.equipment}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Directions</label>
                    <p>Directions: {recipe.directions}</p>

                    <label className="text-2xl font-bold font-medium block mt-5">Rating</label>
                    <p>Rating: {recipe.rating}</p>
                </div>
            }
        </div>
    );
}