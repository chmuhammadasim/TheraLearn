import { useState } from 'react';
import GameStart from './components/GameStart';
import GameScreen from './components/GameScreen';
import GameOver from './components/GameOver';

function EmotionDetection() {
  const [gameState, setGameState] = useState('start');
  const [player, setPlayer] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const handleGameStart = (playerData) => {
    console.log('Starting game with player:', playerData); // Debug log
    setPlayer(playerData);
    setGameState('playing');
  };

  const handleGameOver = (result) => {
    setGameResult(result);
    setGameState('over');
  };

  const handleRestart = () => {
    setGameState('playing');
  };

  return (
    <>
      {gameState === 'start' && <GameStart onStart={handleGameStart} />}
      {gameState === 'playing' && player && (
        <GameScreen 
          player={player} 
          onGameOver={handleGameOver} 
          onUpdatePlayer={setPlayer}
        />
      )}
      {gameState === 'over' && player && gameResult && (
        <GameOver 
          player={player} 
          gameResult={gameResult} 
          onRestart={handleRestart} 
        />
      )}
    </>
  );
}

export default EmotionDetection;