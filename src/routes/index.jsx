import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import useAuth from "../hooks/useAuth";

export const Private = ({Item}) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Login />;
};

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Private Item={Home} />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};


export default AppRouter;