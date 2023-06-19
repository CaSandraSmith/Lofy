const GET_ALL_ALBUMS = "get/allAlbums"
const GET_ALL_SONGS = "get/allSongs"

const getAllAlbums = (albums) => ({
    type: GET_ALL_ALBUMS,
    albums
})

const getAllSongs = (songs) => ({
    type: GET_ALL_SONGS,
    songs
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

let initialState = {albums: {}, songs:{}}

export default function miscReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SONGS:
            return {...state, songs:{...action.songs}, albums: {...state.albums}}
        case GET_ALL_ALBUMS:
            return {...state, songs:{...state.songs}, albums: {...action.albums}}
        default:
            return state
    }
}