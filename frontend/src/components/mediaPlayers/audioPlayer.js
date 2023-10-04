import React from 'react';


const AudioPlayer = ( {src,audioRef}) => {


  return (
    <div>
      <audio ref={audioRef} >
        <source src={src} type="audio/mpeg" />
        Your browser does not support the video tag.
      </audio>
     
    </div>
  );
};

export default AudioPlayer;
