import React, { useState, useContext } from 'react';
import { Context } from "../Context";


export default function Recipe() {
    const { username, setUsername } = useContext(Context);


    return(
        <div>
            <h1>RECIPE PAGE</h1>

        </div>

    );
}