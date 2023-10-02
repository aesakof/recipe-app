import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";

export default function Ingredients(props) {

    return(
        <div id="ratings" className="max-w-4xl m-auto pb-9">
            <label className="text-2xl font-bold font-medium block">Ingredients</label>
            <div className="flex justify-between my-3 align-middle">
                <input className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" />
                <ion-icon name="close-circle-outline" style={{fontSize: "28px"}}></ion-icon>
            </div>
            <div className="flex justify-between my-3">
                <input className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" />
                <ion-icon name="close-circle-outline" style={{fontSize: "28px"}}></ion-icon>
            </div >
            <div className="flex justify-between my-3">
                <input className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" />
                <ion-icon name="close-circle-outline" style={{fontSize: "28px"}}></ion-icon>
            </div>
        </div>
    )
}