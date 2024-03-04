import React from "react";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <h1>Welcome Back Kindly login or register to access the app</h1>

        <div className="onboarding-btn-wrapper">
          <button className="btn-login">Login</button>
          <button className="btn-register">Register</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
