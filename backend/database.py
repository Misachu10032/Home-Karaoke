import pymongo

def connect_to_mongodb():
    # Replace 'your_mongodb_uri' with the actual MongoDB connection URI
    mongodb_uri = "mongodb://localhost:27017"
    client = pymongo.MongoClient(mongodb_uri)
    db = client['song_library']  # Replace 'song_library' with your database name
    collection = db['songs']  # Replace 'songs' with your collection name
    return client, collection

# def add_song(db, title, author, tags):
#     song = {
#         'title': title,
#         'author': author,
#         'tags': tags
#     }
#     # Replace 'songs' with the name of your MongoDB collection
#     collection = db['songs']
#     song_id = collection.insert_one(song).inserted_id
#     return song_id