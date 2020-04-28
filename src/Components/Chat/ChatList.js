import React, { useEffect, useContext, useState, useCallback, useMemo } from 'react';
import {Avatar} from '@material-ui/core';
import {Reply} from '@material-ui/icons';
import './../../Style/Desktop/Chat/ChatList.css';
import {db} from './../Auth/firebaseAuth';
import {CurrentUser} from './../UserContext';

function ChatList(props) {
    let {user} = useContext(CurrentUser);
    let [userId, setUserId] = user;
    let [chatList, setChatList] = useState([]);
    let [chatListUserInfo, setChatListUserInfo] = useState([]);
    let [selectedChat, updateSelectedChat] = props.selectedChat;
    useEffect(() => {
        db.collection('users').doc(userId).collection('chat').orderBy('latestMessageTime', 'desc').onSnapshot( snapshot => setChatList(snapshot));
    }, []);

    let handleChat = useMemo( () => {
        setChatListUserInfo([]);
        
        chatList.forEach(eachChat => {
            db.collection('users').doc(eachChat.id).onSnapshot(user => {
                let chat =  <div className='eachChatContainer' onClick={() => updateSelectedChat(eachChat.id)} key={eachChat.id} >
                                <div id='chatUserName' >
                                    <b> {user.data().firstName + ' ' + user.data().lastName} </b>
                                </div> 
                                <div id='chatMessage' >
                                    {eachChat.data().type=='sent'? 'You: ': null}{ eachChat.data().body}
                                </div> 
                            </div>
                // if(JSON.stringify(chatListUserInfo[chatListUserInfo.length - 1]) != JSON.stringify(chat)) { 
                    setChatListUserInfo(prev => [...prev, chat] );
                    console.log('test');
                // } else {
                    // console.log( 'no action' );
                // }
                    
            })
        })
        console.log(chatListUserInfo);
        return chatListUserInfo;
    }, [ chatList]);
    

    return (
        <div id='chatListContainer'>
            {chatListUserInfo}
        </div>
    );
}

export default React.memo(ChatList);


{/* <div className='eachChatContainer' >
<div id='chatUserName' >
<b> {user.data().firstName + ' ' + user.data().lastName} </b>
</div> 
<div id='chatMessage' >
{eachChat.data().body}
</div> 
</div> */}