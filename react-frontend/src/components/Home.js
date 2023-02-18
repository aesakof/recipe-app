import React, { useState, useContext } from 'react';
import { Context } from "../Context";


export default function Home() {
    const { username, setUsername } = useContext(Context);

    return(
        <div>
            <h1>Welcome to the Recipe App (cooler name pending)</h1>

            {
                username === null ? <h2>You are not logged in</h2> :
                <h2>You are logged in as {username}</h2>
            }
        </div>

    );
}