import React, { useRef } from 'react';
import './../../Style/Desktop/Tweet/PostTweet.css';

function PostTweet(props) {
    let tweetForm =useRef()
    let tweetButton =useRef()

    function handleTweetLength() {
        let val = tweetForm.current['tweet']
        if(val.value.length > 2 ) {
            val.style.boxShadow = '0px 0px 8px red';
            tweetButton.current.disabled = 'disabled';
        } else {
            val.style.boxShadow = 'none';
        }
    }

    function handleTweet(e) {
        e.preventDefault();
        // char length ; mark extra text 
        // border color 
        if(tweetForm.current['tweet'].value != '') {
            console.log('correct')
        } else {
            console.log('write something ...')
        }
        // console.log(tweetForm.current['tweet'].value)
    }

    return (
        <div id='postTweetContainer' >
            <form ref={tweetForm} onSubmit = {e => handleTweet(e)}>
                <textarea id='postTweetTextarea' name='tweet' onChange={handleTweetLength} placeholder='What is on your mind...'>

                </textarea>
                <button ref={tweetButton} id='postTweetButton' name='tweetButton' > Tweet </button>
            </form>
        </div>
    );
}

export default PostTweet;