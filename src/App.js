import React, { useEffect, useState, useRef } from 'react';
import YouTube from 'react-youtube';
import './App.css';
import lofi1 from './assets/lofi1.gif';
import lofi2 from './assets/lofi2.gif';
import lofi3 from './assets/lofi3.gif';
import lofi4 from './assets/lofi4.gif';
import fullscreenIcon from './assets/fullscreenIcon.jpg';
import githubLogo from './assets/githubLogo.png';

const gifs = [lofi1, lofi2, lofi3, lofi4];
const videoId = 'qH3fETPsqXU';

function App() {
  const [index, setIndex] = useState(() => {
    const saved = localStorage.getItem('backgroundIndex');
    return saved ? Number(saved) : 0;
  });
  const playerRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('volume');
    return saved ? Number(saved) : 50;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setIndex((prev) => {
          const next = (prev + 1) % gifs.length;
          localStorage.setItem('backgroundIndex', next);
          return next;
        });
      } else if (e.key === 'ArrowLeft') {
        setIndex((prev) => {
          const next = (prev - 1 + gifs.length) % gifs.length;
          localStorage.setItem('backgroundIndex', next);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function toggleFullScreen() {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
    if (playing) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    if (!playing) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
    setPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    localStorage.setItem('volume', vol);
    if (playerRef.current) {
      playerRef.current.setVolume(vol);
    }
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: videoId,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div
      style={{
        backgroundImage: `url(${gifs[index]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <button
          onClick={() => window.open('https://github.com/Osilon')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            height: '40px',
            width: '40px',
            marginLeft: 'auto',
            marginTop: '20px',
            marginRight: '20px',
          }}
        >
          <img src={githubLogo} style={{height: '40px', width: '40px'}} alt="Github Button"></img>
        </button>

        <button
          onClick={toggleFullScreen}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            height: '50px',
            width: '50px',
            marginTop: '20px',
            marginRight: '20px',
          }}
        >
          <img src={fullscreenIcon} style={{ height: '50px' }} alt="Fullscreen Button" />
        </button>
      </div>

      <h1
        style={{
          fontFamily: 'Jersey20',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          marginTop: 'auto',
          marginLeft: '20px',
          fontSize: '24px'
        }}
      >
        background {index + 1} &nbsp;[change using arrow keys]
      </h1>

      <div
        style={{
          marginLeft: '20px',
          marginBottom: '20px',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
          alignSelf: 'flex-start',
        }}
      >
        <button
          onClick={togglePlayPause}
          style={{
            cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid white',
            borderRadius: '5px',
            color: 'white',
            padding: '6px 12px',
            marginRight: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            fontFamily: 'Jersey20',
          }}
        >
          {playing ? 'Pause Music' : 'Play Music'}
        </button>
        <label
          style={{
            marginRight: '8px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            fontFamily: 'Jersey20',
          }}
        >
          Volume:
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          style={{ verticalAlign: 'middle' }}
        />
      </div>

      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
}

export default App;