import React, {useRef, useContext} from 'react';
import './../../Style/Desktop/Chat/SingleChatSendMessage.css';
import {db, firebase} from './../Auth/firebaseAuth';
import {CurrentUser} from './../UserContext';

function SingleChatSendMessage(props) {
    let {user} = useContext(CurrentUser);
    let  [currentUserId, setCurrentUserId] = user;

    let messageRef = useRef();
    function handleSend(event) {
        event.preventDefault();
// will store the message to the logged in user.        
        db.collection('users').doc(currentUserId).collection('chat').doc(props.selectedChat).collection('messages').doc().set({
            body: messageRef.current.value,
            type: 'sent',
            time: firebase.firestore.FieldValue.serverTimestamp()
        })
//   
        db.collection('users').doc(currentUserId).collection('chat').doc(props.selectedChat).set({
            body: messageRef.current.value,
            type: 'sent',
            latestMessageTime: firebase.firestore.FieldValue.serverTimestamp()
        })
// will store the message to the user who the logged in user is talking to. 
        db.collection('users').doc(props.selectedChat).collection('chat').doc(currentUserId).collection('messages').doc().set({
            body: messageRef.current.value,
            type: 'recieved',
            time: firebase.firestore.FieldValue.serverTimestamp()
        })
// 
        db.collection('users').doc(props.selectedChat).collection('chat').doc(currentUserId).set({
            body: messageRef.current.value,
            type: 'recieved',
            latestMessageTime: firebase.firestore.FieldValue.serverTimestamp()
        })
        messageRef.current.value = '';
    }
    return (
        <div id='singleChatSendMessageContainer'>
            <form onSubmit={event => handleSend(event)} autoComplete='off'>
                <input ref={messageRef} id='singleChatMessageInputField' type='text' />
                <button id='singleChatSendButton'>
                    Send
                </button>
            </form>
            
        </div>
    );
}

export default SingleChatSendMessage;