import React, { Fragment, useState, useContext, useEffect, useRef } from 'react';
import './../../Style/Desktop/Tweet/DisplayTweets.css';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FetchData from './fetchData.js';
import UserProfile from '../User_Profile/User_Profile';
import { db } from '../Auth/firebaseAuth';
import {CurrentUser} from './../UserContext.js';
let Tooltip = React.createRef();

function DisplayTweets(props) {
    // contains user data for each tweets
    let [userData, setUserData ] = useState({});
    // tweets set from fetchData component
    let [userTweets, setUserTweets] = useState(null);
    // logged in user information 
    let {userInfo} = useContext(CurrentUser);
    let [loggedUserData = null, setLoggedUserData] = userInfo;
    // all processed tweets to be displayed right away
    let [homeJSXTweets, setHomeJSXTweets] = useState( {tweets:[], prevLength: 0});
    // props came all the way from mainMiddlePanel component to control what to be displayed from here. i.e display profile when a user name clicked
    let [middleMainPanel, setMiddleMainPanel] = props.middleMainPanel;
    //contains data for tooltip, displayed onhover over a userId in a tweet
    let [tooltipData, setTooltipData ] = useState({userId: null, data: null});
    // data that helps to paginate tweets 
    let [paginationLimit, setPaginationLimit] = useState({limit: 5, previousScrollHeight: 0});
    // reference to handle pagination animation
    let tweetsPaginationLoadingRef = useRef();

    useEffect( () => {
        // runs if this component is called from home and, after tweets and current logge in user data are fetched 
        if( props.callFrom == 'home' && userTweets != null && loggedUserData != null) {    
            fetchTweetUserData(userTweets);
        }
    }, [userTweets, loggedUserData]);

    async function fetchTweetUserData(tweets) {
        let wrappedJsxTweets = []; 
        // checks if there are no more tweets to display when paginating 
        if(tweets.docs.length > 0) {

            for( let [index, tweetDoc] of tweets.docs.entries()) { 
                // checks if a tweet belongs to a person that the logged in user is following.  
                if (loggedUserData.following.includes(tweetDoc.ref.parent.parent.id)) {
                    // waits till each tweets' user data(tweet owner) is fetched
                    let tweetUser = await db.collection('users').doc(tweetDoc.ref.parent.parent.id).get();
                    wrappedJsxTweets.push(
                        <div className='eachTweet' key={tweetDoc.id}>
                            <div className='tweetUserInfo'>
                                <img className='tweetUserPicture' src={tweetUser.data().pictureURL} />
                                <span className='tweetUserFullName' > <b> {tweetUser.data().firstName + ' ' + tweetUser.data().lastName} </b> </span>
                                <span className='tweetUserId' > {`@${tweetUser.data().userId}`} </span>
                            </div>
                            <div className='tweetContent' >
                                {/* as data fetching is asynchronous, it checks and if the data is fetched, it will call the function */}
                                {  manipulateTweetBody(tweetDoc.data().body) }
                            </div>
                            
                            <div className='tweetReaction' >
                                <FavoriteIcon className='tweetReactionIcon' />
                                <span className='numberOfTweetReactions'> {tweetDoc.data().reaction.length} </span>
                            </div>
                        </div>
                    )
                    // checks a tweet is the last one among the currently fetched tweets 
                    if(index ==  tweets.docs.length-1) {
                        // checks if there are no more tweets to display when paginating. marks as the bottom of all tweets to be displayed for the current logged in user.  
                        if (homeJSXTweets.prevLength == wrappedJsxTweets.length) {
                            tweetsPaginationLoadingRef.current.innerHTML = ' ';
                        } else {
                            // there are more tweets to display, so display loading animation at the end of current tweet display
                            wrappedJsxTweets.push( <div ref = {tweetsPaginationLoadingRef} id='tweetsPaginationLoading' > loading... </div> );
                            setHomeJSXTweets( { tweets: wrappedJsxTweets, prevLength: wrappedJsxTweets.length - 1 } );
                        }
                        
                    }
                    // index ==  tweets.docs.length-1? setHomeJSXTweets( wrappedJsxTweets) : console.log();
                }
            }
        }
    }   

    // handles tweets pagination which happens when a user scroll down at the end of the current display.  
    function handleTweetsPagination() {
        let doc = document.documentElement;
            window.addEventListener('scroll', () => {
                // when a user scrolls it checks if the user is at the bottom of the current display
                console.log(doc.scrollTop);
                console.log(doc.scrollHeight - doc.clientHeight);
                if(doc.scrollTop == doc.scrollHeight - doc.clientHeight) { 
                    // prevents unwanted paginationLimit data ulteration on re-renders. 
                    // this happens as fetching the new tweets is asynchronous, the scrollHeight remains the same till the tweets are 
                    // fetched, processed and displayed. The scrollHeight changes when the tweets are displayed. In between there are re-renders.
                    // So, the storing the scrollHeight when a user scroll to the bottom helps to prevent unwanted repetition.   
                    if( paginationLimit.previousScrollHeight != doc.scrollHeight) {
                        setPaginationLimit( prev => { return {limit : prev.limit + 5, previousScrollHeight: doc.scrollHeight } });
                    } 
                } 
            });
    }


    //the function accepts DOM event from where it's called and userId
    function handleTooltipMouseOver(event, userId) {
        setTooltipData(prevState => {
            //slice out the '@' sign from userId to retrieve the data from Database as it's stored with out '@'
            return {...prevState, userId: userId.slice(1)}
        })
        // controls where the tooltip to be displayed horizontally  
        Tooltip.current.style.left = event.clientX + 'px';
        // controls where the tooltip to be displayed vertically  
        Tooltip.current.style.top = event.clientY+ 'px';
        Tooltip.current.style.display = 'flex';
    }


    function handleTooltipMouseOut() {
        Tooltip.current.style.display = 'none';
        // set the tooltip data null so that on the next hover over a mention it wouldn't display a user that was displayed before till the 
        // current hover overed user is displayed 
        setTooltipData({userId: null, data: null})
    }

    function manipulateTweetBody(tweet) {
        //split each word of a tweet and store on an array
        let splittedTweet = tweet.split(' ');
        //process each word to add special effect on mentions and hashtags 
		let processedTweet = splittedTweet.map((element, index) => {
                                                // checks if a word is a mention
												if(/^@/.test(element)) {
                                                    // on click event, it gets the tooltip data from the set method of the tooltipData. Because, the 
                                                    // 'tooltipData' holds the state default value. To get the latest value,'setTooltipData()' is used.
                                                    // while the data is being fetched or if there is no user with the provided userId, there will be no effect.  
													return <span key={index} className='tweetMention' onClick={() => { setTooltipData(value => {  value.data == null || value.data == 'userUnavailable'? console.log() : setMiddleMainPanel({component: 'userProfile', info: value.data.id}); return value}) ; handleTooltipMouseOut() }} onMouseOver={event => handleTooltipMouseOver(event, element, true)} onMouseOut ={handleTooltipMouseOut} > {element} </span>;
												} else if (/^#/.test(element)) { // ckecks if a word is a hashtag
													return <span key={index} className='tweetHashtag'> {element} </span>;
												} else {
                                                    // if a word is not a mention or hashtag, it will be returned as it's with a space in the front.
													return element + ' ';
												}
											});
		
        return processedTweet;
    }

    function processAllTweets() {
        return props.callFrom == 'home'? <div>{ homeJSXTweets.tweets }</div> : userTweets.map((tweet, index) => 
                                // container for a single tweet 
                                <div className='eachTweet' key={index}>
                                    <div className='tweetUserInfo'>
                                        <img className='tweetUserPicture' src={userData.pictureURL} />
                                        <span className='tweetUserFullName' > <b> {userData.firstName + ' ' + userData.lastName} </b> </span>
                                        <span className='tweetUserId' > {`@${userData.userId}`} </span>
                                    </div>
                                    <div className='tweetContent' >
                                        {/* as data fetching is asynchronous, it checks and if the data is fetched, it will call the function */}
                                        {  manipulateTweetBody(tweet.body) }
                                    </div>
                                    
                                    <div className='tweetReaction' >
                                        <FavoriteIcon className='tweetReactionIcon' />
                                        <span className='numberOfTweetReactions'> {tweet.reaction.length} </span>
                                    </div>
                                </div>
                        );
        
    }

function handleTooltipDisplay() {
    if (tooltipData.data == null) {
        return <span id='tooltipUsername' > Loading ... </span>
    } else if (tooltipData.data == 'userUnavailable') {
        return <span id='tooltipUsername' > User Unavailable </span>
    } else {
        return  <Fragment>
                    <img id='tooltipPicture' src={tooltipData.data.data().pictureURL} />
                    <span id='tooltipUsername' > {tooltipData.data.data().firstName + ' ' + tooltipData.data.data().lastName} </span>
                </Fragment>
    }
}

    return (
        <Fragment> 
            {/* as data fetching asynchronous, it checks and if the data is fetched, it will call the function */}
            { userTweets==null? null : processAllTweets()}
            {/*  */}
            { homeJSXTweets.tweets.length > 0? handleTweetsPagination() : null }
            {/* container for the tooltip that is displayed oh hover over user ID */}
            <div ref={Tooltip} id='tweetMentionTooltip'>
                {handleTooltipDisplay()}
            </div>
            <FetchData paginationLimit={paginationLimit} userInfo = {setUserData} setUserTweets = {setUserTweets} userId={tooltipData.userId} setTooltipData={setTooltipData} middleMainPanel={middleMainPanel} callFrom={props.callFrom} />
        </Fragment>
    );
}

export default DisplayTweets;