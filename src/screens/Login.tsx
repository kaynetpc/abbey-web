// src/components/Login.tsx
import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h2>Get started</h2>
        <LoginForm />
        <p>Don't have an account <span onClick={() => navigate("/register")} style={{cursor: "pointer", color: "blue"}}>register</span></p>
    </div>
  );
};

export default Login;
