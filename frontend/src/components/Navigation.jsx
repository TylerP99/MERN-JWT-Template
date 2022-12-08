import React from 'react'

import {NavLink} from "react-router-dom";

function Navigation() {

    const authenticated = 0;

    
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" >Protected</NavLink>
                </li>
                {authenticated ? 
                (
                <li>
                    <NavLink to="/logout" >Log Out</NavLink>
                </li>
                ) 
                : 
                (
                <>
                <li>
                    <NavLink to="/login" >Log In</NavLink>
                </li>
                <li>
                    <NavLink to="/register" >Register</NavLink>
                </li>
                </>
                )}
            </ul>
        </nav>
    )
}

export default Navigation