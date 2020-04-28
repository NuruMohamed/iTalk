import React from 'react';
import './../../Style/Desktop/Home/Home.css';
import PostTweet from './../Tweet/PostTweet.js';
import DisplayTweets from './../Tweet/DisplayTweets.js';

function Home(props) {
    return (
        <div id='HomeContainer'>
            <div id='homeHeader'>
                Home
            </div>
            <PostTweet/>
            <DisplayTweets callFrom={'home'} middleMainPanel={props.userData}/>
        </div>
    );
}

export default Home;