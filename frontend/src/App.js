import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import 'tailwindcss/tailwind.css';

import MainPage from './pages/main';
import LibraryPage from './pages/library';
import AddSongPage from './pages/addSongPage';

function App() {



  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [queuedSongs, setQueuedSongs] = useState([]);



  useEffect(() => {
    const handleStorageChange = (event) => {

      if (event.key === 'queuedSongs') {
        setQueuedSongs(JSON.parse(event.newValue));
      }
      if (event.key === 'currentSongIndex') {
        setCurrentSongIndex(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [queuedSongs]);


  useEffect(() => {
    console.log("did this app update", queuedSongs)
  }, [queuedSongs]);





  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            queuedSongs={queuedSongs}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}

          />
        }
      />
      <Route
        path="/library"
        element={
          <LibraryPage
            queuedSongs={queuedSongs}
            setQueuedSongs={setQueuedSongs}
            currentSongIndex={currentSongIndex}
          />
        }
      />
      <Route
        path="/add-song"
        element={
          <AddSongPage
          />
        }
      />
    </Routes>
  );
}

export default App;
