import React, { useEffect, useContext, useState, useRef } from 'react';
import './../../Style/Desktop/Chat/SingleChatMessages.css';
import {db} from './../Auth/firebaseAuth';
import {CurrentUser} from './../UserContext';

function SingleChatMessages(props) {
    // get the current logged in user from context
    let {user} = useContext(CurrentUser);
    // get the user id of current logged in user by destructuring  
    let [currentUserId, setCurrentUserId] = user;
    // is assigned all the messages of a chat after fetching 
    let [messages, setMessages] = useState(null);

    useEffect(() => {
        db.collection('users').doc(currentUserId).collection('chat').doc(props.selectedChat).collection('messages').orderBy('time').onSnapshot(data => {
            setMessages(data);
        })
        
    });
    
    function handleMessages() {
        let wrapedMessages = [];
        messages.forEach((eachMessage, index) => {
            // if the message is sent by the current user, display it as a sent message
            if(eachMessage.data().type == 'sent') {
                wrapedMessages.push( <div className='singleChatMessages singleChatMessageSent' key={eachMessage.id} > 
                                        {eachMessage.data().body}
                                    </div>
                                    )
            } else {
                // if the message is recieved by the current user, display it as a recieved message
                wrapedMessages.push( <div className='singleChatMessages singleChatMessageRecieved' key={eachMessage.id}>  
                                        {eachMessage.data().body}
                                     </div> )
            }
        });
        
        return wrapedMessages;
    }

    return (
        <div id='singelChatMessagesContainer' >
            {/* don't call the function that handles the messages until the messages are fetched */}
            {messages == null? null : handleMessages() }
        </div>
    );
}

export default SingleChatMessages;