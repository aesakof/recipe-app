import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link } from "react-router-dom"

const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 5,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      {
        id: 6,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      }
    
    // More products...
  ]

export default function AllRecipes() {
    // const { username, setUsername } = useContext(Context);
    const [ recipes, setRecipes ] = useState([]);

    useEffect(() => {
        axiosInstance.get('/recipes/').then((res) => {
            setRecipes(res.data);
        });
    }, [])

    return(
    //     <div className="bg-white">
    //     <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    //       <h2 className="sr-only">Products</h2>
  
    //       <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    //         {products.map((product) => (
    //           <a key={product.id} href={product.href} className="group">
    //             <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
    //               <img
    //                 src={product.imageSrc}
    //                 alt={product.imageAlt}
    //                 className="h-full w-full object-cover object-center group-hover:opacity-75"
    //               />
    //             </div>
    //             <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
    //             <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    //           </a>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
        <div>
            <h1>List of all of the recipes on the site:</h1>

            {
                recipes === null ?
                <h5>Loading recipes data...</h5> :
                <div className="px-20 py-10 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    { recipes.map( (recipe) => (
                        <Link className="" to={'/recipe/' + recipe.id}>
                            <img className="h-72 w-full object-cover" src={recipe.photo}/>
                            <div className="">
                                {recipe.recipe_name}
                            </div>
                            <div className="">by {recipe.username}</div>
                        </Link>
                    )) }
                </div>
            }
        </div>
    );
}

{/* <Link className="bg-gray border rounded-lg overflow-hidden" to={'/recipe/' + recipe.id}>
<img className="h-32 w-full" src={recipe.photo}/> */}

{/* <div>
<h1>List of all of the recipes on the site:</h1>

{
    recipes === null ?
    <h5>Loading recipes data...</h5> :
    <div className="flex flex-wrap flex-start">
        { recipes.map( (recipe) => (
            <Link className="w-72 h-96 m-4 overflow-hidden bg-white border rounded-md" to={'/recipe/' + recipe.id}>
                <img className="w-full h-64 object-cover" src={recipe.photo}/>
                <div className="pt-4 pl-4 pr-4 font-semibold text-2xl">
                    {recipe.recipe_name}
                </div>
                <div className="pl-4">by {recipe.username}</div>
            </Link>
        )) }
    </div>
}
</div> */}