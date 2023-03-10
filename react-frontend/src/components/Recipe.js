import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"


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

    const deleteRecipe = (e) => {
        e.preventDefault();
		axiosInstance
			.delete('recipes/' + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {
                    setShowModal(false)
					navigate('/recipes/all/')
					window.location.reload();
			});
    }

    return(
        <div>
            {
                recipe === null ?
                <h5>Loading recipes data...</h5> :
                <div>
                    {   
                        username !== recipe.username ?
                        <></> : 
                        <Link to={'/recipe/edit/' + recipe.id}>Edit Recipe</Link>
                    }
                    {
                        username !== recipe.username ?
                        <></> :
                        <>
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                            >
                                Delete Recipe
                            </button>
                            {   
                                showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        {/*content*/}
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold">
                                                        Delete Recipe?
                                                    </h3>
                                                    <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    x
                                                    </span>
                                                    </button>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative p-6 flex-auto">
                                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                        Are you sure you want to delete this recipe? This action cannot be undone.
                                                    </p>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={deleteRecipe}
                                                    >
                                                        Delete Recipe
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                                ) : null
                            }
                        </>
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