const GET_PLAYLIST_REVIEWS = "reviews/playlist"
const CREATE_REVIEW = "reviews/create"
const DELETE_REVIEW = "reviews/delete"

const getReviewsofPlaylist = (reviews) => ({
    type: GET_PLAYLIST_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
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

export const createNewReview = (playlistId, review, stars) => async (dispatch) => {
    let res = await fetch(`/api/playlists/${playlistId}/reviews`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({
            review,
            stars
        })
    })

    if (res.ok) {
        let review = await res.json()
        dispatch(createReview(review))
        return review
    } else {
        let errors = await res.json()
        return errors
    }

}

export const deletePlaylistReview = (reviewId) => async (dispatch) => {
    console.log("DELETE", reviewId)
    let res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        let review = await res.json()
        console.log("DELETE in res.ok", res)
        dispatch(deleteReview(reviewId))
    } else {
        let errors = await res.json()
        return errors
    }
}

let initialState = {currentPlaylistReviews:{}}

export default function reviewsReducer(state = initialState, action){
    switch(action.type ){
        case DELETE_REVIEW:
            let state1 = {
                ...state, currentPlaylistReviews: {...state.currentPlaylistReviews}
            }
            delete state1.currentPlaylistReviews[action.reviewId]
            return state1
        case CREATE_REVIEW:
            return {...state, currentPlaylistReviews:{...state.currentPlaylistReviews, [action.review.id]: action.review}}
        case GET_PLAYLIST_REVIEWS:
            return {...state, currentPlaylistReviews:{...action.reviews}}
        default:
            return state
    }
}