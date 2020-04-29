import React from "react";
import Lottie from 'react-lottie';
import { useAuth0 } from "../../utils/Auth0";

import logo from "../../assets/icons/logo.svg";
import animationData from '../../assets/anim/launch.json'

import "../../styles/Launch.scss";

function App() {
  const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const { isAuthenticated, loginWithRedirect, clientLoaded } = useAuth0();
  const onClick = async () => {
    await loginWithRedirect();
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Lottie options={defaultOptions}
              height={300}
              width={300}/>
        <button className="login-btn" onClick={onClick} disabled={!clientLoaded || isAuthenticated}>
          {isAuthenticated ? "AUTHORIZED!" : "Login to Start"}
        </button>
      </header>
    </div>
  );
}

export default App;
