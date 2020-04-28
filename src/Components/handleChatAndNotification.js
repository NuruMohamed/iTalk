import React,{ Fragment, useState } from 'react';
import { Notifications, Chat } from '@material-ui/icons';
import './../Style/Desktop/handleChatAndNotification.css';
import Notification from './Notification/notification.js';
import ChatList from './Chat/ChatList.js'; 
import SingleChat from './Chat/SingleChat.js';

function HandleChatAndNotification(props) {
    const [selection, setSelection] = useState(0);
    // const [selectedChat, updateSelectedChat] = useState(null);
    return (
        <Fragment>
            <div id='chatListAndNotificationContainer'>
                <div id='selectionTab' value={0}> 
                    <span className='tab notificatonIcon' onClick={() => setSelection(0)}>
                        <Notifications/>
                    </span>
                    <span className='tab chatIcon' onClick={() => setSelection(1)}>
                        <Chat/>
                    </span>
                </div>
               { (selection == 0)? <Notification setMiddleMainPanel={props.setMiddleMainPanel} /> : <ChatList selectedChat={props.selectedChat} /> }
                
                
                <SingleChat selectedChat={props.selectedChat} setMiddleMainPanel={props.setMiddleMainPanel} />
            </div>
            
        </Fragment>
    );
}

export default HandleChatAndNotification;