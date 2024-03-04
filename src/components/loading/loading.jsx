import React from "react";
import "./loading.css";

const Loading = function ({ show }) {
  return (
    <>
      {show && (
        <div className="loading-screen">
        <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
};

export default Loading;
