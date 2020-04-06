import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "./utils/Auth0";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/Home";
import Navbar from "./components/Navbar";

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
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute component={HomePage} />} />
      </Routes>
    </>
  );
};

export default RoutesComponent;
