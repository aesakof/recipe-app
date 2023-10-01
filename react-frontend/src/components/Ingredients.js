import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";

export default function Ingredients(props) {

    return(
        <div id="ratings" className="max-w-4xl m-auto pb-9">
            <label className="text-2xl font-bold font-medium block">Ingredients</label>
            <input className="border-solid border-gray-300 border my-3 py-2 px-4 w-full rounded text-gray-700" />
            <input className="border-solid border-gray-300 border my-3 py-2 px-4 w-full rounded text-gray-700" />
            <input className="border-solid border-gray-300 border my-3 py-2 px-4 w-full rounded text-gray-700" />

        </div>
    )
}