// src/components/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h2>Get started</h2>
      <RegisterForm />
      <p>Already have and account? <span onClick={() => {
        navigate('/login');
      }} style={{cursor: "pointer", color: "blue"}}> login</span></p>
    </div>
  );
};

export default Register;
