import React, { lazy, Suspense } from "react";
import { ToastProvider } from "react-toast-notifications";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "./utils/Auth0";
import LoginPage from "./pages/LoginPage";
import ProfileDetailsProvider from "./context/ProfileDetailsContext/ProfileDetailsProvider";
import ApplicationContextProvider from "./context/ApplicationContext/ApplicationContextProvider";
import Navbar from "./components/Navbar";

const HomePage = lazy(() => import("./pages/HomePage"));
const PlaygroundPage = lazy(() => import("./pages/PlaygroundPage"));

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
    <ApplicationContextProvider>
      <ProfileDetailsProvider>
        <ToastProvider autoDismiss autoDismissTimeout={3000}>
          <Suspense fallback={<div>Loading your route...!</div>}>
            <Navbar />
            <div className="page-container">
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/home"
                  element={<ProtectedRoute component={HomePage} />}
                />
                <Route
                  path="/playground"
                  element={<ProtectedRoute component={PlaygroundPage} />}
                />
              </Routes>
            </div>
          </Suspense>
        </ToastProvider>
      </ProfileDetailsProvider>
    </ApplicationContextProvider>
  );
};

export default RoutesComponent;
