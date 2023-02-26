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

export default function EditRecipe() {

    const navigate = useNavigate();
    const { id } = useParams();
	const initialFormData = {
        recipe_name: '',
        username: '',
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

	const [formData, updateFormData] = useState(initialFormData);

    const { username } = useContext(Context);

    useEffect(() => {
        axiosInstance.get('/recipes/' + id).then((res) => {
            updateFormData({
                ...formData,
                'recipe_name': res.data.recipe_name,
                'username': res.data.username,
                'photo': res.data.photo,
                'life_story': res.data.life_story,
                'prep_time': res.data.prep_time,
                'cook_time': res.data.cook_time,
                'servings': res.data.servings,
                'ingredients': res.data.ingredients,
                'equipment': res.data.equipment,
                'directions': res.data.directions,
                'published_date': Moment(res.data.date).format('YYYY-MM-DD 12:00:00'),
                'updated_date': Moment(res.data.date).format('YYYY-MM-DD 12:00:00'),
                'rating': res.data.rating
            });
        });
    }, [username])

	const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
	};

    const handleCarChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
	};

    const handleDateChange = (date) => {
        updateFormData({
            ...formData,
            date: date
        });
    };

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
            .put('/recipes/' + id + '/', {
                // username: 1,
                recipe_name: formData.recipe_name,
                username: formData.username,
                photo: formData.photo,
                life_story: formData.life_story,
                prep_time: parseFloat(formData.prep_time),
                cook_time: parseFloat(formData.cook_time),
                servings: parseFloat(formData.servings),
                ingredients: formData.ingredients,
                equipment: formData.equipment,
                directions: formData.directions,
                updated_date: Moment().format('YYYY-MM-DD 12:00:00'),
                rating: parseFloat(formData.rating)
			})
			.then((res) => {
				navigate('/fillups/');
			});
	};

	const classes = useStyles();

	return (
		<Container component={Paper} maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Recipe
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
							<TextField
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
							/>
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