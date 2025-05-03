import React from 'react';
import './AnimatedBackground.css';

export default function AnimatedBackground({ level, turns, time, score }) {
  return (
    <div className="animation-area">
      <div className="banner-text">
  <div className="header-container">
    <span className="header-item">Level: {level}</span>
    <span className="header-item">Turns: {turns}</span>
    <span className="header-item">Time: {time}s</span>
    <span className="header-item">Score: {score}</span>
  </div>
</div>
<body>

  <div class="scene">
    <div class="upper">
      <div class="moon">
        <div class="crater1"></div>
        <div class="crater2"></div>
      </div>
      <div class="star1"></div>
      <div class="star2"></div>
      <div class="star3"></div>
      <div class="cloud1">
        <div class="circle"></div>
        <div class="filler"></div>
      </div>
      <div class="cloud2">
        <div class="circle"></div>
        <div class="filler"></div>
      </div>
      <div class="tail">
        <div class="left"></div>
        <div class="right"></div>
        <div class="body"></div>
      </div>

      <div class="drop"></div>

    </div>
    <div class="lower">
      <div class="whale">
        <div class="eye"></div>
        <div class="detail1">
          <div class="detail2"></div>
        </div>

      </div>
      <div class="fin"></div>
    </div>
  </div>
</body>
</div>
  );
}
