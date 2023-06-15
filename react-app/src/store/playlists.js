const GET_CURRENT_USER_PLAYLISTS = "playlists/currentUser"
const CREATE_PLAYLIST = "playlists/create"
const GET_SINGLE_PLAYLIST = "playlists/getOne"


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

let initialState = {allPlaylists: {}, singlePlaylist: {}, currentUserPlaylists: {}}

export default function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SINGLE_PLAYLIST:
            return {...state, singlePlaylist: {...action.playlist}}
        case CREATE_PLAYLIST:
            return {...state, currentUserPlaylists: {...state.currentUserPlaylists, [action.playlist.id]: action.playlist}}
        case GET_CURRENT_USER_PLAYLISTS:
            return {...state, currentUserPlaylists: {...action.playlists}}
        default:
            return state 
    }
}