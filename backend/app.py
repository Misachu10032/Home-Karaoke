
from seperate import run_command
from move_files import move_files
from add_song import add_song,edit_song_by_id
from fastapi import FastAPI, BackgroundTasks, File, UploadFile, Form, Query
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from database import connect_to_mongodb
import os
from rq import Queue

from redis import Redis
from pydantic import BaseModel
import pydantic

from bson import ObjectId
pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str
class SongUpdateRequest(BaseModel):
    song_id: str
    new_data: dict
mongo_client, collection = connect_to_mongodb()
app = FastAPI()
redis_conn = Redis(host='localhost', port=6379)  # Update with your Redis server details

# Create an RQ queue
rq_queue = Queue('my_queue', connection=redis_conn)  # Replace 'my_queue' with your desired queue name

origins = [
    "http://localhost",        # Allow requests from localhoste
    "http://localhost:3000",   # Allow requests from your frontend domain (if different port)
]

def run_separate(song_location):
    run_command(f'demucs --two-stems=vocals "{song_location}"')
    pass

def move_files_task(songName, author):
    move_files(songName, author)
    pass
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# # Folder where the uploaded files will be stored (relative to the current script's directory)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..','frontend', 'public', 'music-storage')
app.mount('/public', StaticFiles(directory=UPLOAD_FOLDER), name='public')

@app.post("/addNewSong/")
async def upload_song(
    background_tasks: BackgroundTasks,
    songFile: UploadFile = File(...),
    songName: str = Form(...),
    author: str = Form(...),
    hasVocal: bool = Form(...),
    tags: str = Form(...),
    language: str = Form(...)
):
    print("before tags arraty")

    song_location= await add_song(songFile,songName,author,hasVocal,tags,language)
    print("after")
    if hasVocal:
        background_tasks.add_task(run_command(f'demucs --two-stems=vocals "{song_location}"'))
        move_files(songName, author)
  
    return {"message": "Task enqueued, processing in the background."}

@app.put("/editSong/")


async def update_song(song_data: SongUpdateRequest):
    song_id = song_data.song_id
    new_data = song_data.new_data
    print("printer here?")

    print(new_data)
    edit_song_by_id(song_id, new_data)
  
    return {"message": "Song updated successfully"}




@app.get("/filterSongs")
async def filter_songs(
    songName: str = Query(None),
    author: str = Query(None),
    language: str = Query(None),
    tags: str = Query(None)
):
    try:
        # Prepare filters for the MongoDB query
        filters = {}
        if songName:
            filters["song_name"] = {"$regex": f".*{songName}.*", "$options": "i"}
        if author:
            filters["author"] = {"$regex": f".*{author}.*", "$options": "i"}
        if language:
            filters["language"] = {"$regex": f".*{language}.*", "$options": "i"}
        if tags:
            tags_list = tags.split(",")  # Split the tags string into a list
            filters["tags"] = {"$all": [tag.strip() for tag in tags_list]}
        
        # Fetch filtered songs from the songs collection
        filtered_songs = list(collection.find(filters))

        return filtered_songs
    except Exception as e:
        # Handle any errors that occurred during the database query
        return {"message": f"Failed to fetch filtered songs: {str(e)}"}