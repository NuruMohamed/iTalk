import React, { Fragment } from 'react';
import './../../Style/Desktop/Chat/chat.css';
import SingleChatHeader from './SingleChatHeader.js';
import SingleChatMessages from './SingleChatMessages.js';
import SingleChatSendMessage from './SingleChatSendMessage.js'

function SingleChat(props) {
    const [selectedChat, updateSelectedChat] = props.selectedChat;
    return (
        <Fragment>
             
            <SingleChatHeader selectedChat={props.selectedChat} setMiddleMainPanel={props.setMiddleMainPanel}/>
            { selectedChat!=null? <SingleChatMessages selectedChat={selectedChat} /> : null }
            { selectedChat!=null? <SingleChatSendMessage selectedChat={selectedChat} /> : null }
            { selectedChat!=null? null : <div id='noChatSelectedText'> no chat selected </div>}
        </Fragment>
    );
}

export default SingleChat;