const GET_ALL_ALBUMS = "get/allAlbums"
const GET_ALL_SONGS = "get/allSongs"
const GET_USER_SAVED_SONGS = "get/savedSongs"
const DELETE_SAVED_SONG = "delete/savedSongs"

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

export const gatherAllAlbums = () => async(dispatch) => {
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

export const gatherAllSongs = () => async(dispatch) => {
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

export const getAllUserSavedSongs = () => async(dispatch) => {
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

export const removeSavedSong = (songId) => async(dispatch) => {
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

let initialState = {albums: {}, songs:{}, savedSongs : {}}

export default function miscReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_SAVED_SONG:
            let newState = {...state, songs:{...state.songs}, albums: {...state.albums}, savedSongs: {...state.savedSongs}}
            delete newState.savedSongs[action.songId]
            return newState
        case GET_USER_SAVED_SONGS:
            return {...state, songs:{...state.songs}, albums: {...state.albums}, savedSongs: action.songs}
        case GET_ALL_SONGS:
            return {...state, songs:{...action.songs}, albums: {...state.albums}, savedSongs: {...state.savedSongs}}
        case GET_ALL_ALBUMS:
            return {...state, songs:{...state.songs}, albums: {...action.albums}, savedSongs: {...state.savedSongs}, savedSongs: {...state.savedSongs}}
        default:
            return state
    }
}