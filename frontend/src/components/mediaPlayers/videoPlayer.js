import React from 'react';


const VideoPlayer = ( {src,videoRef}) => {


  return (
    <div>
      <video ref={videoRef} >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
     
    </div>

    
  );
};

export default VideoPlayer;
