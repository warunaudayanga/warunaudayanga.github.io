// noinspection SpellCheckingInspection,JSUnusedGlobalSymbols

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import configuration from "./configuration.ts";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: configuration().firebase.apiKey,
    authDomain: configuration().firebase.authDomain,
    projectId: configuration().firebase.projectId,
    storageBucket: configuration().firebase.storageBucket,
    messagingSenderId: configuration().firebase.messagingSenderId,
    appId: configuration().firebase.appId,
    measurementId: configuration().firebase.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

enum Collection {
    FILES = "files",
    PROJECTS = "projects",
    CONFIGURATION = "configuration",
}

export { auth, firestore, storage, Collection };
