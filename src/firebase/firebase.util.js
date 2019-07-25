import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBajYkiEE9i2oAGdTXVPYshHNSWwPPf3EU",
  authDomain: "crown-db-acf1e.firebaseapp.com",
  databaseURL: "https://crown-db-acf1e.firebaseio.com",
  projectId: "crown-db-acf1e",
  storageBucket: "",
  messagingSenderId: "210964422957",
  appId: "1:210964422957:web:e5c1a25cd8aef0e4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
