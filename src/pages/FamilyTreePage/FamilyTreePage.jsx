import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
// import animationData from "../../../assets/lottie/family_2.json";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FirebaseUI from "../../config/firebaseUi";
import FirebaseAuthUI from "../../config/FirebaseUiWidget";

import "firebaseui/dist/firebaseui.css";
import "./FamilyTreePage.scss";
import { Close, Label } from "@mui/icons-material";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export default function FamilyTreePage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate = useNavigate();
  function launchPage() {
    navigate("/welcome");
  }
  const Dummy = () => {
    return (
      <div style={{ position: "relative" }}>
        {/* <Lottie
      options={defaultOptions}
      style={{
        position: "relative",
        zindex: "0",
        height: "90vh",
        width: "90vw",
      }}
    ></Lottie> */}
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "30%",
            minWidth: "25rem",
            right: 0,
            top: 0,
            border: "1px solid grey",
          }}
        >
          <div class="login-form">
            <span>
              <h1>Login</h1>
            </span>
            <div>
              <TextField label="Username"></TextField>
              <TextField label="Password"></TextField>
            </div>
            <Button onClick={() => launchPage()}>Login</Button>
          </div>
        </div>
      </div>
    );
  };

  const PhoneAuthentication = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState("");
    const [message, setMessage] = useState("");

    const auth = getAuth();

    useEffect(() => {
      if (
        !window.recaptchaVerifier &&
        document.getElementById("recaptcha-container")
      ) {
        const recaptchaContainer = document.getElementById(
          "recaptcha-container"
        );
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          recaptchaContainer,
          {
            size: "invisible",
          }
        );
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
        });
      }
    }, [auth]);

    const onSignInSubmit = async (e) => {
      if (e) e.preventDefault();
      setMessage("");
      if (!window.recaptchaVerifier) {
        setMessage("Recaptcha is not initialized");
        return;
      }
      const appVerifier = window.recaptchaVerifier;
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        window.confirmationResult = confirmationResult;
        setVerificationId(confirmationResult.verificationId);
        setMessage("OTP has been sent to your phone");
      } catch (error) {
        setMessage("Error during sign-in: " + error.message);
      }
    };

    const onVerifyOtpSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      if (!window.confirmationResult) {
        setMessage("No verification code sent");
        return;
      }
      try {
        const result = await window.confirmationResult.confirm(otp);
        const user = result.user;
        setMessage("Phone number verified successfully");
        alert(JSON.stringify(result));
      } catch (error) {
        setMessage("Error during OTP verification: " + error.message);
      }
    };
    return (
      <div>
        <h2>Phone Authentication</h2>
        <form onSubmit={onSignInSubmit}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
          <button type="submit">Send OTP</button>
          <div id="recaptcha-container"></div>
        </form>
        {verificationId && (
          <form onSubmit={onVerifyOtpSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button type="submit">Verify OTP</button>
          </form>
        )}
        {message && <p>{message}</p>}
      </div>
    );
  };

  

  
  const EmailOrPhoneLogin = () => {


    const [nameError,setNameError] = useState();
    const [showNameError,setShowNameError] = useState(false);
    const [showOtpVerify,setShowOtpverify] = useState(false);

    const [showSnack,setShowSnack] = useState(false)
    const [snackMessage,setSnackMessage] = useState()

    const [uname,setUname] = useState();
    const pwd = useRef(null);

    function showPasswordOrSendOtp(){
      if (String(uname).includes("@")){
        setShowPassword(true)
        setShowNameError(false)
        setNameError('')
      }else if (uname && uname.length>6){
        let number = uname;
        if(String(uname).trim().charAt(0)!=='+'){
          number = '+'+uname;
        }
        sendOtpPhone(number)
        setShowOtpverify(true)
        setShowNameError(false)
        setNameError('')
      }else{
        setShowNameError(true)
        setNameError('Invalid Email / Phone Number : Enter valid credentials')
        setShowSnack(true)
        setSnackMessage("Check entered user credentials")
      }
    }

    function loginEmail() {
      console.log(uname);
      console.log(pwd.current.value);
      if (String(uname).includes("@"))
        signInWithEmailAndPassword(auth, uname, pwd.current.value)
          .then((response) => {
            console.log(response);
            navigate("/welcome");
          })
          .catch((error) => {setShowSnack(true);setShowNameError(true);setNameError('Invalid Username / Password'); setSnackMessage("Error Logging in user with email and password. check credentials "+error)});
    }




    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState("");
    const [message, setMessage] = useState("");

    const auth = getAuth();

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
          auth,
          recaptchaContainer,
          {
            size: "invisible",
          }
        );
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
        });
      }
    }, [auth]);


    async function sendOtpPhone(number){
      setMessage("");
      if (!window.recaptchaVerifier) {
        setMessage("Recaptcha is not initialized");
        return;
      }
      const appVerifier = window.recaptchaVerifier;
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          number,
          appVerifier
        );
        window.confirmationResult = confirmationResult;
        setVerificationId(confirmationResult.verificationId);
        // setMessage("OTP has been sent to your phone");
        setShowSnack(true)
        setSnackMessage("OTP has been sent to your phone")
      } catch (error) {
        setMessage("Error during sign-in: " + error.message);
      }
    }

    async function verifyOTP(){
      setMessage("");
      if (!window.confirmationResult) {
        setMessage("No verification code sent");  
        return;
      }
      try {
        const result = await window.confirmationResult.confirm(otp);
        const user = result.user;
        setMessage("Phone number verified successfully");
        setShowSnack(true)
        setSnackMessage("Phone number verified successfully")
        // alert(JSON.stringify(result));
        navigate('/welcome')
      } catch (error) {
        setMessage("Error during OTP verification: " + error.message);
      }
    }

    const [showPassword,setShowPassword] = useState(false);

    function handleEmailChange(e){
      console.log(e.target.value)
      setShowNameError(false);
      setUname(e.target.value)
  }

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={()=>setShowSnack(false)}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>setShowSnack(false)}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
    
    return (
      <>
      
        <Card className="primary-login">
          <Typography variant="h6" textAlign={"center"}>
            Login with Email or Phone
          </Typography>
          {/* <Box className="primary-login-fields"> */}
          {!showOtpVerify&&<TextField
            onChange={handleEmailChange}
            value={uname}
            type="email"
            // value={uname?.current?.value}
            label="Email or Phone"
            placeholder="user@mail.com / +918765431245"
            error={showNameError}
            helperText={nameError}
          ></TextField>}
          {showPassword&&
          <TextField
            inputRef={pwd}
            label="Password"
            type="password"
            error={showNameError}
          ></TextField>}
          {showOtpVerify&&
          <TextField
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            label="OTP"
            type="OTP"
          ></TextField>}
          {(!showPassword && !showOtpVerify)?
          <Button variant="contained" onClick={() => showPasswordOrSendOtp()}>
            Proceed
          </Button>:<>{!showOtpVerify?<Button variant="contained" color="success" onClick={() => loginEmail()}>
            Login
          </Button>:<></>}</>}
          {showOtpVerify&&<Button variant="contained" color="success" onClick={() => verifyOTP()}>
            Verify OTP
          </Button>}
          {(showPassword||showOtpVerify)&&
          <Button onClick={()=>{setShowPassword(false);setShowOtpverify(false)}}>Back</Button>}
          {/* </Box> */}
          {message && <p>{message}</p>}
        </Card>
        <Snackbar
          open={showSnack}
          autoHideDuration={1500}
          onClose={()=>setShowSnack(false)}
          message={snackMessage}
          action={action}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          color={'success'}
        />
      </>
    );
  };
  return (
    <>
      <div className="backdrop">
        <div className="login">
          <EmailOrPhoneLogin/>
          {/* <PhoneAuthentication /> */}
          <Divider
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "white",
              fontWeight: 800,
            }}
          />
          <FirebaseAuthUI />
          {/* <div id="recaptcha-container"></div> */}
        </div>
      </div>
    </>
  );
}
