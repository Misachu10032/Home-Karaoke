// Import React, useState, and useEffect
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditSongModal from '../modal/edit-song ';
import SongItem from './song-item';

const SongList = ({ queuedSongs, setQueuedSongs }) => {
  // Initialize state for filtering and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10; // Number of songs to display per page

  // State for search queries
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [authorQuery, setAuthorQuery] = useState('');
  const [languageQuery, setLanguageQuery] = useState('');
  const [tagsQuery, setTagsQuery] = useState('');

  const [search, setSearch] = useState(false);
  // Your backend URL
  const backendURL = 'http://localhost:8000'; const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
  const [isModalOpenArray, setIsModalOpenArray] = useState(currentSongs.map(() => false));

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  useEffect(() => {
    // Fetch filtered songs when searchQuery, authorQuery, or tagsQuery changes
    const fetchFilteredSongs = async () => {
      try {
        const response = await axios.get(`${backendURL}/filterSongs`, {
          params: { songName: searchQuery, author: authorQuery, tags: tagsQuery, language: languageQuery },
        });
        setFilteredSongs(response.data);
      } catch (error) {
        console.error('Error fetching filtered songs:', error);
      }
    };

    fetchFilteredSongs();
  }, [search]);

  // Calculate the current page's song list


  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to add a song to the queue
  const handleAddToQueue = (song) => {
    setQueuedSongs(() => [...queuedSongs, song]);
    localStorage.setItem('queuedSongs', JSON.stringify([...queuedSongs, song]));
  };

  // Function to open a specific modal by index
  const handleOpenModal = (index) => {
    const updatedIsModalOpenArray = [...isModalOpenArray];

    updatedIsModalOpenArray[index] = true;
    setIsModalOpenArray(updatedIsModalOpenArray);
  };

  // Function to close a specific modal by index
  const handleCloseModal = (index) => {
    const updatedIsModalOpenArray = [...isModalOpenArray];
    updatedIsModalOpenArray[index] = false;
    setIsModalOpenArray(updatedIsModalOpenArray);
  };
  return (
    <div>
      {/* Search by song name */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search songs by name"
        className="p-2 mb-4 border rounded-md"
      />

      {/* Search by author */}
      <input
        type="text"
        value={authorQuery}
        onChange={(e) => setAuthorQuery(e.target.value)}
        placeholder="Search songs by author"
        className="p-2 mb-4 border rounded-md"
      />

      {/* Search by tags */}
      <input
        type="text"
        value={tagsQuery}
        onChange={(e) => setTagsQuery(e.target.value)}
        placeholder="Search songs by tags"
        className="p-2 mb-4 border rounded-md"
      />
      <input
        type="text"
        value={languageQuery}
        onChange={(e) => setLanguageQuery(e.target.value)}
        placeholder="Search songs by language"
        className="p-2 mb-4 border rounded-md"
      />
      <button
        onClick={() => setSearch(!search)}
        className="ml-auto px-2 py-1 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Filter
      </button>

      {/* Render filtered songs */}
      <div>
        {currentSongs.map((song, index) => (
          <div key={index} className="border rounded-md mb-4 p-4 bg-white flex flex-row">
            <SongItem
              song={song}
              isOpen={isModalOpenArray[index]}
              onOpenModal={() => handleOpenModal(index)}
              onCloseModal={() => handleCloseModal(index)}
              onAddToQueue={() => handleAddToQueue(song)}
            />
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="pagination flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SongList;
