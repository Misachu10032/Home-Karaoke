import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from '../components/mediaPlayers/videoPlayer';
import AudioPlayer from '../components/mediaPlayers/audioPlayer';
import LibraryLink from '../components/links/library-link';

const MainPage = ({ queuedSongs, currentSongIndex, setCurrentSongIndex }) => {
  const videoVolume = 0;
  const [vocalVolume, setVocalVolume] = useState(0.5);
  const [backgroundVolume, setBackgroundVolume] = useState(1);
  const videoRef = useRef(null);
  const vocalRef = useRef(null);
  const backgroundRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);


  const playIfHasVocal = (song) => {
    if (song.has_vocal) {
      videoRef.current.volume = videoVolume;
      vocalRef.current.volume = vocalVolume;
      backgroundRef.current.volume = backgroundVolume;

      videoRef.current.play().catch((e) => {
        if (e.code === DOMException.ABORT_ERR) {
          console.log('previous play() was aborted, which is fine');
          return;
        }
        // Unexpected exception - rethrow.
        throw e;
      });;
      vocalRef.current.play().catch((e) => {
        if (e.code === DOMException.ABORT_ERR) {
          console.log('previous play() was aborted, which is fine');
          return;
        }
        // Unexpected exception - rethrow.
        throw e;
      });;
      backgroundRef.current.play().catch((e) => {
        if (e.code === DOMException.ABORT_ERR) {
          console.log('previous play() was aborted, which is fine');
          return;
        }
        // Unexpected exception - rethrow.
        throw e;
      });;
    } else {
      videoRef.current.volume = backgroundVolume;
      videoRef.current.play().catch((e) => {
        if (e.code === DOMException.ABORT_ERR) {
          console.log('previous play() was aborted, which is fine');
          return;
        }
        // Unexpected exception - rethrow.
        throw e;
      });;
    }
  };


  const playAllMedia = () => {

    playIfHasVocal(queuedSongs[currentSongIndex]);
  };



  const pauseAllMedia = () => {
    if (queuedSongs[currentSongIndex].has_vocal) {
      videoRef.current.pause();
      vocalRef.current.pause();
      backgroundRef.current.pause();
    } else {
      videoRef.current.pause();
    }
  };

  const handleVocalVolumeChange = () => {
    if (queuedSongs[currentSongIndex].has_vocal) {
      vocalRef.current.volume = vocalVolume;
      if (vocalVolume < 0.1) {
        vocalRef.current.volume = 0;
      }
    }
  };

  const handleBackGroundVolumeChange = () => {
    if (queuedSongs[currentSongIndex].has_vocal) {
      if (backgroundRef.current) {
        backgroundRef.current.volume = backgroundVolume;
        console.log(backgroundVolume);

        if (backgroundVolume < 0.1) {
          backgroundRef.current.volume = 0;
        }
      }
    } else {
      videoRef.current.volume = backgroundVolume;
      if (backgroundVolume < 0.1) {
        videoRef.current.volume = 0;
      }
    }
  };

  const playNextSong = async () => {
    // Increment the current song index by 1
    if (currentSongIndex < queuedSongs.length - 1) {
      setCurrentSongIndex((currentSongIndex) => currentSongIndex + 1);
      localStorage.setItem('currentSongIndex', JSON.stringify(currentSongIndex + 1));
      console.log(currentSongIndex, "sdsacxvz");
      await videoRef.current.load();
      await vocalRef.current.load();
      await backgroundRef.current.load();

      playIfHasVocal(queuedSongs[currentSongIndex + 1]);

    } else {
      setCurrentSongIndex(0);
      localStorage.setItem('currentSongIndex', JSON.stringify(0));
      playIfHasVocal(queuedSongs[0]);
    }
  };

  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      // Decrement the current song index by 1 if it's greater than 0
      setCurrentSongIndex((currentSongIndex) => currentSongIndex - 1);
      localStorage.setItem('currentSongIndex', JSON.stringify(currentSongIndex - 1));
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // Request full-screen mode for the video player
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(error => {
          console.error('Fullscreen request failed:', error);
        });

      }
    } else {
      // Exit full-screen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
    console.log(document.fullscreenElement !== null, "handle fullscreenChange")
  };

  const handleSkip = () => {
    if (vocalRef.current) {
      console.log("hows here", 5)
      vocalRef.current.currentTime += 5;
    }
    if (videoRef.current) {
      console.log("hows heresddsd", 5)
      videoRef.current.currentTime += 5;
    }
    if (backgroundRef.current) {
      console.log("hows heresddsdbbbb", 5)
      backgroundRef.current.currentTime += 5;
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
    }

    if (vocalRef.current) {
      vocalRef.current.currentTime -= 5;
    }
    if (backgroundRef.current) {
      backgroundRef.current.currentTime -= 5;
    }
  };


  const [playSwitch, setPlaySwitch] = useState(0);
  const [skipSwitch, setSkipSwitch] = useState(0);
  const [rewindSwitch, setRewindSwitch] = useState(0);
  const [pauseSwitch, setPauseSwitch] = useState(0);
  const [nextSongSwitch, setNexSongSwitch] = useState(0);
  const [previousSongSwitch, setPreviousSongSwitch] = useState(0);
  const [fullScreenSwitch, setFullScreenSwitch] = useState(0);


  useEffect(() => {
    const handleStorageChange = (event) => {

      const triggerConditionNumber = Math.floor(Math.random() * 100)
      if (event.key === 'playSwitch') {
        setPlaySwitch(triggerConditionNumber)
      }
      if (event.key === 'pauseSwitch') {
        setPauseSwitch(triggerConditionNumber)
      }
      if (event.key === 'nextSongSwitch') {
        setNexSongSwitch(triggerConditionNumber)
      }
      if (event.key === 'previousSongSwitch') {
        setPreviousSongSwitch(triggerConditionNumber)
      }
      if (event.key === 'fullScreenSwitch') {
        setFullScreenSwitch(triggerConditionNumber)
      }
      if (event.key === 'skipSwitch') {
        setSkipSwitch(triggerConditionNumber)
      }
      if (event.key === 'rewindSwitch') {
        setRewindSwitch(triggerConditionNumber)
      }
      if (event.key === 'vocalVolume') {
        setVocalVolume(JSON.parse(event.newValue))
      }
      if (event.key === 'backgroundVolume') {
        setBackgroundVolume(JSON.parse(event.newValue))
      }


    };


    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log(playSwitch, "playSwitch")

    if (playSwitch > 0) {
      playAllMedia()
    }
  }, [playSwitch]);

  useEffect(() => {
    if (pauseSwitch > 0) {
      pauseAllMedia()
    }
  }, [pauseSwitch]);

  useEffect(() => {
    if (nextSongSwitch > 0) {
      playNextSong()
    }
  }, [nextSongSwitch]);

  useEffect(() => {
    if (previousSongSwitch > 0) {
      playPreviousSong()
    }
  }, [previousSongSwitch]);
  useEffect(() => {
    console.log("fullscreen?")
    if (fullScreenSwitch > 0) {
      toggleFullScreen()
    }
  }, [fullScreenSwitch]);


  useEffect(() => {
    if (skipSwitch > 0) {
      console.log("did I ran")
      handleSkip()
    }
  }, [skipSwitch]);

  useEffect(() => {
    if (rewindSwitch > 0) {
      handleRewind()
    }
  }, [rewindSwitch]);

  useEffect(() => {
    if (queuedSongs[currentSongIndex]) {
      handleBackGroundVolumeChange()
    }


  }, [backgroundVolume]);
  useEffect(() => {
    if (queuedSongs[currentSongIndex]) {
      handleVocalVolumeChange()
    }


  }, [vocalVolume]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  },);


  return (
    <div className="App">
      <div className="flex flex-row">
        <VideoPlayer
          key={`${queuedSongs[currentSongIndex] ? `http://localhost:8010/${queuedSongs[currentSongIndex].song_name}-${queuedSongs[currentSongIndex].author}/` : ''}video`}
          src={`${queuedSongs[currentSongIndex] ? `http://localhost:8010/${queuedSongs[currentSongIndex].song_name}-${queuedSongs[currentSongIndex].author}/` : ''}video.mp4`}
          videoRef={videoRef}
        />


      </div>





      <AudioPlayer
        key={`${queuedSongs[currentSongIndex] ? `http://localhost:8010/${queuedSongs[currentSongIndex].song_name}-${queuedSongs[currentSongIndex].author}/` : ''}vocal`}
        src={`${queuedSongs[currentSongIndex] ? `http://localhost:8010/${queuedSongs[currentSongIndex].song_name}-${queuedSongs[currentSongIndex].author}/` : ''}vocals.wav`}
        audioRef={vocalRef}
      />
      <AudioPlayer
        key={`${queuedSongs[currentSongIndex] ? `http://localhost:8010/${queuedSongs[currentSongIndex].song_name}-${queuedSongs[currentSongIndex].author}/` : ''}background`}
        src={`${queuedSongs[currentSongIndex] ? `http://localhost:8010/${queuedSongs[currentSongIndex].song_name}-${queuedSongs[currentSongIndex].author}/` : ''}no_vocals.wav`}
        audioRef={backgroundRef}
      />
      <button
        onClick={toggleFullScreen}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-200"
      >
        {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>


      <LibraryLink />
    </div>
  );
};

export default MainPage;
