import React, { useContext, useState } from "react";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Login = () => {
  const [newClient, setNewClient] = useState(false);
  const [client, setClient] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const [loggedInClient, setLoggedInClient] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  // Handle Login or Sign in error
  const handleErro = (error) => {
    const newClientInfo = { ...client };
    newClientInfo.error = error.message;
    setClient(newClientInfo);
  };

  // Form validation
  let isFormValid = true;
  const handleOnBlur = (e) => {
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newClientInformation = { ...client };
      newClientInformation.error = "";
      newClientInformation[e.target.name] = e.target.value;
      setClient(newClientInformation);
    }
    if (!isFormValid) {
      const newClientInformation = { ...client };
      newClientInformation.error = e.target.name;
      setClient(newClientInformation);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (newClient && client.email && client.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(client.email, client.password)
        .then((res) => {
          console.log(res);
          const clietnInformation = res.user;
          clietnInformation.error = "";
          clietnInformation.success = true;
          updateUserName(clietnInformation.name);
          setClient(clietnInformation);
          setLoggedInClient(clietnInformation);
          history.replace(from);
        })
        .catch((error) => {
          handleErro(error);
        });
    }

    if (!newClient && client.email && client.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(client.email, client.password)
        .then((res) => {
          console.log(res);
          const clietnInformation = { ...res.user };
          clietnInformation.error = "";
          clietnInformation.success = true;
          setClient(clietnInformation);
          setLoggedInClient(clietnInformation);
          history.replace(from);
        })
        .catch((error) => {
          handleErro(error);
        });
    }
    e.preventDefault();
  };

  // Handle Googole sign in
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const clietnInformation = { ...res.user };
        clietnInformation.error = "";
        clietnInformation.success = true;
        setClient(clietnInformation);
        setLoggedInClient(clietnInformation);
        history.replace(from);
      })
      .catch((error) => {
        handleErro(error);
      });
  };

  // Handle Facebook sign in
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((res) => {
        const clietnInformation = { ...res.user };
        clietnInformation.error = "";
        clietnInformation.success = true;
        setClient(clietnInformation);
        setLoggedInClient(clietnInformation);
        history.replace(from);
      })
      .catch((error) => {
        handleErro(error);
      });
  };

  // Update name
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

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="login-area">
          <h3>{newClient ? "Create An Account" : "Login"}</h3>
          <form action="" onSubmit={handleSubmit}>
            {newClient && (
              <input
                onBlur={handleOnBlur}
                type="text"
                name="name"
                id=""
                placeholder="Your Name"
              />
            )}

            <br />
            <input
              onBlur={handleOnBlur}
              type="email"
              name="email"
              id=""
              placeholder="Your Email"
              required
            />
            <br />
            <input
              onBlur={handleOnBlur}
              type="password"
              name="password"
              id=""
              placeholder="Password"
              required
            />
            <br />
            <input
              type="submit"
              value={newClient ? "Create Account" : "Login"}
            />
          </form>

          {/* Client confirmation message  */}
          <input
            onChange={() => setNewClient(!newClient)}
            type="checkbox"
            name="newClient"
            id=""
          />
          <label htmlFor="newClient">Create an account</label>
          <br />

          {/* Third party(google and facebook) sign in option  */}
          {!newClient && (
            <div className="others-login">
              <p onClick={handleGoogleSignIn}>
                <FontAwesomeIcon className="icon-inner" icon={faGoogle} />
                Continue with google
              </p>
              <p onClick={handleFacebookSignIn}>
                <FontAwesomeIcon className="icon-inner" icon={faFacebook} />
                Continue with Facebook
              </p>
            </div>
          )}
          <div className="show-message">
            {client.error && (
              <p>
                {client.error === "email"
                  ? "Your email is not valid"
                  : client.error === "password"
                  ? "Password lenght must be more than 5 and one number."
                  : client.error}
              </p>
            )}
            {client.success && (
              <p>User {newClient ? "created" : "Logged In"} successfully</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
