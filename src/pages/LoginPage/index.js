import React from "react";
import { useAuth0 } from "../../utils/Auth0";
import logo from "../../assets/logo.svg";
import "./App.css";

function App() {
  const { isAuthenticated, loginWithRedirect, clientLoaded } = useAuth0();
  const onClick = async () => {
    await loginWithRedirect();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button className="login-btn" onClick={onClick} disabled={!clientLoaded || isAuthenticated}>
          {isAuthenticated ? "AUTHORIZED!" : "Login to Start"}
        </button>
      </header>
    </div>
  );
}

export default App;
