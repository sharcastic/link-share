import React, { lazy, Suspense } from "react";
import { ToastProvider } from "react-toast-notifications";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "./utils/Auth0";
import LoginPage from "./pages/LoginPage";
import ProfileDetailsProvider from "./context/ProfileDetailsContext/ProfileDetailsProvider";
import ApplicationContextProvider from "./context/ApplicationContext/ApplicationContextProvider";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";

const HomePage = lazy(() => import("./pages/HomePage"));
const PlaygroundPage = lazy(() => import("./pages/PlaygroundPage"));
const ConnectionPage = lazy(() => import("./pages/ConnectionsPage"));

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  if (isAuthenticated === false) {
    navigate("/");
  }
  return <Component />;
};

const RoutesComponent = () => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated === undefined) {
    return <div>Loading Application</div>;
  }
  if (isAuthenticated === false) {
    return (
      <Suspense fallback={<div>Loading your route...!</div>}>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </Suspense>
    );
  }
  return (
    <ToastProvider autoDismiss autoDismissTimeout={3000}>
      <ApplicationContextProvider>
        <ProfileDetailsProvider>
          <Suspense fallback={<div>Loading your route...!</div>}>
            <div className="page-container">
              <Header />
              <div className="route-container">
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route
                    path="/home"
                    element={<ProtectedRoute component={PlaygroundPage} />}
                  />
                  <Route
                    path="/playground"
                    element={<ProtectedRoute component={HomePage} />}
                  />
                  <Route
                    path="/connections"
                    element={<ProtectedRoute component={ConnectionPage} />}
                  />
                </Routes>
              </div>
              <CreatePost />
            </div>
          </Suspense>
        </ProfileDetailsProvider>
      </ApplicationContextProvider>
    </ToastProvider>
  );
};

export default RoutesComponent;
