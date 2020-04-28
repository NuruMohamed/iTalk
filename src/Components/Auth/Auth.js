import React, { Fragment, useContext, useState } from 'react';
import {CurrentUser} from './../UserContext.js';
import Desktop from './../Desktop.js';
import Login from './login.js';
import AuthHome from './AuthHome.js';
import {auth} from './firebaseAuth.js';
import './../../Style/Desktop/Auth/Auth.css';

function Auth(props) {
    let {user, userInfo} = useContext(CurrentUser)
    let [currentUserInfo, currentSetUserInfo] = user;
    let [userInfoData, setUserInfoData] = userInfo;
    let [currentUser, setCurrentUser] = useState('wait');
    auth.onAuthStateChanged(user =>  setCurrentUser(user) );

    function handleAuth() {
        if(currentUser == 'wait')
            return <h1 className='loading'> Loading ... </h1>
        else {
            return currentUser == null? <AuthHome/> : handleCurrentUser()
        }
    }

    function handleCurrentUser() {
        currentSetUserInfo(currentUser.uid);
        console.log(userInfoData)
        return currentUserInfo == null? <h1 className='loading'> Loading ... </h1> : <Desktop/> 
    }

    return (
        <Fragment>
            {/* { user != null? <Desktop/> : <Login/> } */}
            {handleAuth()}
         </Fragment>
    );
}

export default Auth;