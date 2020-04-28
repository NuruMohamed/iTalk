import React, { createContext, useState, useEffect } from 'react';
import {db} from './Auth/firebaseAuth';
export let CurrentUser = createContext();

export function UserContext(props) {
    let [user, setUser] = useState(null);
    let [userInfo, setUserInfo] = useState(null)
    console.log(userInfo)
    console.log(user)
    useEffect(() => {
        if(user != null){
            db.collection('users').doc(user).onSnapshot(doc => setUserInfo(doc.data()) );
        }
        
    }, [user]);
    return (
        <CurrentUser.Provider value={{user:[user, setUser], userInfo: [userInfo, setUserInfo]}} >
            {props.children}
        </CurrentUser.Provider >
    );
}
