import React from 'react';

const SongQue = ({ queuedSongs, setQueuedSongs, currentSongIndex }) => {
  const changeCurrentSongIndex = (selectedSongIndex) => {
    console.log(selectedSongIndex,"selectedSongIndex")
    console.log(currentSongIndex)
       // Create a copy of the queuedSongs array
  const updatedQueuedSongs = [...queuedSongs];

  // Remove the current song from its original position
  const currentSong = updatedQueuedSongs.splice(selectedSongIndex, 1)[0];

  // Insert the current song at the new index
  updatedQueuedSongs.splice(currentSongIndex+1, 0, currentSong);
console.log(updatedQueuedSongs)
  // Update the state with the new queuedSongs array
  setQueuedSongs(updatedQueuedSongs);
  localStorage.setItem('queuedSongs',JSON.stringify(updatedQueuedSongs))

  };

  return (
    <div>
      <h1>Que</h1>
      {queuedSongs.map((song, index) => (
        <div
          key={`song.id-${index}`}
          className={`${
            index === currentSongIndex ? 'bg-yellow-200' : 'bg-white'
          } p-2 border border-gray-300 dark:border-gray-700 rounded-lg`}
        >
          <div className="p-4 bg-white flex flex-row items-center justify-between">
            <div className={`font-bold mb-2 ${song.has_vocal?'':'text-blue-600'}`}> {song.song_name}</div>
            <div className="font-bold mb-2"> {song.author}</div>
            <button
              className="font-bold py-2 px-4 rounded"
              onClick={() => changeCurrentSongIndex(index)}
            >
              ↑↑↑
            </button>
          </div>
          <div className="mt-2">
        
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongQue;
