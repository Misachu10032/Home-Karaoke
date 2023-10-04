import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { customModalStyles } from './modal-style';

const AddSongModal = ({ isOpen, onRequestClose, }) => {
  const [songName, setSongName] = useState('');
  const [language, setLanguage] = useState('Mandarin');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState([]);
  const [hasVocal, setHasVocal] = useState(true);
  const [songFile, setSongFile] = useState(null);
  const commonTags = ['weeb', '高音', '奇怪', '这其实是翻唱', '这其实是原唱'];

  const handleFileChange = (event) => {
    setSongFile(event.target.files[0]);
  };

  const handleSelectCommonTag = (tag) => {
    if (tags.includes(tag)) {
      setTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const backendURL = 'http://localhost:8000';

    const formData = new FormData();
    formData.append('songFile', songFile);
    formData.append('songName', songName);
    formData.append('author', author);
    formData.append('hasVocal', hasVocal);

    // Concatenate the tags array into a comma-separated string
    const tagsString = tags.length === 0 ? 'none' : tags.join(',');
    formData.append('tags', tagsString);

    formData.append('language', language);

    try {
      const response = await axios.post(`${backendURL}/addNewSong`, formData);
      console.log(response.data);
      onRequestClose();
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Song Modal"
      style={customModalStyles}
    >
      <h2 className="text-2xl font-bold mb-4">Add a New Song</h2>
      <form className="space-y-4" onSubmit={handleSave}>
        <div className="flex items-center">
          <label className="w-32">Choose Song File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="flex-1 border rounded p-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">Song Name:</label>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            className="flex-1 border rounded p-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex-1 border rounded p-2"
          >
            <option value="Mandarin">Mandarin</option>
            <option value="Japanese">Japanese</option>
            <option value="English">English</option>
            <option value="Cantonese">Cantonese</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-32">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="flex-1 border rounded p-2"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-32">Tags:</label>
          <div className="flex-1">
            {commonTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSelectCommonTag(tag)}
                className={`mr-2 mb-2 py-1 px-2 rounded ${
                  tags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32">Has Vocal:</label>
          <input
            type="checkbox"
            checked={hasVocal}
            onChange={(e) => setHasVocal(e.target.checked)}
            className="ml-2"
          />
        </div>
        <div className="flex justify-end">
          <button
              type="button"
              onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Process
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSongModal;
