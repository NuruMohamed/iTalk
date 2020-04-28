import React,{Fragment} from 'react';
import './../Style/Desktop/header.css';
import CurrentUserBar from './Current_User/currentUser.js';

function Header(props) {

    return (
        // header is the top app bar that holds the web app name and the looged in user
        <div className='header'> 
           {/* <h2> iTalk </h2>  */}
           <CurrentUserBar/>
        </div>
    );
}

export default Header;