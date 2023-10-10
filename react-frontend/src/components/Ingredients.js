import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm, Controller, useFormContext, useFieldArray } from "react-hook-form";

export default function Ingredients(props) {

    const [ ingredientRows, setIngredientRows ] = useState([]);

    const { register, formState: { errors }, handleSubmit, control } = useFormContext();
    const { fields, append, remove, move } = useFieldArray({
        name: "ingredients",
        control,
        rules: {
            required: "Please add at least one ingredient"
        }
    })

    const addIngedientRow = () => {
        const ingRow = {
            ingredient:'',
            header: false
        }
        setIngredientRows([...ingredientRows, ingRow]);
    }

    const addHeaderRow = () => {
        const ingRow = {
            ingredient:'',
            header: true
        }
        setIngredientRows([...ingredientRows, ingRow]);
    }

    const deleteIngredientRow = (index) => {
        console.log("Deleting row with index: " + index);
        const rows = [...ingredientRows];
        rows.splice(index, 1);
        console.log(rows)
        setIngredientRows(rows);
    }

    const handleChange = (index, evnt) => {
        const rows = [...ingredientRows];
        rows[index]["ingredient"] = evnt.target.value;
        console.log(rows)
        setIngredientRows(rows)
    }

    return(
        <div id="ratings" className="max-w-4xl m-auto pb-9">
            <label className="text-2xl font-bold font-medium block">Ingredients</label>
            {
                fields.map( (field, index) => (
                    <div key={field.id} className="flex justify-between my-3 align-middle">
                        {
                            field.header ? 
                            <input
                                type="text"
                                placeholder="Add a header"
                                {...register(`ingredients.${index}.description`, { required: true })}
                                className="border-solid text-xl font-black border-gray-300 border py-2 px-4 w-full rounded" 
                            />
                            :
                            <input
                                type="text"
                                {...register(`ingredients.${index}.description`, { required: true })}
                                placeholder="Add an ingredient"
                                className="border-solid border-gray-300 border py-2 px-4 w-full rounded" 
                            />
                        }
                        <button type="button" onClick={() => (remove(index))}>
                            <ion-icon name="close-circle-outline" style={{fontSize: "28px"}}></ion-icon>
                        </button>
                    </div>
                ))
            }
            <button 
                className="mt-4 outline hover:bg-gray-500 hover:text-white py-3 px-6 font-semibold text-md rounded" 
                onClick={() => {
                    append({
                        description:'',
                        header: false
                    });
                }} 
            >
                Add Ingredient
            </button>
            <button 
                className="mt-4 ml-2 hover:underline py-3 px-6 text-md rounded" 
                onClick={() => {
                    append({
                        description:'',
                        header: true
                    });
                }} 
            >
                Add Header
            </button>

        </div>
    )
}

{/* <div id="ratings" className="max-w-4xl m-auto pb-9">
<label className="text-2xl font-bold font-medium block">Ingredients</label>
{
    ingredientRows.map( (data, index) => (
        <div key={index} className="flex justify-between my-3 align-middle">
            {
                data.header ? 
                <input
                    onChange={(evnt) => (handleChange(index, evnt))}
                    value={data.ingredient} 
                    placeholder="Add a header"
                    className="border-solid text-xl font-black border-gray-300 border py-2 px-4 w-full rounded" 
                />
                :
                <input
                    onChange={(evnt) => (handleChange(index, evnt))}
                    value={data.ingredient} 
                    placeholder="Add an ingredient"
                    className="border-solid border-gray-300 border py-2 px-4 w-full rounded" 
                />
            }
            <button onClick={() => (deleteIngredientRow(index))}>
                <ion-icon name="close-circle-outline" style={{fontSize: "28px"}}></ion-icon>
            </button>
        </div>
    ))
}
<button className="mt-4 outline hover:bg-gray-500 hover:text-white py-3 px-6 font-semibold text-md rounded" onClick={addIngedientRow} >Add Ingredient</button>
<button className="mt-4 ml-2 hover:underline py-3 px-6 text-md rounded" onClick={addHeaderRow} >Add Header</button>

</div> */}