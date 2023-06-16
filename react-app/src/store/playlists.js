const GET_CURRENT_USER_PLAYLISTS = "playlists/currentUser"
const CREATE_PLAYLIST = "playlists/create"
const GET_SINGLE_PLAYLIST = "playlists/getOne"
const DELETE_PLAYLIST = "playlist/delete"
const CLEAR_SINGLE_PLAYLIST = "playlist/clear"

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

export const clearPlaylist = () => ({
    type: CLEAR_SINGLE_PLAYLIST
})

export const findCurrentUserPlaylists = () => async (dispatch) => {
    let res = await fetch("/api/playlists/current")

    if (res.ok) {
        console.log("hello")
        let playlists = await res.json()
        dispatch(getCurrentUserPlaylists(playlists))
        return playlists
    } else {
        let errors = await res.json()
        return errors
    }
}

export const createNewPlaylist = () => async(dispatch) => {
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

let initialState = {allPlaylists: {}, singlePlaylist: {}, currentUserPlaylists: {}}

export default function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case CLEAR_SINGLE_PLAYLIST:
            return {...state, allPlaylists:{...state.allPlaylists}, singlePlaylist: {}, currentUserPlaylists: {...state.currentUserPlaylists}}
        case DELETE_PLAYLIST:
            let state1 = {...state, allPlaylists:{...state.allPlaylists}, singlePlaylist: {...state.singlePlaylist}, currentUserPlaylists: {...state.currentUserPlaylists}}
            delete state.currentUserPlaylists[action.playlistId]
            return state1
        case GET_SINGLE_PLAYLIST:
            return {...state, singlePlaylist: {...action.playlist}}
        case CREATE_PLAYLIST:
            return {...state, allPlaylists:{...state.allPlaylists}, singlePlaylist: {...state.singlePlaylist}, currentUserPlaylists: {...state.currentUserPlaylists, [action.playlist.id]: action.playlist}}
        case GET_CURRENT_USER_PLAYLISTS:
            return {...state, currentUserPlaylists: {...action.playlists}}
        default:
            return state 
    }
}