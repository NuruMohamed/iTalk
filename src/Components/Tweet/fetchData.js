import React, { Fragment, useMemo, useState } from 'react';
import {db} from './../Auth/firebaseAuth';

function FetchData(props) {
    // used to re-render this component when real-time data arrives 
    let [forceUpdate, setForceUpdate] = useState(1);

    function handleUserData() {
        db.collection('users').doc(props.middleMainPanel.info).onSnapshot( snapshot => {
            props.userInfo(snapshot.data());
            // console.log(snapshot.ref.parent)
            // setForceUpdate();
        });
    }

    function handleHomeTweets() {
        db.collectionGroup('tweets').orderBy('time', 'desc').limit(props.paginationLimit.limit).onSnapshot(data => {
            props.setUserTweets(data);
        });
    }

    // fetchs tweets of a user for a profile 
    function handleUserTweets() {
        let tweets = []
        db.collection('users').doc(props.middleMainPanel.info).collection('tweets').orderBy('time', 'desc').onSnapshot( snapshot => {
           snapshot.forEach(doc => {
            tweets.push(doc.data());
            }); 
            setForceUpdate(forceUpdate++);
            props.setUserTweets(tweets);
        });
    }
    // fetch data for the user ID hover over tooltip 
    function handleTooltipData() {
        // console.log(props.userId);
        if(props.userId != null) {
            db.collection('users').where('userId', '==', props.userId).get().then(data=> {
                if(data.empty) {
                    props.setTooltipData(prev => { return {...prev, data: 'userUnavailable'} });
                } else {
                    data.forEach(doc => {
                        props.setTooltipData(prev => { return {...prev, data: doc}} );
                        
                    })
                }    
                
            }).catch(err => console.log('error'))
        }          
    }

    function callFrom() {
        if (props.callFrom == 'userProfile') {
            handleUserData();
            handleUserTweets()
        } else if (props.callFrom == 'home') {
            handleHomeTweets()
        }
    }

    return (
        <Fragment>
            { callFrom() }
            {handleTooltipData()}
        </Fragment>
    );
}

export default React.memo(FetchData);