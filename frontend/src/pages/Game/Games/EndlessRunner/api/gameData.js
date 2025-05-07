import axios from "axios";

const selectedChild = (localStorage.getItem("selectedChildId") || "").replace(
  /^"|"$/g,
  ""
);
const token = localStorage.getItem("authToken");

export const saveToDatabase = async ({ time, bestScore }) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_KEY}/game/saveGameData`,
      {
        gameName: "SonicRunnerGame",
        duration: time,
        score: bestScore,
        level: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          selectedchild: selectedChild,
        },
      }
    );
    console.log("Game state saved successfully");
  } catch (error) {
    console.error("Error saving game state:", error);
  }
};

export const loadFromDatabase = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}/game/loadGameData/SonicRunnerGame`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          selectedchild: selectedChild,
        },
      }
    );
    return {
      time: response.data?.duration || 0,
      bestScore: response.data?.score || 0,
    };
  } catch (error) {
    console.error("Error loading game state:", error);
    return { time: 0, bestScore: 0 };
  }
};
