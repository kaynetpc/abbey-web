// src/components/Home.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'
import {LuRefreshCcw} from 'react-icons/lu';


const Home: React.FC = () => {
  const {isLogin, logout, user, autoLogin} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if(token) {
      autoLogin();
      return;
    }
  }, [isLogin]);

  return (
    <div className="home">
      <h2>Welcome Back {user?.firstName}</h2>
      <p>Follower: {user?.stats?.totalFollowers}</p>
      <p>Following: {user?.stats?.totalFollowing}</p>
      <p>Friends: {user?.stats?.totalFriends}</p>
      <div>
        <LuRefreshCcw onClick={autoLogin} className="refresh-icon"/>
      </div>
      <button onClick={() => {
        navigate('/community');
      }} className="button">Community</button>
      <button onClick={() => {
        logout();
        navigate('/login');
      }} className="button">Logout</button>
    </div>
  );
};

export default Home;
