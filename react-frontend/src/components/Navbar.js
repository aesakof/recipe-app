import "./NavbarStyles.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";


export default function Navbar() {
    const [clicked, setClicked] = useState(false);
    const { username, setUsername } = useContext(Context);

    useEffect(() => {
        if(username === null && localStorage.getItem('username') !== null) {
            setUsername(localStorage.getItem('username'))
        }
    }, [username]);

    const handleClick = () => {
        setClicked(!clicked)
    }

    return(
        <>
            <nav>
                <Link to="index.html">
                    <svg id="logo-38" width="78" height="32" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#FF7A00"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#FF9736"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#FFBC7D"></path> </svg>
                </Link>

                <div>
                    <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="index.html">All Recipes</Link>
                        </li>
                        <li>
                            <Link to="index.html">My Recipes</Link>
                        </li>
                        {
                            username === null ?
                            <>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </> :
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        }
                    </ul>
                </div>

                <div id="mobile">
                    <i id="bar" onClick={handleClick} className={clicked ? "fas fa-times" : "fas fa-bars"}>
                    </i>
                </div>
            </nav>

        </>
    )
};