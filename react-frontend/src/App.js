import React from 'react';
import {Routes, Route} from "react-router-dom"

import Navbar from './components/Navbar';
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"

// import PageNotFound from './components/PageNotFound';
// import Profile from './components/Profile';

import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
    return (
        <div style={{backgroundColor: 'white'}}>
            <CssBaseline />
            {/* <Header /> */}
            <Navbar />

            <div style={{paddingTop: '80px'}}>
                <Routes>
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="/profile" />


                    {/* <Route path="/:user" component={Profile} /> */}
                    
                    {/* <Route component={PageNotFound} /> */}
                </Routes>
            </div>



            {/* <Footer /> */}
        </div>

    )
}
export default App;
