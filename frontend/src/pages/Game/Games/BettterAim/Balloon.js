import React from 'react';
// import './Balloon.css';

function Balloon({ balloon, onClick }) {
  return (
    <div
      className={`balloon ${balloon.isBonus ? 'bonus' : ''}`}
      style={{
        left: `${balloon.x}%`,
        top: `${balloon.y}%`,
        width: `${balloon.size}px`,
        height: `${balloon.size}px`,
        backgroundColor: balloon.color,
      }}
      onClick={onClick}
    >
      {balloon.face}
    </div>
  );
}

export default Balloon;
