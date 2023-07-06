const GET_ALL_ALBUMS = "get/allAlbums"
const GET_ALL_SONGS = "get/allSongs"
const GET_USER_SAVED_SONGS = "get/savedSongs"
const DELETE_SAVED_SONG = "delete/savedSongs"
const SAVE_SONG = "post/savedSongs"
const GET_ALL_SAVED_ALBUMS = "get/allSavedAlbums"
const DELETE_SAVED_ALBUM = "delete/savedAlbums"
const SAVE_ALBUM = "post/savedAlbums"

const getAllAlbums = (albums) => ({
    type: GET_ALL_ALBUMS,
    albums
})

const getAllSongs = (songs) => ({
    type: GET_ALL_SONGS,
    songs
})

const getSavedSongs = (songs) => ({
    type: GET_USER_SAVED_SONGS,
    songs
})

const deleteSavedSong = (songId) => ({
    type: DELETE_SAVED_SONG,
    songId
})

const saveSong = (song) => ({
    type: SAVE_SONG,
    song
})

const getSavedAlbums = (albums) => ({
    type: GET_ALL_SAVED_ALBUMS,
    albums
})

const deleteSavedAlbum = (albumId) => ({
    type: DELETE_SAVED_ALBUM,
    albumId
})

const saveAlbum = (album) => ({
    type: SAVE_ALBUM,
    album
})

export const gatherAllAlbums = () => async (dispatch) => {
    let res = await fetch("/api/misc")
    if (res.ok) {
        let allAlbums = await res.json()
        dispatch(getAllAlbums(allAlbums))
        return allAlbums
    } else {
        let errors = await res.json()
        return errors
    }
}

export const gatherAllSongs = () => async (dispatch) => {
    let res = await fetch("/api/misc/songs")
    if (res.ok) {
        let allSongs = await res.json()
        dispatch(getAllSongs(allSongs))
        return allSongs
    } else {
        let errors = await res.json()
        return errors
    }
}

export const getAllUserSavedSongs = () => async (dispatch) => {
    let res = await fetch("/api/misc/songs/current_user")

    if (res.ok) {
        let songs = await res.json()
        dispatch(getSavedSongs(songs))
        return songs
    } else {
        let errors = await res.json()
        return errors
    }
}

export const removeSavedSong = (songId) => async (dispatch) => {
    let res = await fetch(`/api/misc/songs/current_user/${songId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        let songs = await res.json()
        dispatch(deleteSavedSong(songId))
        return songs
    } else {
        let errors = await res.json()
        return errors
    }
}

export const createSavedSong = (songId) => async (dispatch) => {
    let res = await fetch(`/api/misc/songs/current_user/${songId}`, {
        method: "POST"
    })

    if (res.ok) {
        let song = await res.json()
        dispatch(saveSong(song))
        return song
    } else {
        let errors = await res.json()
        return errors
    }
}

export const getAllUsersSavedAlbums = () => async (dispatch) => {
    let res = await fetch("/api/misc/albums/current_user")

    if (res.ok) {
        let albums = await res.json()
        dispatch(getSavedAlbums(albums))
        return albums
    } else {
        let errors = await res.json()
        return errors
    }
}

export const removeSavedAlbum = (albumId) => async (dispatch) => {
    let res = await fetch(`/api/misc/albums/current_user/${albumId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        let message = await res.json()
        dispatch(deleteSavedAlbum(albumId))
        return message
    } else {
        let errors = await res.json()
        return errors
    }
}

export const createSavedAlbum = (albumId) => async (dispatch) => {
    let res = await fetch(`/api/misc/albums/current_user/${albumId}`, {
        method: "POST"
    })

    if (res.ok) {
        let album = await res.json()
        dispatch(saveAlbum(album))
        return album
    } else {
        let errors = await res.json()
        return errors
    }
}


let initialState = { albums: {}, songs: {}, savedSongs: {}, savedAlbums : {} }

export default function miscReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_ALBUM:
            return {
                ...state,
                songs: { ...state.songs },
                albums: { ...state.albums },
                savedSongs: { ...state.savedSongs },
                savedAlbums : {...state.savedAlbums, 
                [action.album.id] : action.album
                }
            }
        case DELETE_SAVED_ALBUM:
            let newState2 = {
                ...state,
                songs: { ...state.songs },
                albums: { ...state.albums },
                savedSongs: { ...state.savedSongs },
                savedAlbums : {...state.savedAlbums}
            }
            delete newState2.savedAlbums[action.albumId]
            return newState2
        case GET_ALL_SAVED_ALBUMS:
            return {
                ...state,
                songs: { ...state.songs },
                albums: { ...state.albums },
                savedSongs: { ...state.savedSongs },
                savedAlbums : action.albums
            }
        case SAVE_SONG:
            return {
                ...state,
                songs: { ...state.songs },
                albums: { ...state.albums },
                savedSongs: { ...state.savedSongs, 
                [action.song.id] : action.song
                }, 
                savedAlbums : {...state.savedAlbums}
            }
        case DELETE_SAVED_SONG:
            let newState = {
                ...state,
                songs: { ...state.songs },
                albums: { ...state.albums },
                savedSongs: { ...state.savedSongs },
                savedAlbums : {...state.savedAlbums}
            }
            delete newState.savedSongs[action.songId]
            return newState
        case GET_USER_SAVED_SONGS:
            return {
                ...state,
                songs: { ...state.songs },
                albums: { ...state.albums },
                savedSongs: action.songs,
                savedAlbums : {...state.savedAlbums}
            }
        case GET_ALL_SONGS:
            return {
                ...state,
                songs: { ...action.songs },
                albums: { ...state.albums },
                savedSongs: { ...state.savedSongs },
                savedAlbums : {...state.savedAlbums}
            }
        case GET_ALL_ALBUMS:
            return {
                ...state,
                songs: { ...state.songs },
                albums: { ...action.albums },
                savedSongs: { ...state.savedSongs },
                savedAlbums : {...state.savedAlbums}
            }
        default:
            return state
    }
}