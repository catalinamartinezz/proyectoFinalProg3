import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBdue7uX502rnxpM3VTNIyHfiOWDYJ3Fec",
    authDomain: "proyecto-final-cae6e.firebaseapp.com",
    projectId: "proyecto-final-cae6e",
    storageBucket: "proyecto-final-cae6e.appspot.com",
    messagingSenderId: "502552906752",
    appId: "1:502552906752:web:57624585cd75df3ce0dce5"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();