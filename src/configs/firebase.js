
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBe6ePQZCz-AQdvbzsXdmL5ee95kU7z1s",
  authDomain: "photo-archive-a0523i1.firebaseapp.com",
  projectId: "photo-archive-a0523i1",
  storageBucket: "photo-archive-a0523i1.appspot.com",
  messagingSenderId: "889868219610",
  appId: "1:889868219610:web:739cc292b9da31bbbee1e3",
  measurementId: "G-WGZVD4314Q"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);