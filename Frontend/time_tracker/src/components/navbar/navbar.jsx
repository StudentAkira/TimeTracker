import React, { useEffect, useState } from 'react';
import { APIEndpoints, frontURLs } from '../enums.tsx';
import "./navbar.css"


function NavBar() {

    const logout = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        credentials:"include"
        };

        const response = await fetch(APIEndpoints.logout, requestOptions);
        const response_json = await response.json()

        window.location.href = frontURLs.login;
        localStorage.removeItem("user_data");
    }


  return (
    <div className="navbar">
        <div className='nav_items'>

            <div className='nav_item'>
                <div className='nav_link'>
                    <a href={frontURLs.note}>Note</a>
                </div>
            </div>

            <div className='nav_item'>
                <div className='nav_link'>
                <a href={frontURLs.subject}>Subject</a>
                </div>
            </div>

            <div className='nav_item'>
                <div className='nav_link'>
                <a href={frontURLs.topic}>Topic</a>
                </div>
            </div>
            
            <button onClick={logout} className='logout_button'>
                logout
            </button>
        </div>    
    </div>
  );
}

export default NavBar;
