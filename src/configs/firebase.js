import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"
import "../../src"

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-bCNEYWDwySjwPWrhipCsw7mvQLI0Wj8",
    authDomain: "demofirebase1998.firebaseapp.com",
    projectId: "demofirebase1998",
    storageBucket: "demofirebase1998.appspot.com",
    messagingSenderId: "860391439919",
    appId: "1:860391439919:web:ead8c4edf132c3fca650da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);