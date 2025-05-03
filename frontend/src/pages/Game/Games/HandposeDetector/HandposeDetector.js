import React, { useRef, useEffect, useState } from "react";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import * as fp from "fingerpose";
import {
  ThumbsUpGesture,
  ThumbsDownGesture,
  OKHandGesture,
  VictoryGesture,
  CrossedFingersGesture,
  LoveYouGesture,
  VulcanSaluteGesture,
  RaisedHandGesture,
  CallMeHandGesture,
} from "./gestures";

import thumbs_up from "./thumbs_up.png";
import thumbs_down from "./thumbs_down.png";
import ok_hand from "./ok_hand.png";
import victory from "./victory.png";
import crossed_fingers from "./crossed_fingers.png";
import love_you from "./love_you.png";
import vulcan_salute from "./vulcan_salute.png";
import raised_hand from "./raised_hand.png";
import call_me_hand from "./call_me_hand.png";

const images = [
  { name: "thumbs_up", src: thumbs_up },
  { name: "thumbs_down", src: thumbs_down },
  { name: "ok_hand", src: ok_hand },
  { name: "victory", src: victory },
  { name: "crossed_fingers", src: crossed_fingers },
  { name: "love_you", src: love_you },
  { name: "vulcan_salute", src: vulcan_salute },
  { name: "raised_hand", src: raised_hand },
  { name: "call_me_hand", src: call_me_hand },
];

const GAME_NAME = "HandPoseDetector";
const API_URL = "https://your-api-url.com/api"; // Replace with your actual API endpoint

function HandposeDetector() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showStartOptions, setShowStartOptions] = useState(false);
  const [previousSessionExists, setPreviousSessionExists] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || "");
  const [error, setError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(true);

  useEffect(() => {
    // Check if user has an auth token
    if (authToken) {
      setIsAuthenticated(true);
      checkForPreviousSession();
    } else {
      setShowStartOptions(true);
      setLoading(false);
    }

    const runHandpose = async () => {
      setLoading(true);
      try {
        const net = await handpose.load();
        console.log("Handpose model loaded.");
        setLoading(false);
        detect(net);
      } catch (err) {
        console.error("Error loading handpose model:", err);
        setLoading(false);
        setError("Failed to load handpose model. Please check your internet connection and try again.");
      }
    };

    if (!showStartOptions) {
      runHandpose();
    }
  }, [showStartOptions, authToken]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showStartOptions && !gameOver && !error) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showStartOptions, gameOver, error]);

  // Save progress whenever score changes
  useEffect(() => {
    if (isAuthenticated && score > 0) {
      saveProgress();
    }
  }, [score, isAuthenticated]);

  const checkForPreviousSession = async () => {
    try {
      const response = await fetch(`${API_URL}/progress`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.gameName === GAME_NAME && data.currentLevel > 0) {
          setPreviousSessionExists(true);
          setShowStartOptions(true);
        } else {
          setShowStartOptions(false);
        }
      } else {
        if (response.status === 401) {
          // Token expired or invalid
          handleLogout();
          setError("Your session has expired. Please log in again.");
        } else {
          console.error("Error response:", response.status);
          setShowStartOptions(false);
        }
      }
    } catch (error) {
      console.error("Error checking previous session:", error);
      setError("Failed to connect to the server. Please check your internet connection.");
      setShowStartOptions(false);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken("");
    setIsAuthenticated(false);
    setShowStartOptions(true);
  };

  const saveProgress = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch(`${API_URL}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          gameName: GAME_NAME,
          currentLevel,
          score,
          time,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          setError("Your session has expired. Please log in again.");
        } else {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error saving progress:", error);
      setFeedback("Failed to save progress. Will try again later.");
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  const loadPreviousSession = async () => {
    try {
      const response = await fetch(`${API_URL}/progress`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.gameName === GAME_NAME) {
          setCurrentLevel(data.currentLevel);
          setScore(data.score);
          setTime(data.time);
          setShowStartOptions(false);
        }
      } else {
        if (response.status === 401) {
          handleLogout();
          setError("Your session has expired. Please log in again.");
        } else {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error loading previous session:", error);
      setError("Failed to load your previous session. Starting a new game.");
      setTimeout(() => {
        setError(null);
        startNewGame();
      }, 3000);
    }
  };

  const startNewGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setTime(0);
    setGameOver(false);
    setError(null);
    setShowStartOptions(false);
  };

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        const data = await response.json();
        setAuthToken(data.token);
        localStorage.setItem('authToken', data.token);
        setIsAuthenticated(true);
        checkForPreviousSession();
      } else {
        const errorData = await response.json().catch(() => ({ message: "Login failed" }));
        setError(errorData.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to authentication service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const detect = async (net) => {
    if (!webcamRef.current || !canvasRef.current) {
      requestAnimationFrame(() => detect(net));
      return;
    }

    // Check if webcam is ready
    if (webcamRef.current.video && webcamRef.current.video.readyState === 4) {
      try {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        // Make sure we have a valid video size
        if (videoWidth === 0 || videoHeight === 0) {
          requestAnimationFrame(() => detect(net));
          return;
        }

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Only process if no error and game is active
        if (!error && !gameOver && !showStartOptions) {
          const hand = await net.estimateHands(video);

          if (hand.length > 0) {
            const GE = new fp.GestureEstimator([
              ThumbsUpGesture,
              ThumbsDownGesture,
              OKHandGesture,
              VictoryGesture,
              CrossedFingersGesture,
              LoveYouGesture,
              VulcanSaluteGesture,
              RaisedHandGesture,
              CallMeHandGesture,
            ]);

            const gesture = GE.estimate(hand[0].landmarks, 8);

            if (gesture.gestures && gesture.gestures.length > 0) {
              const maxConfidenceIndex = gesture.gestures.reduce(
                (bestIndex, current, index, array) =>
                  current.confidence > array[bestIndex].confidence
                    ? index
                    : bestIndex,
                0
              );

              const detectedEmoji = gesture.gestures[maxConfidenceIndex]?.name;
              const confidence = gesture.gestures[maxConfidenceIndex]?.confidence;

              if (confidence > 7) {
                if (detectedEmoji === images[currentLevel].name) {
                  setScore((prevScore) => prevScore + 50);
                  setFeedback("Correct! Well done!");
                  setTimeout(() => setFeedback(""), 1000);

                  if (currentLevel + 1 < images.length) {
                    setCurrentLevel((prevLevel) => prevLevel + 1);
                  } else {
                    setGameOver(true);
                    saveProgress();
                  }
                } else {
                  setFeedback("Incorrect. Try again!");
                  setTimeout(() => setFeedback(""), 1000);
                }
              }
            }
          }

          const ctx = canvasRef.current.getContext("2d");
          drawHand(hand, ctx);
        }
      } catch (err) {
        console.error("Error during hand detection:", err);
        setError("An error occurred during hand detection. Please refresh the page.");
      }
    } else if (webcamRef.current.video && webcamRef.current.video.readyState === 0) {
      // Camera not available or permission denied
      if (cameraPermission) {
        setCameraPermission(false);
        setError("Camera access is required for this application. Please grant permission and refresh the page.");
      }
    }

    // Continue the detection loop
    if (!gameOver) {
      requestAnimationFrame(() => detect(net));
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setTime(0);
    setGameOver(false);
    setError(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl w-full max-w-5xl backdrop-blur-sm bg-opacity-95">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 sm:h-80">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Loading handpose model...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a moment depending on your device</p>
          </div>
        ) : showStartOptions ? (
          <div className="text-center py-10 px-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-inner">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Hand Pose Detector Game</h2>
            {previousSessionExists ? (
              <>
                <p className="text-lg text-gray-600 mb-6">You have a previous session saved. Would you like to continue or start a new game?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={loadPreviousSession}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg"
                  >
                    Continue Previous Session
                  </button>
                  <button
                    onClick={startNewGame}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700 transition duration-300 shadow-lg"
                  >
                    Start New Game
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-600 mb-6">Welcome to the Hand Pose Detector Game!</p>
                <button
                  onClick={startNewGame}
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg"
                >
                  Start Game
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Hand Pose Detector</h1>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center bg-indigo-100 py-2 px-4 rounded-full shadow-sm">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-indigo-600 rounded-full text-white font-bold mr-2">
                    <span>{currentLevel + 1}</span>
                  </div>
                  <span className="text-gray-700 font-semibold">Level</span>
                </div>
                <div className="bg-indigo-100 py-2 px-4 rounded-full flex items-center shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 font-semibold">{formatTime(time)}</span>
                </div>
                <div className="bg-indigo-100 py-2 px-4 rounded-full flex items-center shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="text-gray-700 font-semibold">{score}</span>
                </div>
              </div>
            </div>
            {gameOver ? (
              <div className="text-center py-10 px-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-inner">
                <div className="animate-bounce mb-4">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Game Complete!</h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">Congratulations! You completed all levels with a score of <span className="font-bold text-indigo-600">{score}</span> in <span className="font-bold text-indigo-600">{formatTime(time)}</span>.</p>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:space-x-8 items-center mb-6 gap-6">
                <div className="w-full lg:w-1/2">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-inner flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-lg text-gray-600 mb-4 font-medium">Make this gesture:</p>
                      <div className="relative mx-auto max-w-xs transform transition-transform duration-300 hover:scale-105">
                        {images[currentLevel]?.src ? (
                          <img
                            src={images[currentLevel]?.src}
                            alt="Target Pose"
                            className="w-36 h-36 sm:w-48 sm:h-48 object-contain mx-auto"
                            onError={(e) => {
                              console.error("Failed to load image");
                              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyMi41MjVoLTIzLjk5OWwuOTk5LTE5LjAyNmgzLjcyMWwxLjAyNC0zLjQ5OWgxMi41MWwxLjAyNCAzLjQ5OWgzLjcyMmwuOTk5IDE5LjAyNnptLTEuODc1LS45MzlsLS45MzMtMTcuMTQ3aC0xOS4zODJsLS45MzMgMTcuMTQ3aDIxLjI0OHptLTIuODE2LTE4LjA4NmgtMTUuNjE3bC0uNzY4LTIuNjIyaDYuNjg4bDEuMDI0IDMuNDk5aDQuNjdsLTEuMDI0LTMuNDk5aDYuNjg4bC0uNzYxIDIuNjIyem0tNy4yMzYgMi40NTljMy4yOTEgMCA1Ljk3IDIuNjc5IDUuOTcgNS45N3MtMi42NzkgNS45Ny01Ljk3IDUuOTctNS45Ny0yLjY3OS01Ljk3LTUuOTcgMi42NzktNS45NyA1Ljk3LTUuOTd6bTAgMTAuOTk5YzIuNzczIDAgNS4wMy0yLjI1NiA1LjAzLTUuMDI5cy0yLjI1Ni01LjAzLTUuMDMtNS4wMy01LjAyOSAyLjI1Ny01LjAyOSA1LjAzIDIuMjU2IDUuMDI5IDUuMDI5IDUuMDI5em0wLTguNjQ5YzEuOTk4IDAgMy42MiAxLjYyMiAzLjYyIDMuNjJzLTEuNjIyIDMuNjE5LTMuNjIgMy42MTktMy42Mi0xLjYyMS0zLjYyLTMuNjE5IDEuNjIyLTMuNjIgMy42Mi0zLjYyeiIvPjwvc3ZnPg==";
                            }}
                          />
                        ) : (
                          <div className="w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center bg-gray-200 rounded-lg">
                            <span className="text-gray-500">Image not available</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-b-lg font-medium uppercase tracking-wide text-sm">
                          {(images[currentLevel]?.name || "Loading...").replace(/_/g, " ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 relative">
                  <div className="rounded-xl overflow-hidden shadow-xl border-4 border-indigo-200 hover:border-indigo-300 transition-colors duration-300 bg-white">
                    <Webcam
                      ref={webcamRef}
                      className="w-full h-auto"
                      videoConstraints={{ facingMode: "user" }}
                      onUserMediaError={(err) => {
                        console.error("Webcam error:", err);
                        setCameraPermission(false);
                        setError("Cannot access camera. Please check permissions and make sure no other application is using your camera.");
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    Camera {cameraPermission ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
            )}
            {feedback && (
              <div className={`mb-6 p-4 rounded-lg text-center transition-all duration-300 transform ${feedback.includes("Correct") || feedback.includes("successfully") ? "bg-green-100 text-green-700 border-l-4 border-green-500" : feedback.includes("Incorrect") || feedback.includes("Error") ? "bg-red-100 text-red-700 border-l-4 border-red-500" : "bg-blue-100 text-blue-700 border-l-4 border-blue-500"}`}>
                <p className="text-lg font-semibold">{feedback}</p>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Position your hand clearly in the camera view and make the gesture shown.</p>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 text-white text-center text-xs opacity-75">
        <p>© {new Date().getFullYear()} Hand Pose Detector | Privacy-focused: All processing happens on your device</p>
      </div>
    </div>
  );
}

export default HandposeDetector;