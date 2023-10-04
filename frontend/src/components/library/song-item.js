import React from 'react';
import EditSongModal from '../modal/edit-song ';

const SongItem = ({ song, isOpen, onOpenModal, onCloseModal, onAddToQueue }) => {
  return (
    <div className="flex-1"> {/* Add flex-1 class here to make SongItem expand */}
      <div className="flex flex-row justify-between">
        <div>
          <div className="flex flex-row">
            <p className={`font-bold ${song.has_vocal ? '' : 'text-blue-600'}`}>
              Song Name: {song.song_name}
            </p>

            {/* Add a button or trigger to open the modal */}
            <button className="ml-2" onClick={onOpenModal}>
              ..
            </button>

            {/* Render EditSongModal */}
            <EditSongModal isOpen={isOpen} onRequestClose={onCloseModal} song={song} />
          </div>

          <div className="mt-2">Author: {song.author}</div>

          {song.language && <div>Language: {song.language}</div>}

          {song.tags && !song.tags.includes('none') && (
            <div>Tags: {song.tags.join(', ')}</div>
          )}
        </div>

        <button
          onClick={() => onAddToQueue(song)}
          className="px-2 py-1 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Add to Queue
        </button>
      </div>
    </div>
  );
};

export default SongItem;
