import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCn1ouhrExly9xYyF5ug7kwHhYkErmjIj0",
    authDomain: "chatapp-37035.firebaseapp.com",
    databaseURL: "https://chatapp-37035.firebaseio.com",
    projectId: "chatapp-37035",
    storageBucket: "chatapp-37035.appspot.com",
    messagingSenderId: "644733061161",
    appId: "1:644733061161:web:9af1c5f47073df693e3438",
    measurementId: "G-W9NWHZB38F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();
  const auth =firebase.auth();
  export {db, auth, firebase} ; 