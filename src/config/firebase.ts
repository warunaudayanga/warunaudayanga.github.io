// noinspection SpellCheckingInspection

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZ0gRydGN4kq4CX7FkpfauEPJXPOadVCI",
    authDomain: "warunaudayanga-8b731.firebaseapp.com",
    projectId: "warunaudayanga-8b731",
    storageBucket: "warunaudayanga-8b731.appspot.com",
    messagingSenderId: "421845619489",
    appId: "1:421845619489:web:fe543bb33749390f19a460",
    measurementId: "G-KMXZM33L1G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

enum Path {
    FILES = "files",
    PROJECTS = "projects",
}

export { auth, analytics, firestore, storage, Path };
