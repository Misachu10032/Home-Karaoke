
from fastapi import UploadFile
from pymongo import MongoClient
import os

from bson import ObjectId

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017"
DATABASE_NAME = "song_library"
COLLECTION_NAME = "songs"

# MongoDB Client
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

async def add_song(songFile: UploadFile, songName: str, author: str,hasVocal:bool, tags: str, language: str):
    try:
        # Save the file to a temporary directory on the server
    
        
        if not songFile:
            return {"error": "No file part in the request"}

        # Check if the filename is empty
        if songFile.filename == '':
            return {"error": "No selected file"}




        if os.name == 'nt':
            UPLOAD_FOLDER ='C:/songs'
        elif os.name == 'posix':
            UPLOAD_FOLDER = os.path.join('/home','john','songs')
        else:
            UPLOAD_FOLDER = os.path.join('/home','john','songs')

        song_folder_name = f"{songName}-{author}"
        song_folder_abspath = os.path.abspath(os.path.join(UPLOAD_FOLDER, song_folder_name))
        print("abspath",song_folder_abspath)
        # Create the user's upload folder if it doesn't exist
        if not os.path.exists(song_folder_abspath):
            os.makedirs(song_folder_abspath)

        # Save the file in the user's upload folder with its original filename

        print("path.join failed?")


        file_path = os.path.join(song_folder_abspath, "video.mp4")
        print("filePath",file_path)

        with open(file_path, 'wb') as f:
            content = await songFile.read()
            f.write(content)

        # Save the song details to the database
       
       
        tagsArray = tags.split(",")
        song_data = {
            "song_name": songName,
            "author": author,
            "folder_path": song_folder_abspath,
            "has_vocal":hasVocal,
            'tags': tagsArray,
            'language': language
        }
        collection.insert_one(song_data)

     
        print("no error sofoar?")
 

        return file_path
    except Exception as e:
        # Handle any errors that occurred during the upload and database insertion
        return {"message": f"Failed to upload song: {str(e)}"}

def edit_song_by_id(song_id, new_data):
    # Convert the song_id string to ObjectId
    print(new_data,"inside")

    # Define the query to find the document by its _id
    query = {"_id": ObjectId(song_id)}

    # Define the update operation, using $set to update specific fields
    update = {"$set": new_data}

    # Use the update_one method to update the document
    result = collection.update_one(query, update)

    if result.modified_count == 1:
        print("Song updated successfully.")
    else:
        print("Song not found or no modifications were made.")