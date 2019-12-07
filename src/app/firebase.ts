import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCNryEkxz54ZMYbGXfaAyy1PWrVW0xX_xI",
    authDomain: "playpen-e2b14.firebaseapp.com",
    databaseURL: "https://playpen-e2b14.firebaseio.com",
    projectId: "playpen-e2b14",
    storageBucket: "playpen-e2b14.appspot.com",
    messagingSenderId: "332842155714",
    appId: "1:332842155714:web:620175de0cfb3bfb22855b"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();