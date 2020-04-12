import React, { lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "./utils/Auth0";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ProfileDetailsProvider from "./context/ProfileDetailsContext/ProfileDetailsProvider";

const HomePage = lazy(() => import("./pages/HomePage"));

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
  return (
    <>
      {isAuthenticated && <Navbar />}
      <ProfileDetailsProvider>
        <Suspense fallback={<div>Loading your route...!</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={<ProtectedRoute component={HomePage} />}
            />
          </Routes>
        </Suspense>
      </ProfileDetailsProvider>
    </>
  );
};

export default RoutesComponent;
