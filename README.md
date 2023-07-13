# Lofy

Lofy is a clone of Spotify. My favorite genre to listen to while coding is lo-fi music and this site serves that purpose! Lofy provides its users with a network of solely lo-fi music to provide mellow background sounds to increase productivity, guide users to sleep, or conserve whatever vibes the user is trying to maintain.

Checkout [Lofy](https://lofy.onrender.com/)!

## Technologies Used
React
Redux
Python
Flask
Alembic
HTML
CSS
PostgresSql
SQLAlchemy

### Splash Page

![image](https://github.com/CaSandraSmith/Lofy/assets/123069069/cc5f41db-3169-4e95-830a-422e361b6e54)

### Home Page

![ezgif com-video-to-gif](https://github.com/CaSandraSmith/Lofy/assets/123069069/64c383b0-7783-45ca-80e9-549854dd58d0)

### Playlists

![ezgif com-video-to-gif (2)](https://github.com/CaSandraSmith/Lofy/assets/123069069/19e118f5-0cab-4407-897c-9f7d040f221f)

### Playlist Reviews

![ezgif com-video-to-gif (3)](https://github.com/CaSandraSmith/Lofy/assets/123069069/19b1eb3e-10a7-4034-9da5-372864c89a3d)

![Screenshot 2023-07-13 034155](https://github.com/CaSandraSmith/Lofy/assets/123069069/8843894e-9bb3-4a67-8bb2-e23f69fb3d11)

### Users Following other users

![ezgif com-video-to-gif (4)](https://github.com/CaSandraSmith/Lofy/assets/123069069/536bcb7e-69cd-4834-96b0-6e0c2fc0d757)

## Features

### Playlists
* Users can create a playlist
* Users can read and see all playlists
* Users can edit a playlists details and the songs on thier playlists
* Users can delete their playlists

### Reviews
* Users can create a review
* Users can read and see all reviews
* Users can edit a reviews details
* Users can delete their reviews

### Following
* Users can follow other users
* Users can see all their followers and who they are following
* Users can unfollow other users

### Search
* Users can search for songs, playlists, albums, and other users
* Search results are instantly updating

### Playing
* Users can play all songs, albums, and playlists
* Music stays constant as user navigates throughout the site

### Library
* Users can see all of the playlists and albums of other users that they have liked
* Users can add items to thier liked songs, albums, and playlists
* Library is instantly updating

## EndPoints

| Request                                                    | Purpose                                                            | Return Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|------------------------------------------------------------|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET /api/auth                                              | Authenticates a user.                                              | {             'id': INTEGER,             'username': STRING,             'email': STRING,             'profile_image': STRING }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| POST /api/auth/login                                       | Logs a user in                                                     | {              'id': INTEGER,              'username': STRING,              'email': STRING,              'profile_image': STRING  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| GET /api/auth/logout                                       | Logs a user out                                                    | {'message': 'User logged out'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| POST /api/auth/signup                                      | Creates a new user and logs them in                                | {              'id': INTEGER,              'username': STRING,              'email': STRING,              'profile_image': STRING  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| GET /api/auth/unauthorized                                 | Returns unauthorized JSON when flask-login authentication fails    | {'errors': ['Unauthorized']}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| GET /api/playlists/<int:id>/reviews                        | Gets all of the reviews for a playlist based on the playlist's id. | { [reviewId] : {             "id": INTEGER,             "playlist_id": INTEGER,             "review": STRING,             "stars": INTEGER,             "user": {                 "id": INTEGER,                 "username": STRING,                 "profile_image": STRING             }         }                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| POST /api/playlists/<int:id>/reviews                       | Creates a review for a playlist based on the playlist's id.        | {              "id": INTEGER,              "playlist_id": INTEGER,              "review": STRING,              "stars": INTEGER,              "user": {                  "id": INTEGER,                  "username": STRING,                  "profile_image": STRING              }  }                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| POST /api.playlists/<int:playlist_id>/songs/<int:song_id>. | Adds a song to a playlist                                          | {             'id': INTEGER,             'name': STRING,             'cover_image': STRING,             'description': STRING,             'first_created': DATE,             'last_updated': DATE,             'owner': {                 "id": INTEGER,                 "username": STRING,                 "profile_image": STRING             },             'songs': {[songId]: {             'id': INTEGER,             'name': STRING,             'artist_name': STRING,             'audio': STRING,             'length': INTEGER,             'album': {                 "id" : INTEGER,                 "name" : STRING,                 "cover_image": STRING                 }         }}         }                         |
| DELETE /api/playlists/<int:id>                             | Deletes a playlist                                                 | {"message": "Playlist successfully deleted"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| PUT /api/playlists/<int:id>                                | Edits the details of a playlist                                    | {              'id': INTEGER,              'name': STRING,              'cover_image': STRING,              'description': STRING,              'first_created': DATE,              'last_updated': DATE,              'owner': {                  "id": INTEGER,                  "username": STRING,                  "profile_image": STRING              },              'songs': {[songId]: {              'id': INTEGER,              'name': STRING,              'artist_name': STRING,              'audio': STRING,              'length': INTEGER,              'album': {                  "id" : INTEGER,                  "name" : STRING,                  "cover_image": STRING                  }          }}          } |
| POST  /api/playlists/new                                   | Creates new playlist                                               | {              'id': INTEGER,              'name': STRING,              'cover_image': STRING,              'description': STRING,              'first_created': DATE,              'last_updated': DATE,              'owner': {                  "id": INTEGER,                  "username": STRING,                  "profile_image": STRING              }          }                                                                                                                                                                                                                                                                                                                                                                 |
| GET /api/playlists/current                                 | Gets the playlists of the current user                             | { [playlistId]: {             'id': INTEGER,             'name': STRING,             'cover_image': STRING,             'description': STRING,             'first_created': DATE,             'last_updated': DATE,             'owner': {                 "id": INTEGER,                 "username": STRING,                 "profile_image": STRING             },             'songs': {[songId]: {             'id': INTEGER,             'name': STRING,             'artist_name': STRING,             'audio': STRING,             'length': INTEGER,             'album': {                 "id" : INTEGER,                 "name" : STRING,                 "cover_image": STRING                 }         }}         } }       |
| GET /api/playlists/<int:id>                                | Gets a playlist by its id                                          | { 'id': INTEGER, 'name': STRING, 'cover_image': STRING, 'description': STRING, 'first_created': DATE, 'last_updated': DATE, 'owner': { "id": INTEGER, "username": STRING, "profile_image": STRING }, 'songs': {[songId]: { 'id': INTEGER, 'name': STRING, 'artist_name': STRING, 'audio': STRING, 'length': INTEGER, 'album': { "id" : INTEGER, "name" : STRING, "cover_image": STRING } }} }                                                                                                                                                                                                                                                                                                                                             |
| GET /api/playlists                                         | Gets all playlists                                                 | { [playlistId]: { 'id': INTEGER, 'name': STRING, 'cover_image': STRING, 'description': STRING, 'first_created': DATE, 'last_updated': DATE, 'owner': { "id": INTEGER, "username": STRING, "profile_image": STRING },} }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| DELETE /api/reviews/<int:id>                               | Deletes a review                                                   | {"confirmation" : "Review successfully deleted"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| PUT /api/reviews/<int:id>                                  | Edits the details of a review                                      | {              "id": INTEGER,              "playlist_id": INTEGER,              "review": STRING,              "stars": INTEGER,              "user": {                  "id": INTEGER,                  "username": STRING,                  "profile_image": STRING              }          }                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| GET /api/misc                                              | Gets all of the albums                                             | {              "id": INTEGER,              "name": STRING,              "artist": STRING,              "cover_image": STRING,              "songs": {[songId]: {'id': INTEGER,              'name': STRING,              'artist_name': STRING', 'audio': STRING,              'length': INTEGER,              'album': {                  "id" : INTEGER,                  "name" : STRING,                  "cover_image": STRING                  }}          }                                                                                                                                                                                                                                                                        |
| GET /api/users                                             | Gets all users                                                     | {"users": [{              'id': INTEGER,              'username': STRING,              'email': STRING,              'profile_image': STRING  }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| GET /api/users/<int:id>                                    | Gets user by Id                                                    | { 'id': INTEGER, 'username': STRING, 'email': STRING, 'profile_image': STRING }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
## Future Implementation Goals
* User can change the order of their queue
* Playlists, albums, and songs recognize when they are being played
* Dynamic playlist and header backgrounds based on the dominant color in the cover image
* Home page is more dynamic between users
* Users can edit thier profiles

## Contact Me
[LinkedIn](https://www.linkedin.com/in/casandra-smith/)
[WellFound](https://wellfound.com/u/ca-sandra-smith)
