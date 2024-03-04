// src/Router.tsx
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Community from "./screens/Community";
import { useAuth } from "./contexts/AuthContext";

const RouterComponent: React.FC = () => {
  const { isLogin, logout, user, autoLogin } = useAuth();

  return (
    <BrowserRouter>
      {!isLogin && (
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="register/*" element={<Register />} />
        </Routes>
      )}
      {isLogin && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />} />
          <Route path="register/*" element={<Register />} />
          <Route path="community/*" element={<Community />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default RouterComponent;
