const GET_PLAYLIST_REVIEWS = "reviews/playlist"
const CREATE_REVIEW = "reviews/create"
const DELETE_REVIEW = "reviews/delete"
const EDIT_REVIEW = "reviews/edit"
const GET_USER_REVIEWS = "reviews/user"

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

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

const getUserReviews = (reviews) => ({
    type: GET_USER_REVIEWS,
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

export const editPlaylistReview = (reviewId, review, stars) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
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
        dispatch(editReview(review))
        return review
    } else {
        let errors = await res.json()
        return errors
    }
}

export const getCurrentUserReviews = () => async (dispatch) => {
    let res = await fetch("/api/reviews/current")

    if (res.ok) {
        let reviews = await res.json()
        dispatch(getUserReviews(reviews))
        return reviews
    } else {
        let errors = await res.json()
        return errors
    }
}

let initialState = {currentPlaylistReviews:{}, userReviews: {}}

export default function reviewsReducer(state = initialState, action){
    switch(action.type ){
        case GET_USER_REVIEWS:
            return {
                ...state, 
                currentPlaylistReviews: {...state.currentPlaylistReviews},
                userReviews: {...action.reviews}
            }
        case EDIT_REVIEW:
            let state2 = {
                ...state, 
                currentPlaylistReviews: {...state.currentPlaylistReviews},
                userReviews: {...state.userReviews}
            }
            state2.currentPlaylistReviews[action.review.id] = action.review
            state2.userReviews[action.review.id] = action.review
            return state2
        case DELETE_REVIEW:
            let state1 = {
                ...state, 
                currentPlaylistReviews: {...state.currentPlaylistReviews},
                userReviews: {...state.userReviews}
            }
            delete state1.currentPlaylistReviews[action.reviewId]
            delete state1.userReviews[action.reviewId]
            return state1
        case CREATE_REVIEW:
            return {...state, 
                currentPlaylistReviews:{...state.currentPlaylistReviews, 
                    [action.review.id]: action.review},
                userReviews: {...state.userReviews,
                    [action.review.id]: action.review},
                }
        case GET_PLAYLIST_REVIEWS:
            return {...state, 
                currentPlaylistReviews:{...action.reviews}, 
                userReviews: {...state.userReviews}}
        default:
            return state
    }
}