import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import ViewHeader from '../shared/header/ViewHeader';
import ViewRoutes from '../routes/ViewRoutes';
import ConnectViewEnlarged from '../shared/enlarged/ConnectViewEnlarged';
import styles from './stylesApp.module.scss';
import ConnectViewOverlay from './components/overlay/ConnectViewOverlay';
import './App.css';

export default function App() {

  let basename = process.env.PUBLIC_URL || '/';


  const updateDimensions = () => {

    let amountImgOffset;
    let currScaleFactor;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowAspectRatio = windowWidth / windowHeight;
    const appAspectRatio = 1920 / 1080;

    containerRef.current.style.marginLeft = '0px'; //reset for another positon
    containerRef.current.style.marginTop = '0px'; //reset for another positon

    if (windowAspectRatio < appAspectRatio) {
      currScaleFactor = windowWidth / 1920;
      containerRef.current.style.transform = 'scale(' + currScaleFactor + ')';
      amountImgOffset = (containerRef.current.getBoundingClientRect().height - windowHeight) / 2; //to vertically align
      containerRef.current.style.marginTop = -amountImgOffset + 'px';

    } else {
      currScaleFactor = windowHeight / 1080;
      containerRef.current.style.transform = 'scale(' + currScaleFactor + ')';
      amountImgOffset = (containerRef.current.getBoundingClientRect().width - windowWidth) / 2; //to horiztonally align
      containerRef.current.style.marginLeft = -amountImgOffset + 'px';

    }

  }

  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      updateDimensions();
    }
    const handleResize = () => {
      updateDimensions();
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [containerRef]);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const password = 
  // "9ac43e7a5e9ff468b77286945b2ec9ec3d6e6cf91ccf6bc3e94c8225fa1c53cf";
  "6578ac32ff5f23cb8606a549ddbdc14a5646b93d263be1edc84c9d3a363a14e3"; //sha-256 hash - https://passwordsgenerator.net/sha256-hash-generator/ - enter text as per "password" (include quotes "###")
  const refStatus = useRef(null);
  const onPasswordChange = (event) => {
    const newPassword = event.target.value;
    setInputPassword(newPassword);
  }
  const onSubmitPassword = (event) => {
    event.preventDefault();
    const hashDigest = sha256(JSON.stringify(inputPassword)).toString();
    if (hashDigest === password) {
      const date = new Date();
      date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
      const expires = "; expires=" + date.toUTCString();
      document.cookie = "isLoggedIn=true" + expires + "; path=/";

      setIsLoggedIn(true);
      refStatus.current.style.display = 'none';
    } else {
      refStatus.current.style.display = 'block';
    }
  }

  const showLoggedIn = () => {
    return (
      <>
        <ViewHeader />
        <ViewRoutes />
        <ConnectViewOverlay />
        <ConnectViewEnlarged />
      </>
    );
  }

  const showLogin = () => {
    return (
      <div className={styles.loginContainer}>
        <form onSubmit={onSubmitPassword}>
          <label htmlFor="pwd">Password</label>
          <input type="password" value={inputPassword} onChange={onPasswordChange}></input>
          <p ref={refStatus}>Invalid password</p>
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    )
  }

  useEffect(() => {
    const cookies = document.cookie.split(';');
    let isLoggedIn = false;
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const cookieName = cookie.split('=')[0];
      if (cookieName === 'isLoggedIn') {
        isLoggedIn = true;
        break;
      }
    }
    setIsLoggedIn(isLoggedIn);
  }, []);


  return (
    <Router basename={basename}>
      <div className={styles.container} ref={containerRef}>
        {isLoggedIn ? showLoggedIn() : showLogin()}
      </div>
    </Router>
  );
}