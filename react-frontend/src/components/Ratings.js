import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";

import DeleteRecipeModal from "./DeleteRecipeModal";
import ImageModal from "./ImageModel";

import { Rating } from '@smastrom/react-rating';


export default function Ratings(props) {
    const { register, control, handleSubmit, watch, setValue, reset, getValues, formState: { errors } } = useForm({
        mode: "OnSubmit"
    });
    const [ ratings, setRatings ] = useState([]);
    const [ userRating, setUserRating ] = useState({});
    const [ formActive, setFormActive ] = useState(true);
    const [ refreshKey, setRefreshKey ] = useState(0);
    const navigate = useNavigate();
    const { username } = useContext(Context);

    useEffect(() => {
        axiosInstance.get('/ratings/?recipe=' + props.recipe_id).then((res) => {
            setRatings(res.data);
        });
    }, [refreshKey]);

    useEffect(() => {
        if(username) {
            axiosInstance.get('/user-rating/?recipe_id=' + props.recipe_id).then((res) => {
                setUserRating(res.data);
                if(JSON.stringify(res.data) == "{}") {
                    setFormActive(true);
                } else {
                    setFormActive(false);
                    setValue('rating', res.data.rating);
                    setValue('review', res.data.review);
                };
            });
        };
    }, [refreshKey]);

    const onFormSubmit = (data) => { 
        const formData = new FormData();
        formData.append('review', data.review);
        formData.append('rating', data.rating);

        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': localStorage.getItem('access_token') ?
                'Bearer ' + localStorage.getItem('access_token') :
                null,
            },
        };

        if(JSON.stringify(userRating) == "{}") {
            formData.append('recipe', props.recipe_id);
            axiosInstance.post('/ratings/', formData, config).then((response) => {
                console.log(response.data);
                setRefreshKey(refreshKey + 1);
            });
        } else {
            axiosInstance.patch('/ratings/' + userRating.id + '/', formData, config).then((response) => {
                console.log(response.data);
                setRefreshKey(refreshKey + 1);
            });
        };
        
        
    };

    const onErrors = (errors) => console.error(errors);

    const handleCancel = () => {
        if(JSON.stringify(userRating) == "{}") {
            reset();
        } else {
            setFormActive(false);
        }
    }

// py-10 mt-10 mb-10 px-12 border bg-white rounded-md
    return(
        <div id="ratings" className="max-w-4xl m-auto">
            <label className="text-2xl font-bold font-medium block">Ratings ({props.num_ratings})</label>
            <hr className="my-5"></hr>

            {
                username ?
                    <div className="bg-gray-300 p-6">
                        <div className="bg-white p-5">
                            {
                                formActive ? (
                                    <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                                        <div>
                                            <label className="text-xl font-bold font-medium block">My Rating</label>
                                            <Controller
                                            control={control}
                                            name="rating"
                                            rules={{
                                                validate: (rating) => rating > 0,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Rating
                                                value={value}
                                                isRequired
                                                onChange={onChange}
                                                visibleLabelId="rating_label"
                                                onBlur={onBlur}
                                                style={{ maxWidth: 175 }}
                                                />
                                            )}
                                            />
                                            {errors.rating && <div className="text-normal text-red-500">Rating is required.</div>}
                                        </div>
                                        <label className="text-xl pt-5 font-bold font-medium block">My Review</label>
                                        <textarea 
                                            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700" 
                                            name="review"
                                            rows={5}
                                            {...register('review', { required: { value: true, message: "This field is required"}})} 
                                        />
                                        {errors.rating && <div className="text-normal text-red-500">Review is required.</div>}
                                        <div className="flex">
                                            <button
                                                onClick={handleCancel}
                                                className="mt-4 w-full bg-blue-400 hover:bg-blue-600 text-blue-100 border py-3 px-6 font-semibold text-md rounded"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="mt-4 w-full bg-blue-400 hover:bg-blue-600 text-blue-100 border py-3 px-6 font-semibold text-md rounded"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div>
                                        <div className="flex justify-between">
                                            <label className="text-xl font-bold font-medium block">My Rating</label>
                                            <div>
                                                <ion-icon name="create-outline"></ion-icon>
                                                <button
                                                    className="hover:underline font-semibold"
                                                    onClick={() => setFormActive(true)}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <Rating
                                            style={{ maxWidth: 175 }}
                                            value={userRating.rating}
                                            readOnly
                                        />
                                        <p>{userRating.date_last_updated}</p>
                                        <p>{userRating.review}</p>
                                    </div>
                                )
                            }
                        </div>
                        
                    </div>
                :
                <></>
            }
            
            { ratings.map( (rating) => (
                <div>
                    <hr className="my-5"></hr>
                    <p>{rating.username}</p>
                    <Rating
                        style={{ maxWidth: 100 }}
                        value={rating.rating}
                        readOnly
                    />
                    <p>{rating.date_last_updated}</p>
                    <p>{rating.review}</p>
                </div>
            ))}
        </div>
    )
}