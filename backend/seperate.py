

import subprocess


def run_command(command):
    """
    Execute a shell command and capture its output.

    Parameters:
    - command (str): The shell command to be executed.

    Returns:
    - tuple: A tuple containing the output of the command (stdout) and any error output (stderr).
    """

    subprocess.run(command, shell=True, )

    # backend_source_dir = f"./backend/separated/htdemucs/{folder_name}"
    # frontend_destination_dir = f"./frontend/public/music-storage/{folder_name}"
    # files_to_move = ["no_vocals.wav", "vocals.wav"]
    # for file in files_to_move:
    #         source_path = os.path.join(backend_source_dir, file)
    #         destination_path = os.path.join(frontend_destination_dir, file)
    #         shutil.move(source_path, destination_path)
        
    

# Example usage:
# Replace backslashes with forward slashes or use a raw string literal
