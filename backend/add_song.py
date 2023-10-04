
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

        # Generate a unique folder name for each user
        UPLOAD_FOLDER = os.path.join('/home','john','songs')

        user_folder = f"{songName}-{author}"
        user_upload_folder = os.path.join(UPLOAD_FOLDER, user_folder)

        # Create the user's upload folder if it doesn't exist
        if not os.path.exists(user_upload_folder):
            os.makedirs(user_upload_folder)

        # Save the file in the user's upload folder with its original filename

        print("path.join failed?")

        file_path = os.path.join(user_upload_folder, "video.mp4")

        with open(file_path, 'wb') as f:
            content = await songFile.read()
            f.write(content)

        # Save the song details to the database
        song_location= os.path.abspath(file_path)
        song_folder_location =os.path.abspath(user_upload_folder)
        tagsArray = tags.split(",")
        song_data = {
            "song_name": songName,
            "author": author,
            "folder_path": song_folder_location,
            "has_vocal":hasVocal,
            'tags': tagsArray,
            'language': language
        }
        collection.insert_one(song_data)

     
        print("no error sofoar?")
 

        return song_location
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