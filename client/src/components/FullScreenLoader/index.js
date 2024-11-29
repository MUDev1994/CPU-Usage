import React from "react";
import ReactLoading from "react-loading";
import "./style.css";

const FullScreenLoader = () => {
  return (
    <div className="fullscreen-loader">
      <ReactLoading type="spin" color="#ffffff" height={80} width={80} />
      <p className="loading-text">Please wait, loading...</p>
    </div>
  );
};

export default FullScreenLoader;
