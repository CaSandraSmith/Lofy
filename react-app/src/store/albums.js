const GET_ALL_ALBUMS = "get/allAlbums"

const getAllAlbums = (albums) => ({
    type: GET_ALL_ALBUMS,
    albums
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

let initialState = {albums: {}}

export default function albumReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ALBUMS:
            return {...state, albums: {...action.albums}}
        default:
            return state
    }
}