import React, { useState, useEffect, useContext } from "react"
import axiosInstance from '../axios';
import { Context } from "../Context";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";

import DeleteRecipeModal from "./DeleteRecipeModal";
import ImageModal from "./ImageModel";

import { Rating, Star } from '@smastrom/react-rating';


export default function Ratings(props) {
    const { register, control, handleSubmit, watch, setValue, reset, getValues, formState: { errors } } = useForm({
        mode: "OnSubmit"
    });
    const [ ratings, setRatings ] = useState([]);
    const [ userRating, setUserRating ] = useState({});
    const [ ratingStats, setRatingStats ] = useState({});
    const [ showImageModal, setShowImageModal ] = useState(false);
    const [ formActive, setFormActive ] = useState(true);
    const [ refreshKey, setRefreshKey ] = useState(0);
    const [ commentPhoto, setCommentPhoto ] = useState(null);
    const navigate = useNavigate();
    const { username } = useContext(Context);

    const [picture, setPicture] = useState(null);

    const onChangePicture = (e) => {
        console.log(e.target.files);
        setPicture(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        axiosInstance.get('/ratings/?recipe=' + props.recipe_id).then((res) => {
            setRatings(res.data);
        });
    }, [refreshKey]);

    useEffect(() => {
        if(username) {
            axiosInstance.get('/user-rating/?recipe_id=' + props.recipe_id).then((res) => {
                setUserRating(res.data);
                console.log('User rating')
                console.log(res.data);
                if(JSON.stringify(res.data) == "{}") {
                    setFormActive(true);
                } else {
                    setFormActive(false);
                    setValue('rating', res.data.rating);
                    setValue('review', res.data.review);
                    setPicture(res.data.photo);
                };
            });
        };
    }, [refreshKey]);

    useEffect(() => {
        if(username) {
            axiosInstance.get('/rating-stats/?recipe_id=' + props.recipe_id).then((res) => {
                setRatingStats(res.data);
            });
        };
    }, [refreshKey]);

    const onFormSubmit = (data) => { 
        const formData = new FormData();
        formData.append('review', data.review);
        formData.append('rating', data.rating);
        if(data.photo.length >= 1) {
            formData.append('photo', data.photo[0]);
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
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

    const getWidth = (ratings, totalRatings) => {
        if(ratings > 0) {

        }
    }

    const onErrors = (errors) => console.error(errors);

    const handleCancel = () => {
        if(JSON.stringify(userRating) == "{}") {
            reset();
        } else {
            setFormActive(false);
        }
    }

    const clickCommentPhoto = (photo) => {
        setCommentPhoto(photo);
        setShowImageModal(true);
    }

// py-10 mt-10 mb-10 px-12 border bg-white rounded-md
    return(
        <div id="ratings" className="max-w-4xl m-auto pb-9">
            <label className="text-2xl font-bold font-medium block">Ratings ({props.num_ratings})</label>
            <hr className="my-5"></hr>
            <div className="bg-gray-300 p-6">
                <div className="bg-white p-5">
                    <div>
                        <div className="flex justify-center">
                            <Rating
                                value={ratingStats.average}
                                readOnly
                                style={{ maxWidth: 300 }}
                            />
                            <h1 className="">{ratingStats.average} out of 5</h1>
                            
                        </div>
                        <h1 className="flex justify-center">{ratingStats.count} Ratings</h1>
                        <div className="">
                            <div className="flex justify-center pt-1">
                                <p className="px-1">5</p>
                                <ion-icon name="star" style={{ color: "#f59e0b", paddingRight: "6px" }}></ion-icon>
                                <div className="w-96 h-5 bg-gray-300 rounded">
                                    <div 
                                        className="h-5 bg-red-800 rounded" 
                                        style={{width: ratingStats.five_stars/ratingStats.count * 100 + "%"}}>
                                    </div>
                                </div>
                                <p className="px-1">{ratingStats.five_stars}</p>
                            </div>
                            <div className="flex justify-center pt-1">
                                <p className="px-1">4</p>
                                <ion-icon name="star" style={{ color: "#f59e0b", paddingRight: "6px" }}></ion-icon>
                                <div className="w-96 h-5 bg-gray-300 rounded">
                                    <div 
                                        className="h-5 bg-red-800 rounded" 
                                        style={{width: ratingStats.four_stars/ratingStats.count * 100 + "%"}}>
                                    </div>
                                </div>
                                <p className="px-1">{ratingStats.four_stars}</p>
                            </div>
                            <div className="flex justify-center pt-1">
                                <p className="px-1">3</p>
                                <ion-icon name="star" style={{ color: "#f59e0b", paddingRight: "6px" }}></ion-icon>
                                <div className="w-96 h-5 bg-gray-300 rounded">
                                    <div 
                                        className="h-5 bg-red-800 rounded" 
                                        style={{width: ratingStats.three_stars/ratingStats.count * 100 + "%"}}>
                                    </div>
                                </div>
                                <p className="px-1">{ratingStats.three_stars}</p>
                            </div>
                            <div className="flex justify-center pt-1">
                                <p className="px-1">2</p>
                                <ion-icon name="star" style={{ color: "#f59e0b", paddingRight: "6px" }}></ion-icon>
                                <div className="w-96 h-5 bg-gray-300 rounded">
                                    <div 
                                        className="h-5 bg-red-800 rounded" 
                                        style={{width: ratingStats.two_stars/ratingStats.count * 100 + "%"}}>
                                    </div>
                                </div>
                                <p className="px-1">{ratingStats.two_stars}</p>
                            </div>
                            <div className="flex justify-center pt-1">
                                <p className="px-1">1</p>
                                <ion-icon name="star" style={{ color: "#f59e0b", paddingRight: "6px" }}></ion-icon>
                                <div className="w-96 h-5 bg-gray-300 rounded">
                                    <div 
                                        className="h-5 bg-red-800 rounded" 
                                        style={{width: ratingStats.one_stars/ratingStats.count * 100 + "%"}}>
                                    </div>
                                </div>
                                <p className="px-1">{ratingStats.one_stars}</p>
                            </div>
                        </div>
                    </div>
                    
                    <hr className="my-5"></hr>

                    {
                        username ?
                            <div>
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

                                            <div>
                                                <label className="text-gray-600 font-medium block mt-4">Photo (Optional)</label>
                                                <input 
                                                    className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                                                    name="photo"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/gif" 
                                                    {...register('photo', { 
                                                        // required: { value: true, message: "This field is required"},
                                                        onChange: (e) => {onChangePicture(e)}
                                                    })} 
                                                />
                                                {picture && <div className="aspect-w-3 aspect-h-2">
                                                    <img className="object-cover" src={picture}/>
                                                </div>}
                                                {/* {watchPhoto && <img src={URL.createObjectURL(getValues("photo"))}/>} */}
                                                {errors.photo && (
                                                <div className="mb-3 text-normal text-red-500">
                                                    {errors.photo.message}
                                                </div>
                                                )}
                                            </div>

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
                                            {userRating.photo && 
                                            <>
                                                <div onClick={() => clickCommentPhoto(userRating.photo)} className="w-48">
                                                    <img className="object-cover" src={userRating.photo}/>
                                                </div>
                                            </>}

                                        </div>
                                    )
                                }
                            </div>                        
                        :
                        <></>
                    }
                </div>
            </div>
            
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
                    {console.log(rating.photo)}
                    {rating.photo && 
                    <>
                        <div onClick={() => clickCommentPhoto(rating.photo)} className="w-48">
                            <img className="object-cover" src={rating.photo}/>
                        </div>
                    </>}
                    
                </div>
            ))}
            {
                showImageModal ? <ImageModal showImageModal={showImageModal} setShowImageModal={setShowImageModal} image={commentPhoto} /> : null
            }
        </div>
    )
}