import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../Context';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Moment from 'moment';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        padding: '20px',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function CreateRecipe() {

    const navigate = useNavigate();
    const { id } = useParams();
	const initialFormData = {
        recipe_name: '',
        photo: '',
        life_story: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        ingredients: '',
        equipment: '',
        directions: '',
        published_date: Moment().format('YYYY-MM-DD 12:00:00'),
        updated_date: Moment().format('YYYY-MM-DD 12:00:00'),
        rating: ''
    };

	const [formData, setFormData] = useState(initialFormData);
    const [file, setFile] = useState();

    const { username } = useContext(Context);

	const handleChange = (e) => {
        setFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
	};


    function handleImageChange(event) {
        setFile(event.target.files[0])
      }
    // const handleImageChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         // Trimming any whitespace
    //         [e.target.name]: e.target.files[0],
    //     });
    // };

    const handleCarChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
	};

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date: date
        });
    };


    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://127.0.0.1:8000/api/recipes/';
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('recipe_name', 'test');
        formData.append('life_story', 'test');
        formData.append('prep_time', 3);
        formData.append('cook_time', 3);
        formData.append('servings', 3);
        formData.append('ingredients', 'test');
        formData.append('equipment', 'test');
        formData.append('directions', 'test');
        formData.append('published_date', '2023-03-03');
        formData.append('updated_date', '2023-03-03');
        formData.append('rating', 3);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': localStorage.getItem('access_token') ?
                'Bearer ' + localStorage.getItem('access_token') :
                null,
            },
        };
        axiosInstance.post(url, formData, config).then((response) => {
            console.log(response.data);
        });
    };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
    //     const config = {
    //         headers: {
    //             'Authorization': localStorage.getItem('access_token') ?
    //             'Bearer ' + localStorage.getItem('access_token') :
    //             null,
    //             'Content-Type': 'multipart/form-data',
    //             'accept': 'application/json',
    //         },
    //     };

	// 	axiosInstance
    //         .post('/recipes/', {
    //             // username: 1,
    //             recipe_name: formData.recipe_name,
    //             photo: formData.photo,
    //             life_story: formData.life_story,
    //             prep_time: parseFloat(formData.prep_time),
    //             cook_time: parseFloat(formData.cook_time),
    //             servings: parseFloat(formData.servings),
    //             ingredients: formData.ingredients,
    //             equipment: formData.equipment,
    //             directions: formData.directions,
    //             updated_date: Moment().format('YYYY-MM-DD 12:00:00'),
    //             rating: parseFloat(formData.rating)
	// 		}, config)
	// 		.then((res) => {
	// 			navigate('/recipes/all');
	// 		});
	// };

	const classes = useStyles();

	return (
		<Container component={Paper} maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Create New Recipe
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="text"
								required
								fullWidth
								id="recipe_name"
								label="Recipe Name"
								name="recipe_name"
								autoComplete="recipe_name"
                                value={formData.recipe_name}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
                            <label>Recipe Photo: </label>
                            <input type="file" 
                                name="image_url"
                                accept="image/jpeg,image/png,image/gif"
                                onChange={(e) => {handleImageChange(e)}}/>
							{/* <TextField
								variant="outlined"
                                type="text"
								required
								fullWidth
								id="photo"
								label="Photo"
								name="photo"
								autoComplete="photo"
                                value={formData.photo}
								onChange={handleChange}
							/> */}
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="text"
								required
								fullWidth
								id="life_story"
								label="Life Story"
								name="life_story"
								autoComplete="life_story"
                                value={formData.life_story}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="number"
								required
								fullWidth
								id="prep_time"
								label="Prep Time"
								name="prep_time"
								autoComplete="prep_time"
                                value={formData.prep_time}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="number"
								required
								fullWidth
								id="cook_time"
								label="Cook Time"
								name="cook_time"
								autoComplete="cook_time"
                                value={formData.cook_time}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="number"
								required
								fullWidth
								id="servings"
								label="Servings"
								name="servings"
								autoComplete="servings"
                                value={formData.servings}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="text"
								required
								fullWidth
								id="ingredients"
								label="Ingredients"
								name="ingredients"
								autoComplete="ingredients"
                                value={formData.ingredients}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="text"
								required
								fullWidth
								id="equipment"
								label="Equipment"
								name="equipment"
								autoComplete="equipment"
                                value={formData.equipment}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="text"
								required
								fullWidth
								id="directions"
								label="Directions"
								name="directions"
								autoComplete="directions"
                                value={formData.directions}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="number"
								required
								fullWidth
								id="rating"
								label="Rating"
								name="rating"
								autoComplete="rating"
                                value={formData.rating}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Submit Recipe
					</Button>
				</form>
			</div>
		</Container>
	);
}