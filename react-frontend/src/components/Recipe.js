import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import DeleteRecipeModal from "./DeleteRecipeModal";


export default function AllRecipes() {
    const { username } = useContext(Context);
    const [ recipe, setRecipe ] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const [ showModal, setShowModal ] = useState(false);

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
                <div className="max-w-4xl m-auto py-10 mt-10 mb-10 px-12 border">
                    <h1>{recipe.recipe_name}</h1>
                    
                    {   
                        username !== recipe.username ?
                        <></> :
                        <button className="mt-4 bg-blue-400 hover:bg-blue-600 text-blue-100 border py-3 px-6 font-semibold text-md rounded">
                            <Link to={'/recipe/edit/' + recipe.id}>Edit Recipe</Link>
                        </button>
                    }
                    {
                        username !== recipe.username ?
                        <></> :
                        <>
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="mt-3 bg-red-400 hover:bg-red-600 text-red-100 border py-3 px-6 font-semibold text-md rounded"
                            >
                                Delete Recipe
                            </button>
                            {   
                                showModal ? <DeleteRecipeModal id={id} showModal={showModal} setShowModal={setShowModal} />
                                : null
                            }
                        </>
                    }

                    <p>Author: {recipe.username}</p>
                    <p>Photo: <img src={recipe.photo}/></p>
                    <p>Life Story: {recipe.life_story}</p>
                    <p>Prep Time: {recipe.prep_time}</p>
                    <p>Cook Time: {recipe.cook_time}</p>
                    <p>Servings: {recipe.servings}</p>
                    <p>Ingredients: {recipe.ingredients}</p>
                    <p>Equipment: {recipe.equipment}</p>
                    <p>Directions: {recipe.directions}</p>
                    <p>Published: {recipe.published_date}</p>
                    <p>Last Updated: {recipe.updated_date}</p>
                    <p>Rating: {recipe.rating}</p>
                </div>
            }
        </div>
    );
}