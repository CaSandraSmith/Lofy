const GET_CURRENT_USER_PLAYLISTS = "playlists/currentUser"
const CREATE_PLAYLIST = "playlists/create"
const GET_SINGLE_PLAYLIST = "playlists/getOne"
const DELETE_PLAYLIST = "playlist/delete"
const CLEAR_SINGLE_PLAYLIST = "playlist/clear"
const UPDATE_PLAYLIST = "playlist/updateDetails"
const GET_ALL_PLAYLISTS = "playlist/getAll"
const ADD_SONG_TO_PLAYLIST = "playlist/addSong"

const getCurrentUserPlaylists = (playlists) => ({
    type: GET_CURRENT_USER_PLAYLISTS,
    playlists
})

const createPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist
})

const getPlaylist = (playlist) => ({
    type: GET_SINGLE_PLAYLIST,
    playlist
})

const deletePlaylist = (playlistId) => ({
    type: DELETE_PLAYLIST,
    playlistId
})

const updatePlaylistDetails = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist
})

const allPlaylists = (playlists) => ({
    type: GET_ALL_PLAYLISTS,
    playlists
})

const addSong = (playlist, song) => ({
    type: ADD_SONG_TO_PLAYLIST,
    playlist,
    song
})

export const clearPlaylist = () => ({
    type: CLEAR_SINGLE_PLAYLIST
})

export const findCurrentUserPlaylists = () => async (dispatch) => {
    let res = await fetch("/api/playlists/current")

    if (res.ok) {
        let playlists = await res.json()
        dispatch(getCurrentUserPlaylists(playlists))
        return playlists
    } else {
        let errors = await res.json()
        return errors
    }
}

export const createNewPlaylist = () => async (dispatch) => {
    let res = await fetch("/api/playlists/new", {
        method: "POST"
    })

    if (res.ok) {
        let playlist = await res.json()
        dispatch(createPlaylist(playlist))
        return playlist
    } else {
        let errors = await res.json()
        return errors
    }
}

export const getOnePlaylist = (id) => async (dispatch) => {
    let res = await fetch(`/api/playlists/${id}`)

    if (res.ok) {
        let playlist = await res.json()
        dispatch(getPlaylist(playlist))
        return playlist
    } else {
        let errors = await res.json()
        return errors
    }
}

export const deleteUserPlaylist = (playlistId) => async (dispatch) => {
    let res = await fetch(`/api/playlists/${playlistId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        let data = await res.json()
        dispatch(deletePlaylist(playlistId))
        return
    } else {
        let errors = await res.json()
        return errors
    }
}

export const updatePlaylist = (playlistId, details) => async (dispatch) => {
    let res = await fetch(`/api/playlists/${playlistId}`, {
        method: "PUT",
        body: details
    })
    if (res.ok) {
        const playlist = await res.json()
        dispatch(updatePlaylistDetails(playlist))
        return playlist
    } else {
        let errors = await res.json()
        return errors
    }
}

export const getAllPlaylists = () => async (dispatch) => {
    let res = await fetch("/api/playlists")

    if (res.ok) {
        let playlists = await res.json()
        dispatch(allPlaylists(playlists))
        return playlists
    } else {
        let errors = await res.json()
        return errors
    }
}

export const addSongToPlaylist = (playlistId, songId) => async(dispatch) => {
    let res = await fetch(`/api/playlists/${playlistId}/songs/${songId}`,{
        method: "POST"
    })

    if (res.ok) {
        let [playlist, song] = await res.json()
        dispatch(addSong(playlist, song))
        return playlist
    } else {
        let errors = await res.json()
        return errors
    }
}

let initialState = { allPlaylists: {}, singlePlaylist: {}, currentUserPlaylists: {} }

export default function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SONG_TO_PLAYLIST:
            let state3 = {...state, allPlaylists: {...state.allPlaylists}, singlePlaylist:{...state.singlePlaylist}, currentUserPlaylists: {...state.currentUserPlaylists}}
            state3.currentUserPlaylists[action.playlist.id] = action.playlist
            state3.singlePlaylist[action.playlist.id] = action.playlist
            state3.singlePlaylist[action.playlist.id].songs = {...state3.singlePlaylist[action.playlist.id].songs, ...action.song}
            return state3
        case GET_ALL_PLAYLISTS:
            return {...state, allPlaylists: {...action.playlists}, singlePlaylist: {...state.singlePlaylist}, currentUserPlaylists: {...state.currentUserPlaylists}}
        case UPDATE_PLAYLIST:
            let state2 = {...state, allPlaylists: {...state.allPlaylists}, singlePlaylist:{...state.singlePlaylist}, currentUserPlaylists: {...state.currentUserPlaylists}}

            state2.allPlaylists[action.playlist.id] = action.playlist
            state2.singlePlaylist = action.playlist
            state2.currentUserPlaylists[action.playlist.id] = action.playlist
            return state2
        case CLEAR_SINGLE_PLAYLIST:
            return { ...state, allPlaylists: { ...state.allPlaylists }, singlePlaylist: {}, currentUserPlaylists: { ...state.currentUserPlaylists } }
        case DELETE_PLAYLIST:
            let state1 = { ...state, allPlaylists: { ...state.allPlaylists }, singlePlaylist: { ...state.singlePlaylist }, currentUserPlaylists: { ...state.currentUserPlaylists } }
            delete state1.currentUserPlaylists[action.playlistId]
            return state1
        case GET_SINGLE_PLAYLIST:
            return { ...state, singlePlaylist: { ...action.playlist } }
        case CREATE_PLAYLIST:
            return { ...state, allPlaylists: { ...state.allPlaylists }, singlePlaylist: { ...state.singlePlaylist }, currentUserPlaylists: { ...state.currentUserPlaylists, [action.playlist.id]: action.playlist } }
        case GET_CURRENT_USER_PLAYLISTS:
            return { ...state, currentUserPlaylists: { ...action.playlists } }
        default:
            return state
    }
}