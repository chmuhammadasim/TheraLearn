import React, { useEffect, useState } from "react";

const Timer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    // Reset timer when timeLimit changes (e.g., new level)
    setTimeLeft(timeLimit);
    setIsWarning(false);
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

      // Set warning when less than 30% time remains
      if (timeLeft < timeLimit * 0.3 && !isWarning) {
        setIsWarning(true);
      }

      return () => clearTimeout(timer);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp, timeLimit, isWarning]);

  // Calculate percentage for visual display
  const percentage = (timeLeft / timeLimit) * 100;

  // Determine color based on time left
  const getTimerColor = () => {
    if (percentage > 60) return "#4CAF50"; // Green
    if (percentage > 30) return "#FF9800"; // Orange
    return "#F44336"; // Red
  };

  const timerColor = getTimerColor();

  return (
    <div className="timer-container">
      <h2 className={`time-display ${isWarning ? "warning" : ""}`}>
        Time Left:
        <span
          style={{
            color: timerColor,
            fontWeight: "bold",
            animation: isWarning ? "pulse 0.8s infinite" : "none",
          }}
        >
          {" "}
          {timeLeft}
        </span>
        seconds
      </h2>

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${percentage}%`,
            backgroundColor: timerColor,
            boxShadow: `0 0 8px ${timerColor}`,
          }}
        ></div>
      </div>

      {/* Additional visual indicators for low time */}
      {isWarning && <div className="timer-alert">Hurry up!</div>}
    </div>
  );
};

export default Timer;
