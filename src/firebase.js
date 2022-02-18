import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1YTxcE044Op013NTv3-F81oU0BX5l5R0",
    authDomain: "uber-eats-339015.firebaseapp.com",
    projectId: "uber-eats-339015",
    storageBucket: "uber-eats-339015.appspot.com",
    messagingSenderId: "584006115976",
    appId: "1:584006115976:web:5c4c9f9d10ef3c75ebb53d",
    measurementId: "G-Z4JL8Z6LD2"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;

const auth = firebase.auth()

export { auth };

