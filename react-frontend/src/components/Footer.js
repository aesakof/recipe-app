import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <div className="mt-auto bg-neutral-900 text-white py-6">
            <ul className="sm:flex sm:justify-between">
                <li className="mx-auto">Copyright Alex Esakof 2023 (not actually copyrighted)</li>
                <li className="mx-auto"><a href="https://github.com/aesakof/recipe-app">Github Repo</a></li>
            </ul>
            
        </div>
    )
}