import React, {Fragment, useState, useEffect, useContext, useRef} from 'react';
import './../../Style/Desktop/User_Profile/User_Profile.css';
import DisplayTweets from './../Tweet/DisplayTweets.js';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditProfile from './../User_Profile/EditProfile.js';
import {db, firebase} from './../Auth/firebaseAuth';
import {CurrentUser} from './../UserContext.js';

function UserProfile(props) {
    let editProfileButton = useRef();
    let otherUser = useRef();
    let {user, userInfo} = useContext(CurrentUser)
    let [userId, setUserId] = user;

    let [editor, setEditor] = useState(false);
    let [userProfileData, setUserProfileData] = useState(null);
    let [middleMainPanel, setMiddleMainPanel] = props.userData;
    // console.log(middleMainPanel.info)
// let tempo = middleMainPanel.info;

    useEffect(() => {
            db.collection('users').doc(middleMainPanel.info).onSnapshot( snapshot => {setUserProfileData(snapshot.data())});
    }, [middleMainPanel]);

    function handleFollow() {
        db.collection('users').doc(userId).update({ following : firebase.firestore.FieldValue.arrayUnion(middleMainPanel.info)});
        db.collection('users').doc(middleMainPanel.info).update({ followers : firebase.firestore.FieldValue.arrayUnion(userId)});
    }
    function handleUnfollow() {
        db.collection('users').doc(userId).update({ following : firebase.firestore.FieldValue.arrayRemove(middleMainPanel.info)});
        db.collection('users').doc(middleMainPanel.info).update({ followers : firebase.firestore.FieldValue.arrayRemove(userId)});
    }
    
    return (
        <Fragment>
            {userProfileData == null? null : <Fragment>
                                                <div className='userProfileBackground'>
                                                    <div className='userProfileNameContainer' >
                                                        <div className='userProfileFullName' >
                                                            { userProfileData.firstName + ' ' + userProfileData.lastName}
                                                        </div>
                                                        <div className='userProfileUserId' >
                                                            {`@${userProfileData.userId}`}
                                                        </div>
                                                    </div>
                                                    {userId == middleMainPanel.info? <div ref={editProfileButton} className='editProfileButton' onClick={()=>setEditor(true)} >
                                                                        Edit Profile {console.log('herrer')}
                                                                      </div> : <div ref={otherUser} className='otherUser'>
                                                                                    <div className='followOtherUser'>
                                                                                        {userProfileData.followers.includes(userId)? <span onClick={()=> handleUnfollow()} >Unfollow</span> : <span onClick={()=> handleFollow()}>Follow</span>}
                                                                                    </div>
                                                                                    <div className='messageOtherUser' onClick={() => props.updateSelectedChat(middleMainPanel.info)} >
                                                                                        Message
                                                                                    </div>
                                                                                </div>
                                                    }
                                                    
                                                </div>
                                                <div className='userProfilePictureAndInfoContainer'>
                                                    <img className='userProfilePicture' src={userProfileData.pictureURL} />
                                                    <div className='userProfileInfo' >
                                                        <div className='userProfileDescription' >
                                                            {userProfileData.description} 
                                                        </div>
                                                        <div className='userProfileLocation' >
                                                        <LocationOnIcon/> <span> {`${userProfileData.city}, ${userProfileData.country}`} </span>
                                                        </div>
                                                        <div className='userProfileFollowAndTweetInfo' >
                                                            {` ${ userProfileData.following.length} Following  ${userProfileData.followers.length} Followers  ${3} Tweets`}
                                                        </div>
                                                    </div>
                                                </div> 
                                        
                                            </Fragment>  }
            {userProfileData!== null? <DisplayTweets callFrom={'userProfile'} middleMainPanel={[middleMainPanel, setMiddleMainPanel]} /> : <h1> Loading... </h1>}
            
            {/* {console.log(otherUser.value)} */}
            { editor? <EditProfile setEditor={setEditor} /> : ' ' }
        </Fragment>
    );
}

export default React.memo(UserProfile);