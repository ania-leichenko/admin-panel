import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD72210890P4K-MlPtlBp38_zzAnI0DG9A",
  authDomain: "admin-panel-6c91f.firebaseapp.com",
  projectId: "admin-panel-6c91f",
  storageBucket: "admin-panel-6c91f.appspot.com",
  messagingSenderId: "881958139559",
  appId: "1:881958139559:web:1184e579dd1e72a9730d82",
  measurementId: "G-3YCXCY7QDS",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default db;
