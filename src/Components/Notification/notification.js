import React,{Fragment, useEffect, useState, useContext} from 'react';
import './../../Style/Desktop/notification/notification.css';
import {db} from './../Auth/firebaseAuth';
import {CurrentUser} from './../UserContext';

function Notification(props) {
    let [notification, setNotification] = useState(null);
    let {user, userInfo} = useContext(CurrentUser)
    let [userId, setUserId] = user;
// console.log(notification);
    useEffect(() => {
        if(userId != null)
            db.collection('users').doc(userId).collection('notification').orderBy('date', 'desc').onSnapshot(doc => setNotification(doc));
    });

    function handleNotification() {
        let myNotification = [];
        notification.forEach(doc => {
            if(doc.data().type=='follow'){
                myNotification.push( <div className='eachNotificationContainer' key ={doc.id} onClick={() => props.setMiddleMainPanel({component: 'userProfile', info: doc.data().targetUser })}>
                                        <div className='notificationText'>
                                            <b> {doc.data().fullName} </b> is following you.
                                        </div> 
                                        <span className='notificationTime'> </span> 
                                    </div>     
                )
            } else if(doc.data().type=='mention') {
                myNotification.push( <div className='eachNotificationContainer' key ={doc.id} >
                                        <div className='notificationText'>
                                            <b> {doc.data().fullName} </b> mentioned you in a tweet.
                                        </div> 
                                        <span className='notificationTime'> </span> 
                                    </div>     
                )
            }
             
            });
        return myNotification;
    }

    function handlePopup() {
        return  <div>
                    
                </div>
    }

    return (
        <div id='notificationsContainer' >
            { notification==null? null : handleNotification() }
            {}
        </div>
    );
}

export default Notification;