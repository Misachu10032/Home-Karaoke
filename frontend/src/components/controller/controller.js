import React, {useState } from 'react';


const Controller = () => {

  const [playSwitch, setPlaySwitch] = useState(false);
  const [pauseSwitch, setPauseSwitch] = useState(false);
  const [nextSongSwitch, setNexSongSwitch] = useState(false);
  const [previousSongSwitch, setPreviousSongSwitch] = useState(false);
  const [fullScreenSwitch, setFullScreenSwitch] = useState(false);


  const [rewindSwitch, setRewindSwitch] = useState(false);
  const [skipSwitch, setSkipSwitch] = useState(false);
  const [vocalVolume, setVocalVolume] = useState(0.5);
  const [backgroundVolume, setBackgroundVolume] = useState(1);

  const handleVocalVolumeChange = (e) => {
    setVocalVolume(parseFloat(e.target.value));
    if (parseFloat(e.target.value) < 0.1) {
      localStorage.setItem('vocalVolume', JSON.stringify(0))

    } else {
      localStorage.setItem('vocalVolume', JSON.stringify(parseFloat(e.target.value)))
    }
  };


  const muteVocal = () => {

    localStorage.setItem('vocalVolume', JSON.stringify(0))
    setVocalVolume(0)


  };

  const handleBackGroundVolumeChange = (e) => {
    setBackgroundVolume(parseFloat(e.target.value));

    if (parseFloat(e.target.value) < 0.1) {
      localStorage.setItem('backgroundVolume', JSON.stringify(0))

    } else {
      localStorage.setItem('backgroundVolume', JSON.stringify(parseFloat(e.target.value)))
    }
  };




  const playAllMedia = () => {
    setPlaySwitch(!playSwitch);
    localStorage.setItem('playSwitch', JSON.stringify(!playSwitch))
  };


  const pauseAllMedia = () => {
    setPauseSwitch(!pauseSwitch);
    localStorage.setItem('pauseSwitch', JSON.stringify(!pauseSwitch))
  };
  const playNextSong = () => {
    setNexSongSwitch(!nextSongSwitch);
    localStorage.setItem('nextSongSwitch', JSON.stringify(!nextSongSwitch))
  };

  const playPreviousSong = () => {
    setPreviousSongSwitch(!previousSongSwitch);
    localStorage.setItem('previousSongSwitch', JSON.stringify(!previousSongSwitch))
  };
  const toggleFullScreen = () => {
    setFullScreenSwitch(!fullScreenSwitch);
    localStorage.setItem('fullScreenSwitch', JSON.stringify(!fullScreenSwitch))
  };

  const handleSkip = () => {
    setSkipSwitch(!skipSwitch);
    localStorage.setItem('skipSwitch', JSON.stringify(!skipSwitch))
  };

  const handleRewind = () => {
    setRewindSwitch(!rewindSwitch);
    localStorage.setItem('rewindSwitch', JSON.stringify(!rewindSwitch))
  };


  const handleNextSong = () => {
    playNextSong();
  };

  // Play the previous song
  const handlePreviousSong = () => {
    playPreviousSong();
  };










  return (
    <div className="flex flex-col  p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">

        <div className="volume-control">


          {/* Vocal Volume Control */}
          <label htmlFor="vocalVolume" className="block text-sm font-medium text-gray-700 dark:text-white">
            Vocal
          </label>

          <div>
            <input
              type="range"
              id="vocalVolume"
              className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              min="0"
              max="1"
              step="0.01"
              value={vocalVolume}
              onChange={handleVocalVolumeChange}
            />
            <button
              onClick={muteVocal}
              className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              MuteVocal
            </button>

          </div>



          {/* Background Volume Control */}
          <label htmlFor="backgroundVolume" className="block mt-2 text-sm font-medium text-gray-700 dark:text-white">
            Background
          </label>
          <input
            type="range"
            id="backgroundVolume"
            className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            min="0"
            max="1"
            step="0.01"
            value={backgroundVolume < 0.1 ? 0 : backgroundVolume}
            onChange={handleBackGroundVolumeChange}
          />
        </div>

        {/* Play and Pause Buttons */}
        <div>
          <button
            onClick={playAllMedia}
            className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Play All
          </button>
          <button
            onClick={pauseAllMedia}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            Pause All
          </button>
        </div>
      </div>

      {/* Skip and Rewind Buttons */}
      <div className="flex mb-4 space-x-4">
        <button
          onClick={handleRewind}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Rewind 5 Seconds
        </button>
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Skip 5 Seconds
        </button>
      </div>

      {/* Previous and Next Buttons */}
      <div className="flex mb-4 space-x-4">
        <button
          onClick={handlePreviousSong}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
        >
          Previous Song
        </button>
        <button
          onClick={handleNextSong}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
        >
          Next Song
        </button>
      </div>

      {/* Fullscreen Button */}
      <button
        onClick={toggleFullScreen}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-200"
      >
        {'Exit Fullscreen'}
      </button>
    </div>
  );
};

export default Controller;
