import React from "react";
import axiosInstance from '../axios';
import { useNavigate } from "react-router-dom"


export default function DeleteRecipeModal({ id, showImageModal, setShowImageModal, image}) {

    const handeOnClose= (e) => {
        if(e.target.id === "container") {
            setShowImageModal(false);
        }
    }

    return (
        <>
            <div
                id="container"
                onClick={handeOnClose}
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 backdrop-blur outline-none focus:outline-none"
            >
                <img className="max-h-screen object-cover" src={image}/>
            </div>
            <div className="opacity-25 fixed inset-0 z-40"></div>
        </>
    )
}