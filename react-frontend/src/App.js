import React from 'react';
import {Routes, Route} from "react-router-dom"

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Home from "./components/Home"

// import PageNotFound from './components/PageNotFound';
// import Profile from './components/Profile';

import CssBaseline from '@material-ui/core/CssBaseline';
import AllRecipes from './components/AllRecipes';
import Recipe from './components/Recipe';
import EditRecipe from './components/EditRecipe';
import CreateRecipe from './components/CreateRecipe';

import './index.css';


function App() {
    return (
        <div className='flex flex-col min-h-screen'>
            <CssBaseline />
            {/* <Header /> */}
            <Navbar />

            <div className='bg-white pt-20 overflow-y-hidden'>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="/profile" />

                    <Route exact path="/recipe/new" element={<CreateRecipe />} />
                    <Route exact path="/recipes/all" element={<AllRecipes />} />
                    <Route exact path="/recipe/:id" element={<Recipe />} />
                    <Route exact path="/recipe/edit/:id" element={<EditRecipe />} />


                    {/* <Route path="/:user" component={Profile} /> */}
                    
                    {/* <Route component={PageNotFound} /> */}
                </Routes>
            </div>

            <Footer />
        </div>

    )
}
export default App;
