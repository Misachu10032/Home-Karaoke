import React from 'react';

import {   Link,  } from 'react-router-dom';
const LibraryLink = ( ) => {


  return (
    <div>
    <nav>
        <Link
        to="/library"
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-2 font-medium text-gray-800 hover:bg-gray-100 transition duration-300"
      >
        Library
      </Link>
     
    
    </nav>

  </div>
  );
};

export default LibraryLink;
