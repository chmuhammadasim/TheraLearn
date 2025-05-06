import React from "react";

const Shape = ({ type, color, onDragStart, onDragEnd, disabled }) => {
  const shapeStyle = {
    width: "80px",
    height: "80px",
    backgroundColor: color,
    margin: "10px",
    cursor: disabled ? "not-allowed" : "grab",
    opacity: disabled ? 0.5 : 1,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    position: "relative",
    overflow: "hidden",
  };

  // Create sparkle effect elements
  const sparkles = [];
  for (let i = 0; i < 5; i++) {
    const size = Math.random() * 5 + 2;
    sparkles.push({
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: "white",
      borderRadius: "50%",
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.8 + 0.2,
      animation: `twinkle ${Math.random() * 2 + 1}s infinite alternate`,
    });
  }

  return (
    <div
      className={disabled ? "shape-disabled" : "shape"}
      draggable={!disabled}
      onDragStart={(e) => onDragStart(e)}
      onDragEnd={onDragEnd}
      style={shapeStyle}
    >
      {/* Sparkle effects */}
      {!disabled &&
        sparkles.map((style, index) => (
          <div key={`sparkle-${index}`} style={style}></div>
        ))}

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)`,
          zIndex: 1,
        }}
      ></div>

      <img
        src={`/src/assets/shapes/${type}.svg`}
        alt={type}
        style={{
          width: "70%",
          height: "70%",
          position: "relative",
          zIndex: 2,
          filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.2))",
        }}
      />
    </div>
  );
};

export default Shape;
