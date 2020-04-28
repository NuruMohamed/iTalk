import React, { Fragment, useEffect, useState } from 'react';
import './../../Style/Desktop/Chat/SingleChatHeader.css';
import {Avatar, Badge} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import {db} from './../Auth/firebaseAuth';

function SingleChatHeader(props) {
    // the ID of the selected user for chat. it's origin is handleChatAndNotification component 
    const [selectedChat, updateSelectedChat] = props.selectedChat; 
    // attain the user data the logged in user is chating with. 
    const [user, serUser] = useState(null);

    useEffect(()=> {
        // only fetch data if there is a selected chat. By default it's null.
        selectedChat==null? console.log() : db.collection('users').doc(selectedChat).onSnapshot(user => {
                                        user.exists? serUser(user) : console.log('');
                                    })
    });
    return (
        <div id='singleChatHeader'>
            {/* only render the JSX if a chat is selected and user data is fetched */}
            {selectedChat == null || user == null ? null :  <Fragment>
                                                                <div id='singleChatUserPictureContainer' onClick={() => props.setMiddleMainPanel({component: 'userProfile', info: selectedChat})}>
                                                                    <img id='singleChatUserPicture' src={user.data().pictureURL} />
                                                                    <div id='singleChatUserBadge' >  </div>
                                                                </div>
                                                                <div id='singleChatUserName' onClick={() => props.setMiddleMainPanel({component: 'userProfile', info: selectedChat})} >
                                                                    { user.data().firstName + ' ' + user.data().lastName }
                                                                </div>
                                                                {/* the close(X) button on the top-right corner  */}
                                                                <Close id='singleChatCloseTab' onClick={() => updateSelectedChat(null)} />
                                                            </Fragment>
            }
        </div>
    );
}

export default SingleChatHeader;