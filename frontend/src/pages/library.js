import React, { useState } from 'react';
import AddSongModal from '../components/modal/add-songs';
import SongList from '../components/library/song-list';
import SongQue from '../components/library/song-que';
import Controller from '../components/controller/controller';

const LibraryPage = ({ queuedSongs, setQueuedSongs, currentSongIndex, playNextSong, playPreviousSong, vocalVolume, setVocalVolume, backgroundVolume, setBackgroundVolume, playAllMedia, pauseAllMedia, handleBackGroundVolumeChange, handleVocalVolumeChange, vocalRef, videoRef, backgroundRef }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Library Page</h1>

      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Add Song
      </button>

      <AddSongModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />





      <div className="flex flex-wrap space-x-8">
        <div className="w-1/2 pr-2 border rounded-md p-2 bg-gray-200">
          <SongList queuedSongs={queuedSongs} setQueuedSongs={setQueuedSongs} />
        </div>

        <div className="w-1/3 pl-2 border rounded-md p-2 bg-gray-200">
          <Controller/>

          <SongQue queuedSongs={queuedSongs} setQueuedSongs={setQueuedSongs} currentSongIndex={currentSongIndex} />
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
