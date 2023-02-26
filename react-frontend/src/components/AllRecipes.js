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
                <div>
                    { recipes.map( (recipe) => (
                        <div>
                            <Link to={'/recipe/' + recipe.id}>
                                {recipe.recipe_name}
                            </Link>
                        </div>
                    )) }
                </div>
            }
        </div>
    );
}