// firebaseUIConfig.js
import { app } from './firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Navigate } from 'react-router-dom';

// var firebaseui = require('firebaseui');
// import * as firebaseui from 'firebaseui';
var firebaseui = require('firebaseui')

let countryCode;
countryCode = await getDefaultCountry()

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        console.log(JSON.stringify(authResult))
        console.log(redirectUrl)
        alert(JSON.stringify(authResult))
      
        return true;
      },
      signInFailure: (error) => {
        if (error.code === 'firebaseui/anonymous-upgrade-merge-conflict') {
            // Merge conflict error handling
            const cred = error.credential;
            // auth.signInWithCredential(cred).then(user => {
            //     // Successfully signed in
            // }).catch(err => {
            //     // Error handling
            // });
        }
        return Promise.resolve();
        },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        // document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'welcome',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      },
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: countryCode, // Set the default country code to 'IN' for India
    },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    
    ],
    
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

// const ui = new firebaseui.auth.AuthUI(auth);

let ui;

// Initialize the FirebaseUI Widget using Firebase.
// if (firebase.apps.length === 0) {
    ui = new firebaseui.auth.AuthUI(firebase.auth());
// }

const uiConfigAlt = {
    signInSuccessUrl: '/', // URL to redirect to after a successful sign-in
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    tosUrl: '<your-tos-url>', // Terms of Service URL
    privacyPolicyUrl: '<your-privacy-policy-url>' // Privacy Policy URL
};

function getDefaultCountry(){
  return new Promise((resolve,reject)=>{
    fetch('https://api.ipregistry.co/?key=00zbizdc7kz00g7d')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
        resolve(payload.location.country.code)
    }).catch(error=>reject(error));
  })
  
}




// const uiAlt = new firebaseui.auth.AuthUI(auth);

export { ui, uiConfig};
