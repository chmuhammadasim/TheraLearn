import React from "react";
import "./WavesAnimation.css";
import wave1 from "./assets/1.png";
import wave2 from "./assets/2.png";
import wave3 from "./assets/3.png";

const WavesAnimation = () => {
  return (
    <div className="container">
      <div className="mid-text">
        <h2>Count the Fish</h2>
      </div>
      <div className="line line-1">
        <div className="wave wave1" style={{ backgroundImage: `url(${wave1})` }}></div>
      </div>
      <div className="line line-2">
        <div className="wave wave2" style={{ backgroundImage: `url(${wave2})` }}></div>
      </div>
      <div className="line line-3">
        <div className="wave wave3" style={{ backgroundImage: `url(${wave3})` }}></div>
      </div>
    </div>
  );
};

export default WavesAnimation;
