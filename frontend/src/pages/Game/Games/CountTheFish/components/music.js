import React, { useEffect, useState } from 'react';
import backgroundMusic from './assets/water.mp3'; // Replace with your audio file path

const MusicComponent = () => {
  const [audio] = useState(new Audio(backgroundMusic));

  useEffect(() => {
    const playMusic = () => {
      audio.loop = true; // Loop the music
      audio.volume = 0.5; // Set volume (0 to 1)
      audio.play().catch(err => {
        console.error('Error playing audio:', err);
      });
      // Remove the event listener once the music starts playing
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', playMusic);
    };

    // Add event listeners for user interaction
    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', playMusic);

    return () => {
      audio.pause(); // Clean up audio on unmount
    };
  }, [audio]);

  return (
    <div>
      
    </div>
  );
};

export default MusicComponent;
