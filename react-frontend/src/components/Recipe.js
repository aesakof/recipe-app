import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams } from "react-router-dom"


export default function AllRecipes() {
    const { username } = useContext(Context);
    const [ recipe, setRecipe ] = useState([]);
    const { id } = useParams();

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
                <div>
                    { username !== recipe.username ?
                        <></> : 
                        <Link to={'/recipe/edit/' + recipe.id}>Edit Recipe</Link>
                    }                    
                    <h1>{recipe.recipe_name}</h1>
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