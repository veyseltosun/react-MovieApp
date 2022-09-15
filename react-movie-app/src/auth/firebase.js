import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAC4UEg0Smg6eUphSKLU7a5-vpmUWDfjX4",
    authDomain: "movie-app-53bf6.firebaseapp.com",
    projectId: "movie-app-53bf6",
    storageBucket: "movie-app-53bf6.appspot.com",
    messagingSenderId: "215843265951",
    appId: "1:215843265951:web:7eceba8b55ec68a96771aa"
  };

  const firebase = initializeApp(firebaseConfig);
  
  const auth = getAuth(firebase);

export const createUser = async (email, password, displayName) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ..
      });

    const currentUser = firebase.auth().currentUser;
    await currentUser.updateProfile({ displayName });
  } catch (error) {
    alert(
      "There exists an account with this email. Please login with your password or continue with Google!"
    );
  }
};

export const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      // var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      alert("The password is invalid or the user does not have a password!");
    });
};

export const signOut = () => {
  firebase.auth().signOut();
};

export const userObserver = async (setCurrentUser) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      // User is signed out
      setCurrentUser(null);
    }
  });
};

export const signUpProvider = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  firebase.auth().signInWithPopup(provider);
};

export const forgotPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email);

  alert("Please check your mail box!");
};

export default firebase;