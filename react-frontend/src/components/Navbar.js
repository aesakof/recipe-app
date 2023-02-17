import "./NavbarStyles.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";


export default function Navbar() {
    const [clicked, setClicked] = useState(false);
    const { username, setUsername } = useContext(Context);


    const handleClick = () => {
        setClicked(!clicked)
    }

    return(
        <>
            <nav>
                <a href="index.html">
                    <svg id="logo-38" width="78" height="32" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#FF7A00"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#FF9736"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#FFBC7D"></path> </svg>
                </a>

                <div>
                    <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>
                            <a href="index.html">All Recipes</a>
                        </li>
                        <li>
                            <a href="index.html">Blog</a>
                        </li>
                        <li>
                            <a href="index.html">About</a>
                        </li>
                        {
                            username === null ?
                            <>
                                <li>
                                    <a href="/register">Register</a>
                                </li>
                                <li>
                                    <a href="/login">Login</a>
                                </li>
                            </> :
                            <li>
                                <a href="/logout">Logout</a>
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