import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link } from "react-router-dom"


export default function AllRecipes() {
    // const { username, setUsername } = useContext(Context);
    const [ recipes, setRecipes ] = useState([]);

    useEffect(() => {
        axiosInstance.get('/recipes/').then((res) => {
            setRecipes(res.data);
        });
    }, [])

    return(
        <div>
            <h1>List of all of the recipes on the site:</h1>

            {
                recipes === null ?
                <h5>Loading recipes data...</h5> :
                <div className="flex flex-wrap flex-start">
                    { recipes.map( (recipe) => (
                        <Link className="w-80 h-96 m-4 overflow-hidden bg-white rounded-md" to={'/recipe/' + recipe.id}>
                            <img className="w-full h-64 object-cover" src={recipe.photo}/>
                            <div className="pt-4 pl-4 pr-4 font-semibold text-2xl">
                                {recipe.recipe_name}
                            </div>
                            <div className="pl-4">by {recipe.username}</div>
                        </Link>
                    )) }
                </div>
            }
        </div>
    );
}

{/* <Link className="bg-gray border rounded-lg overflow-hidden" to={'/recipe/' + recipe.id}>
<img className="h-32 w-full" src={recipe.photo}/> */}