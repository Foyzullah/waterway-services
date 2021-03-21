import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeFirebase = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const clietnInformation = res.user;
      clietnInformation.error = "";
      clietnInformation.success = true;
      updateUserName(name);
      return clietnInformation;
    })
    .catch((error) => {
      const clietnInformation = {};
      clietnInformation.error = error.message;
      clietnInformation.success = false;
      return clietnInformation;
    });
};

// Sign in with email and password
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const clietnInformation = res.user;
      clietnInformation.error = "";
      clietnInformation.success = true;
      return clietnInformation;
    })
    .catch(function (error) {
      const clietnInformation = {};
      clietnInformation.error = error.message;
      clietnInformation.success = false;
      return clietnInformation;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      console.log("user name updated successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Sign Up with Facebook
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const handleFacebookSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((res) => {
      const newClientInformation = res.user;
      newClientInformation.success = true;
      return newClientInformation;
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
