import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
            playAlertSound();
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup phase
    return () => {
      clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const playAlertSound = () => {
    console.log('playAlertSound function called');
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.play();
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(1);
    setSeconds(0);
  };

  return (
    <div className='back-g'>
      <h1>Pomodoro Timer</h1>
      <div className='timer'>
        <h1>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </h1>
      </div>
      <div className='buttons'>
        <button onClick={toggleTimer} className='btn'>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer} className='btn-1'>Reset</button>
      </div>
    </div>
  );
}

export default App;
