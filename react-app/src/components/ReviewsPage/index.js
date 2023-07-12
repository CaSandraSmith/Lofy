import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getCurrentUserReviews, deletePlaylistReview } from "../../store/reviews"
import EditPlaylistReview from "../SinglePlaylistPage/PlaylistReviews/EditPlaylistReview"
import "./ReviewsPage.css"

export default function ReviewsPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [editReviewOpen, setEditReviewOpen] = useState(false)
    const [editedReview, setEditedReview] = useState(0)

    useEffect(() => {
        dispatch(getCurrentUserReviews())
    }, [dispatch])

    let user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.userReviews)
    let reviewsArr = Object.values(reviews)

    let deleteReview = async (id) => {
        let message = await dispatch(deletePlaylistReview(id))
    }

    let handleEditButtonClick = (id) => {
        setEditReviewOpen(true)
        setEditedReview(id)
    }

    return (
        <div className="review-page-wrapper">
            <h1>My Reviews</h1>
            {reviewsArr.length ?
                <div>
                    <div className="playlist-all-reviews-wrapper">
                        {reviewsArr.map(review => (
                            <div className="user-review-wrapper">
                                <div className="review-playlist-info-wrapper">
                                    <img
                                        className="review-playlist-cover"
                                        src={review.playlist.cover_image ? review.playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"}
                                        alt={`Playlist ${review.playlist.name} cover image`} />
                                    <div className="review-star-rating">
                                        <i className={`${review.stars >= 1 ? "review-smiles-green" : ""} fa-regular fa-face-smile`}></i>
                                        <i className={`${review.stars >= 2 ? "review-smiles-green" : ""} fa-regular fa-face-smile`}></i>
                                        <i className={`${review.stars >= 3 ? "review-smiles-green" : ""} fa-regular fa-face-smile`}></i>
                                        <i className={`${review.stars >= 4 ? "review-smiles-green" : ""} fa-regular fa-face-smile`}></i>
                                        <i className={`${review.stars === 5 ? "review-smiles-green" : ""} fa-regular fa-face-smile`}></i>
                                    </div>
                                </div>
                                <p>{review.playlist.name} By {review.playlist.owner}</p>
                                <p className="actual-playlist-review">{review.review}</p>
                                <div className="completed-review-buttons">
                                    <button onClick={() => history.push(`/playlist/${review.playlist.id}`)}>Go to Playlist's Page</button>
                                    <button onClick={() => handleEditButtonClick(review.id)}>Edit</button>
                                    <button onClick={() => deleteReview(review.id)}>Delete</button>
                                    {editReviewOpen && editedReview === review.id ?
                                        <EditPlaylistReview review={review} reviewMenuOpen={(e) => setEditReviewOpen(e)} />
                                        :
                                        null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                : <div>
                    <h2>You don't have any reviews yet</h2>
                    <h3>Check out a user's playlist and make a review today!</h3>
                </div>
            }
        </div>
    )
}