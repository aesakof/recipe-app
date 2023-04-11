import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link } from "react-router-dom"


export default function AllRecipes() {
    // const { username, setUsername } = useContext(Context);
    const [ recipes, setRecipes ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ prev, setPrev ] = useState();
    const [ next, setNext ] = useState();

    useEffect(() => {
        axiosInstance.get('/recipes/?page=' + page ).then((res) => {
            setRecipes([...recipes, ...res.data.results]);
            setPrev(res.data.previous);
            setNext(res.data.next);
        });
    }, [page])

    return(
        <div>
            <h1 className="text-center text-4xl pt-6">ALL RECIPES</h1>

            {
                recipes === null ?
                <h5>Loading recipes data...</h5> :
                <div>
                    <div className="px-20 pt-10 pb-3 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        { recipes.map( (recipe) => (
                            <Link className="group h-80 border" to={'/recipe/' + recipe.id}>
                                <img className="h-56 w-full object-cover" src={recipe.photo}/>
                                <div className="text-lg font-bold mt-3 group-hover:underline">
                                    {recipe.recipe_name}
                                </div>
                                <div className="disabled:hover">by {recipe.username}</div>
                            </Link>
                        )) }
                    </div>
                    <div className="text-center pb-3">
                        {/* {prev && 
                            <button onClick={() => setPage(page-1)} className="mt-4 bg-neutral-400 hover:bg-neutral-600 text-neutral-100 border py-3 px-6 font-semibold text-md rounded">
                                <Link>Previous</Link>
                            </button>
                        } */}
                        {next && 
                            <button onClick={() => setPage(page+1)} className="mt-4 bg-neutral-400 hover:bg-neutral-600 text-neutral-100 border py-3 px-6 font-semibold text-md rounded">
                                <Link>Load More</Link>
                            </button>
                        }
                    </div>
                </div>
               
                
            }
        </div>
    );
}