import React from 'react';
import './gameBackground.css'; 

const SubmarineAnimation = () => {
  return (
    <div className="seaContainer">
      <div className="submarine__container">
        <div className="submarine__body">
          <div className="submarine__propeller">
            <div className="propeller__perspective">
              <div className="submarine__propeller-parts darkOne"></div>
              <div className="submarine__propeller-parts lightOne"></div>
            </div>
          </div>
          <div className="submarine__sail">
            <div className="submarine__sail-shadow dark1"></div>
            <div className="submarine__sail-shadow dark2"></div>
            <div className="submarine__sail-shadow light1"></div>
          </div>
          <div className="submarine__window one"></div>
          <div className="submarine__window two"></div>
          <div className="submarine__shadow-dark"></div>
          <div className="submarine__shadow-light"></div>
          <div className="submarine__shadow-arcLight"></div>
          <div className="submarine__periscope">
            <div className="submarine__periscope-glass"></div>
          </div>
        </div>
      </div>

      <div className="bubbles__container">
        <div className="bubbles bubble-1"></div>
        <div className="bubbles bubble-2"></div>
        <div className="bubbles bubble-3"></div>
        <div className="bubbles bubble-4"></div>
      </div>

      <div className="ground__container">
        <div className="ground1">
          <span className="up-1"></span>
          <span className="up-2"></span>
          <span className="up-3"></span>
          {/* Add more ground elements as needed */}
        </div>
        <div className="ground2">
          <span className="up-4"></span>
          <span className="up-5"></span>
        </div>
      </div>
    </div>
  );
};

export default SubmarineAnimation;
