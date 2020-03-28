import React from "react";
import { useAuth0 } from "../../utils/Auth0";
import logo from "../../assets/logo.svg";
import "./App.css";

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const onClick = async () => {
    await loginWithRedirect({});
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onClick} disabled={isAuthenticated}>
          {isAuthenticated ? "AUTHORIZED!" : "Click for Auth"}
        </button>
      </header>
    </div>
  );
}

export default App;
