import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {login, isLogin} = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    // Simulating login delay
    await login(email, password, (errMsg) => {
      setErrorMsg(errMsg);
      setLoading(false);
    });
    navigate('/')
    setLoading(false);

  };

  return (
    <div className="login-form">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <i style={{color: "red"}}>{errorMsg}</i>
      </form>
    </div>
  );
};

export default LoginForm;
