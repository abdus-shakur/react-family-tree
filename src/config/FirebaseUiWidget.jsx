// components/FirebaseAuthUI.js
import React, { useEffect } from "react";
// import { auth } from "./firebaseConfig";
import { ui, uiConfig } from "./firebaseUi";
import firebase from 'firebase/compat/app';
import { RecaptchaVerifier ,getAuth, signInWithPhoneNumber} from "firebase/auth";
import { useNavigate } from "react-router-dom";
const FirebaseAuthUI = () => {
  // useEffect(() => {
  //   console.log('Auth instance:', auth); // Add this line to debug
  //   // setTimeout(() => {
  //       if(ui && auth && document.getElementById('recaptcha-container')){
  //           ui.start("#firebaseui-auth-container", uiConfig);
  //           addRecaptchaVerifier()
  //       }
  //   // }, 2000);
  // }, []);

  const navigate = useNavigate()

  useEffect(() => {
    if (
      !window.recaptchaVerifier &&
      document.getElementById("recaptcha-container")
    ) {
      const recaptchaContainer = document.getElementById(
        "recaptcha-container"
      );
      window.recaptchaVerifier = new RecaptchaVerifier(
        firebase.auth(),
        recaptchaContainer,
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
            console.log("response", response);
            },
        }
      );
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
    if(ui && firebase.auth() && document.getElementById('recaptcha-container')){
      ui.start("#firebaseui-auth-container", uiConfig);
      // addRecaptchaVerifier()
    }
  }, [firebase.auth()]);


  const onSignInSubmit = () => {
    signInWithPhoneNumber(firebase.auth(), '+917904001237', window.recaptchaVerifier)
    .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    console.log("OTP sent", confirmationResult);
    navigate('/welcome')
    // ...
    })
    .catch((error) => {
    // Error; SMS not sent
    // ...
    });
      };

  function addRecaptchaVerifier(){
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log(response);
          },
      }, firebase.auth());
  }
  }



  return (
    <>
      <div id="firebaseui-auth-container"></div>
      <div id="recaptcha-container"></div>
      {/* <div id="firebaseui-auth-container-alternates"></div> */}
    </>
  );
};

export default FirebaseAuthUI;
