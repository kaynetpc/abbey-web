// src/Router.tsx
import React from "react";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Community from "./screens/Community";

const RouterComponent: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/*" element={<Login />} />
        <Route path="register/*" element={<Register />} />
        <Route path="community/*" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
