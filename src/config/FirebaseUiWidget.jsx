// components/FirebaseAuthUI.js
import React, { useEffect } from "react";
import { auth } from "./firebaseConfig";
import { ui, uiConfig } from "./firebaseUi";
import { RecaptchaVerifier ,getAuth} from "firebase/auth";

const FirebaseAuthUI = () => {
  useEffect(() => {
    console.log('Auth instance:', auth); // Add this line to debug
    // setTimeout(() => {
        if(ui && auth && document.getElementById('recaptcha-container')){
            ui.start("#firebaseui-auth-container", uiConfig);
            addRecaptchaVerifier()
        }
    // }, 2000);
  }, []);

  function addRecaptchaVerifier(){
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log(response);
          },
      }, auth);
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
