// import "./NavbarStyles.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";


export default function Navbar() {
    const [clicked, setClicked] = useState(false);
    const { username, setUsername } = useContext(Context);
    const [open,setOpen]=useState(false);

    useEffect(() => {
        if(username === null && localStorage.getItem('username') !== null) {
            setUsername(localStorage.getItem('username'))
        }
    }, [username]);

    const handleClick = () => {
        setClicked(!clicked)
    }

    return(
        <div className='shadow-md w-full fixed top-0 left-0 z-[5]'>
            <div className='md:flex items-center justify-between bg-neutral-900 py-6 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center text-white'>
                    THE RECIPE APP
                </div>

                <div onClick={()=>setOpen(!open)} className='text-3xl text-white absolute right-8 top-6 cursor-pointer md:hidden'>
                    <ion-icon name={open ? 'close':'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static bg-neutral-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link className='text-white hover:text-gray-400 duration-500' to="/">home</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link className='text-white hover:text-gray-400 duration-500' to="/recipes/all">all recipes</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link className='text-white hover:text-gray-400 duration-500' to="index.html">my recipes</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link className='text-white hover:text-gray-400 duration-500' to="recipe/new">new recipe</Link>
                    </li>
                    {
                        username === null ?
                        <>
                            <li className='md:ml-8 text-xl md:my-0 my-7'>
                                <Link className='text-white hover:text-gray-400 duration-500' to="/register">register</Link>
                            </li>
                            <li className='md:ml-8 text-xl md:my-0 my-7'>
                                <Link className='text-white hover:text-gray-400 duration-500' to="/login">login</Link>
                            </li>
                        </> :
                        <li className='md:ml-8 text-xl md:my-0 my-7'>
                            <Link className='text-white hover:text-gray-400 duration-500' to="/logout">logout</Link>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
};

{/* <nav>
<Link to="index.html">
    <svg id="logo-38" width="78" height="32" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" className="ccustom" fill="#FF7A00"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" className="ccompli1" fill="#FF9736"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" className="ccompli2" fill="#FFBC7D"></path> </svg>
</Link>

<div>
    <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
        <li>
            <Link to="/">home</Link>
        </li>
        <li>
            <Link to="/recipes/all">all recipes</Link>
        </li>
        <li>
            <Link to="index.html">my recipes</Link>
        </li>
        <li>
            <Link to="recipe/new">new recipe</Link>
        </li>
        {
            username === null ?
            <>
                <li>
                    <Link to="/register">register</Link>
                </li>
                <li>
                    <Link to="/login">login</Link>
                </li>
            </> :
            <li>
                <Link to="/logout">logout</Link>
            </li>
        }
    </ul>
</div>

<div id="mobile">
    <i id="bar" onClick={handleClick} className={clicked ? "fas fa-times" : "fas fa-bars"}>
    </i>
</div>
</nav> */}