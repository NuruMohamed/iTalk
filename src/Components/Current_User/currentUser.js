import React,{useContext, useEffect, useState} from 'react';
import './../../Style/Desktop/Current_User/currentUser.css';
import {Avatar, Button} from '@material-ui/core';
import {auth, db} from './../Auth/firebaseAuth.js';
import { CurrentUser} from './../UserContext.js';

function CurrentUserBar(props) {
    let {user, userInfo} = useContext(CurrentUser);
    let [userId, setUserId] = user;
    let [currentUserInfo, setCurrentUserInfo] = userInfo;
    let [data, setData] = useState('null');
    // console.log(user);
    useEffect(() => {
        db.collection('users').doc(userId).onSnapshot(doc => setData(doc.data()));
    });

    return (        
        <div id='user'>
            {/* the profile picture of the current logged in user */}
            <Avatar id='userPhoto' src={ data == null? '' : data.pictureURL} /> 
            <span id='userName' > {data == null? '' : data.firstName + ' ' + data.lastName} </span>

            {/* small drawer at the top right corner to log out */}
            <div id='logoutTooltip'> 
                <span id='arrow' > {'<'} </span>
                <span id='logoutText' onClick={()=> auth.signOut()} > log out </span>
            </div>
        </div>
    );
}

export default CurrentUserBar;