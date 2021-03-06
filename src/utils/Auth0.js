import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { useNavigate } from "react-router-dom";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const navigate = useNavigate();
  const logoutUser = () => {
    setIsAuthenticated(false);
    setUser();
    setAccessToken();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tokenObject");
    sessionStorage.removeItem("accessToken");
    auth0Client.logout({
      returnTo: window.location.origin
    });
  };

  useEffect(() => {
    const initAuth0 = async () => {
      const promise = createAuth0Client(initOptions);
      promise.then(auth0Obj => setAuth0(auth0Obj));
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await promise.then(auth0Obj =>
          auth0Obj.handleRedirectCallback()
        );
        onRedirectCallback(appState);
      }
      const userInSession = JSON.parse(sessionStorage.getItem("user"));
      const tokenInSession = JSON.parse(sessionStorage.getItem("tokenObject"));
      if (userInSession && tokenInSession) {
        const tokenExpiry = tokenInSession.exp;
        if (tokenExpiry && tokenExpiry > Date.now() / 1000) {
          setIsAuthenticated(true);
          setUser(userInSession);
          setAccessToken(tokenInSession);
        } else {
          logoutUser();
        }
      } else {
        promise.then(async auth0Obj => {
          const isAuthenticated = await auth0Obj.isAuthenticated();
          setIsAuthenticated(isAuthenticated);
          if (isAuthenticated) {
            const user = await auth0Obj.getUser();
            const token = await auth0Obj.getIdTokenClaims();
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("tokenObject", JSON.stringify(token));
            sessionStorage.setItem("accessToken", JSON.stringify(token.__raw));
            setUser(user);
            setAccessToken(token);
            navigate("/Home");
          }

          setLoading(false);
        });
      }
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    if (!sessionStorage.getItem("user") || !sessionStorage.getItem("token")) {
      setPopupOpen(true);
      try {
        await auth0Client.loginWithPopup(params);
      } catch (error) {
        console.error(error);
      } finally {
        setPopupOpen(false);
      }
      if (auth0Client) {
        const userRequestPromise = auth0Client.getUser();
        const tokenRequestPromise = auth0Client.getIdTokenClaims();
        Promise.all([userRequestPromise, tokenRequestPromise])
          .then(responseArr => {
            setUser(responseArr[0]);
            setAccessToken(responseArr[1]);
            sessionStorage.setItem("user", JSON.stringify(responseArr[0]));
            sessionStorage.setItem(
              "tokenObject",
              JSON.stringify(responseArr[1])
            );
          })
          .catch(err => {
            console.error(err);
          });
      }
    } else {
      setUser(JSON.parse(sessionStorage.getItem("user")));
      setAccessToken(JSON.parse(sessionStorage.getItem("token")));
    }
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        clientLoaded: auth0Client ? true : false,
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        accessToken,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
        logoutUser
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
