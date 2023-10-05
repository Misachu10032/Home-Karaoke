# Home Karaoke
Welcome to my personal project. This is a web-based karaoke player that allows users to browse songs, remove vocals, and sing along.
# Demo

## Table of Contents

1. **Introduction**
2. **Project Structure**
3. **Prerequisites**
4. **Installation**
5. **Usage**
6. **Features**
7. **Disclaimer**

## 1. Introduction

The reason I built this is that the karaoke in town is not ideal. The music library is limited and the the vocal removal is done poorly. With the advancment of AI, I'm building a karaoke system with better vocal removal by using  [Demucs](https://github.com/facebookresearch/demucs)
This project serves as a song library and karaoke player. It has a web UI built with React for browsing and selecting songs. Users can build their own playlist by adding songs to the library.

## 2. Project Structure

The project's file structure is organized as follows:

- `/frontend`: Contains the React-based frontend code.
- `/backend`: Contains the Python-based backend code.
- Your songs will be stored in `C:/songs` for Windows or `Home/songs` for Linux/Mac.

## 3. Prerequisites

Before you get started, make sure you have the following prerequisites installed:
- Python 3.x for the backend.
- [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/) for the database.
- [Demucs](https://github.com/facebookresearch/demucs) for vocal isolation. Please follow their installation instructions to until [here](https://github.com/facebookresearch/demucs#for-musicians)
I'm using the following command for vocal isolation
```
demucs --two-stems=vocals
```

## 4. Installation

Follow these steps to install and set up the Home Karaoke application:

1. Navigate to the root directory of the project and install the dependency

   ```
    npm install
   ```
2. Navigate to `/frontend` and install the dependency
   ```
    npm install
   ```
3. Navigate to `/backend` and install the dependency
   ```
   pip install -r requirements.txt
   ```

## 5. Usage

### To Run
- Navigate to the root directory of the project and run

For windows
```
   npm run start
```

For Linux
```
   npm run startLinux
```
The command will start both the frontend and backend servers. THe frontend will be hosted on port 3000 and the backend on port 5000. Port 8010 is used to host the local songs using python http.server.
 When running, you can access the Home Karaoke application by opening a web browser and navigating to `http://localhost:3000`. Please check the [Demo](https://github.com/Misachu10032/Demo).


## 6. Features

- Song library management.
- Vocal isolation for the songs with vocal
- Song search functionality.
- Karaoke with basic controls.

## 7. Disclaimer

This project, Home Karaoke, is intended for personal use and educational purposes only. It is not intended for commercial use, distribution, or any other purpose that may infringe on the rights of content creators, copyright holders, or third parties.

I'm building it just for fun!

For any questions or concerns regarding this disclaimer, please submit an issue.