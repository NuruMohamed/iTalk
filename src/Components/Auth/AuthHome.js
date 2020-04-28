import React, {useContext, useRef, Fragment, useState} from 'react';
import './loginStyle.css';
import './../../Style/Desktop/Auth/AuthHome.css';
import Login from './login.js';
import Signup from './signup.js';

function AuthHome() {
    const [authState, setAuthState] = useState('login');


    return (
        <div id='authHomeContainer'>
            <div id='leftSide' >
                
            </div>
            <div id='rightSide'>
                { authState == 'login'? <Login setAuthState={setAuthState}/> : <Signup setAuthState={setAuthState}/>}
            </div>
        </div>
    )
}

export default AuthHome;