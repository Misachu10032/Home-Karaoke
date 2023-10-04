import os
import shutil

def move_files(songName,author):
    folder_name = f"{songName}-{author}"
    script_dir = os.path.dirname(os.path.abspath(__file__))
    backend_source_dir = os.path.join(script_dir, "separated", "htdemucs", "video")
    frontend_destination_dir = os.path.abspath(os.path.join( "/home", "john", "songs", folder_name))
    files_to_move = ["no_vocals.wav", "vocals.wav"]

    # Create destination directory if it doesn't exist
    os.makedirs(frontend_destination_dir, exist_ok=True)


    for file in files_to_move:
        source_path = os.path.join(backend_source_dir, file)
        destination_path = os.path.join(frontend_destination_dir, file)
        shutil.move(source_path, destination_path)
        print("Moved file from backend to frontend successfully.")
  