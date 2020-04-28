import React, { Fragment } from 'react';
import './../../Style/Desktop/Trending/Trending.css';
import DisplayTweets from './../Tweet/DisplayTweets.js';

function Trending(props) {
    return (
        <Fragment>
            <div id='trendingHeader'>
                Trending: #Africa
            </div>
            <DisplayTweets/>
        </Fragment>
    );
}

export default Trending;