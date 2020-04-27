# iTalk

## Introduction
iTalk is a social media React app that I have been doing for Alama boot camp final project. It’s fully a single page app and is deployed on Firebase. 
## Tools 
 __Frontend__
* React library
* Plain Html
* Plain Css
* A couple of Material-ui components 

 __Backend__
* Firebase Firestore as a database. 

## Features
*	A new user can sign up using an email and password. 
*	A registered user can login using email and password.
*	A logged in user can log out.
*	A user can tweet. 
*	Display tweets from whom it follows.
*	Tweets are paginated. 
*	Display notifications and receive real time notifications.
*	Display people a user has messaged with and receive real time messages.  
*	A user can send and receive messages on stand-alone message dialog. 
*	A user can search people with a real time feed. 
*	A user can view it’s or other’s profile. 
*	A user can follow or unfollow another user. 
*	A user can mention another user in a tweet using its userId. 
*	A user can hover over a mention in a tweet and instantaneously see who the mentioned person is without going to another page.   

_These are features added in the app. But they have not been finished yet._
*	Can’t like a tweet. 
*	Trending tweets do not work. 
*	Profile editor pop up but doesn’t work.

## Responsiveness
It’s responsive for desktop screens. It’s not displayed on phone and tablet screens.  

## Performance 
 The app has a good over-all performance. One issue, It’s sluggish when following and unfollowing a user. Thus, sometimes it might cause other features not to respond. One reason for the performance problem is, there are operation on the client-side that should have been performed on the server-side. Unfortunately, to use server-side code, Firebase Cloud Functions require a billing account to be enabled for external triggers.

## Security 
It has high security vulnerabilities. Database operations are performed on the client-side as Firebase Cloud Functions require billing account to be enabled for external triggers.  

## Final Note
I am lucky and privileged to have the chance to take part in this boot camp. I have got far more that I depicted at the beginning. I am inspired to see you curiously spending your time, money and knowledge for others to grow. That’s really inspiring as I practically know how service can bring a huge change. Even though I haven’t fulfilled my project expectation I had at first I began it because of final project and internet access, it’s an eye opening experience and you have got me to brace myself. Thank you!  
