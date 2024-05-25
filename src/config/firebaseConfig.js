// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { RecaptchaVerifier, getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSgtgyVnJmXu9EuCyUyc-AzAtBNGs-5QI",
    authDomain: "my-first-project-12-a64f8.firebaseapp.com",
    projectId: "my-first-project-12-a64f8",
    storageBucket: "my-first-project-12-a64f8.appspot.com",
    messagingSenderId: "876283479625",
    appId: "1:876283479625:web:6b9cf5801450a2aefde198",
    measurementId: "G-HDMZBCDNWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
auth.useDeviceLanguage();

// window.recaptchaVerifier.render().then((widgetId) => {
// window.recaptchaWidgetId = widgetId;
// });

export { app, analytics ,auth };