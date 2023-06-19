const GET_PLAYLIST_REVIEWS = "reviews/playlist"

const getReviewsofPlaylist = (reviews) => ({
    type: GET_PLAYLIST_REVIEWS,
    reviews
})

export const getPlaylistReviews = (playlistId) => async (dispatch) => {
    let res = await fetch(`/api/playlists/${playlistId}/reviews`)

    if (res.ok) {
        let reviews = await res.json()
        dispatch(getReviewsofPlaylist(reviews))
        return reviews
    } else {
        let errors = res.json()
        return errors
    }
}

let initialState = {currentPlaylistReviews:{}}

export default function reviewsReducer(state = initialState, action){
    switch(action.type ){
        case GET_PLAYLIST_REVIEWS:
            return {...state, currentPlaylistReviews:{...action.reviews}}
        default:
            return state
    }
}