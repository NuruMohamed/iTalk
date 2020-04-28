import React,{Fragment, useContext, useState} from 'react';
import './../Style/Desktop/mainBody.css';
import HandleChatAndNotification from './handleChatAndNotification.js';
import Home from './Home/Home.js';
import UserProfile from './User_Profile/User_Profile.js';
import Trending from './Trending/Trending.js';
import Search from './Search/Search.js';
import TrendingTopicsList from './Trending/TrendingTopicsList.js';

function MainBody(props) {
    let [middleMainPanel, setMiddleMainPanel] = useState({component: 'home', info: 'yMkWfEHfMuWhe2bYOTl6hmRKXI42'});
    let [selectedChat, updateSelectedChat] = useState(null);

    function handleMiddleMainPanel() {
        if(middleMainPanel.component == 'userProfile'){
            return <UserProfile userData={[middleMainPanel, setMiddleMainPanel]} updateSelectedChat={updateSelectedChat} />
        } else if (middleMainPanel.component == 'home') {
            return <Home userData={[middleMainPanel, setMiddleMainPanel]} />
        } else if (middleMainPanel.component == 'trending') {
            return <Trending/>
        }
    }
    return (  
        // mainBody is the global container for all the area just below the header
        //there are 3 main columns in the mainBody
        <div className='mainBody' >
            {/* leftMainPanel is one of the main columns among the 3 at the left most */}
            <div className="mainPanels leftMainPanel">
                {/* "HandleChatListAndNotification" handles all the contents in the leftMainPanel*/}
                <HandleChatAndNotification setMiddleMainPanel={setMiddleMainPanel} selectedChat={[selectedChat, updateSelectedChat]}/>
            </div>
            {/* middleMainPanel is one of the main columns among the 3 at the middle of the mainBody */}
            <div className ="mainPanels middleMainPanel">
                {handleMiddleMainPanel()}
            </div>
            {/* rightMainPanel is one of the main columns among the 3 at the right most of the mainBody*/}
            <div className="mainPanels rightMainPanel">
                <Search setMiddleMainPanel={setMiddleMainPanel} />
                <TrendingTopicsList/>
            </div>
        </div>
    );
}

export default MainBody;