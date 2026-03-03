import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import ViewHeader from "../shared/header/ViewHeader";
import ViewRoutes from "../routes/ViewRoutes";
import ConnectViewEnlarged from "../shared/enlarged/ConnectViewEnlarged";
import styles from "./stylesApp.module.scss";
import ConnectViewOverlay from "./components/overlay/ConnectViewOverlay";
import "./App.css";

export default function App() {
  let basename = process.env.PUBLIC_URL || "/";

//   const updateDimensions = () => {
//     if (!containerRef.current) return;

//     const el = containerRef.current;
//     const windowWidth = window.innerWidth;
//     const windowHeight = window.innerHeight;

//     /* =========================
//        MOBILE + TABLET FIX
//     ========================== */
//     if (windowWidth <= 1024) {
//       // 🔥 FULL RESET (important)
//       el.style.transform = "";
//       el.style.marginLeft = "";
//       el.style.marginTop = "";
//       el.style.width = "";
//       el.style.height = "";
//       el.style.transformOrigin = "";

//       return;
//     }

//     /* =========================
//        DESKTOP BEHAVIOUR
//     ========================== */

//     const appAspectRatio = 1920 / 1080;
//     const windowAspectRatio = windowWidth / windowHeight;

//     let amountImgOffset;
//     let currScaleFactor;

//     el.style.transformOrigin = "top left";
//     el.style.marginLeft = "0px";
//     el.style.marginTop = "0px";

//     if (windowAspectRatio < appAspectRatio) {
//       currScaleFactor = windowWidth / 1920;
//       el.style.transform = `scale(${currScaleFactor})`;

//       amountImgOffset = (el.getBoundingClientRect().height - windowHeight) / 2;

//       el.style.marginTop = `${-amountImgOffset}px`;
//     } else {
//       currScaleFactor = windowHeight / 1080;
//       el.style.transform = `scale(${currScaleFactor})`;

//       amountImgOffset = (el.getBoundingClientRect().width - windowWidth) / 2;

//       el.style.marginLeft = `${-amountImgOffset}px`;
//     }
//   };

//   const containerRef = useRef(null);
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 1024) {
//         updateDimensions();
//       } else if (containerRef.current) {
//         // FULL CLEAN RESET FOR MOBILE
//         const el = containerRef.current;

//         el.style.transform = "none";
//         el.style.marginLeft = "0";
//         el.style.marginTop = "0";
//         el.style.transformOrigin = "";
//       }
//     };

//     handleResize(); // run once

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const password =
    "9ac43e7a5e9ff468b77286945b2ec9ec3d6e6cf91ccf6bc3e94c8225fa1c53cf"; //sha-256 hash - https://passwordsgenerator.net/sha256-hash-generator/ - enter text as per "password" (include quotes "###")
  const refStatus = useRef(null);
  const onPasswordChange = (event) => {
    const newPassword = event.target.value;
    setInputPassword(newPassword);
  };
  const onSubmitPassword = (event) => {
    event.preventDefault();
    const hashDigest = sha256(JSON.stringify(inputPassword)).toString();
    if (hashDigest === password) {
      const date = new Date();
      date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
      const expires = "; expires=" + date.toUTCString();
      document.cookie = "isLoggedIn=true" + expires + "; path=/";

      setIsLoggedIn(true);
      refStatus.current.style.display = "none";
    } else {
      refStatus.current.style.display = "block";
    }
  };

  const showLoggedIn = () => {
    return (
      <>
        <ViewHeader />
        <ViewRoutes />
        <ConnectViewOverlay />
        <ConnectViewEnlarged />
      </>
    );
  };

  const showLogin = () => {
    return (
      <div className={styles.loginContainer}>
        <form onSubmit={onSubmitPassword}>
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            value={inputPassword}
            onChange={onPasswordChange}
          ></input>
          <p ref={refStatus}>Invalid password</p>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
  };

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let isLoggedIn = false;
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const cookieName = cookie.split("=")[0];
      if (cookieName === "isLoggedIn") {
        isLoggedIn = true;
        break;
      }
    }
    setIsLoggedIn(isLoggedIn);
  }, []);

  return (
    <Router basename={basename}>
      {/* <div className={styles.container} ref={containerRef}>
        {isLoggedIn ? showLoggedIn() : showLogin()}
      </div> */}
	    <div >
        {isLoggedIn ? showLoggedIn() : showLogin()}
      </div>
    </Router>
  );
}
