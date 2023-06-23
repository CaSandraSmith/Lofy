import { useState } from "react"
import { editPlaylistReview } from "../../../store/reviews"
import { useDispatch } from "react-redux"

export default function EditPlaylistReview({ review, reviewMenuOpen }) {
    const dispatch = useDispatch()
    const [reviewInput, setReviewInput] = useState(review.review)
    const [stars, setStars] = useState(review.stars)
    const [hoverStars, setHoverStars] = useState(0)
    const [errors, setErrors] = useState({})

    let handleEditSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        let valErrors = {}
        if (!reviewInput) {
            valErrors.review = "Must have review to create new review."
        }
        if (reviewInput.length < 10) {
            valErrors.review = "Review must be less at least 10 characters."
        }
        if (reviewInput.length > 255) {
            valErrors.review = "Review must be less than 255 characters."
        }
        if (!stars) {
            valErrors.stars = "Stars must be set to submit review"
        }

        if (Object.values(valErrors).length) {
            setErrors(valErrors)
            return
        }

        let updatedReview = await dispatch(editPlaylistReview(review.id, reviewInput, stars))

        if (updatedReview.errors) {
            setErrors(updatedReview.errors)
        } else {
            reviewMenuOpen(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleEditSubmit}>
                <h4>Edit your review</h4>
                <h5>Overall Rating</h5>
                <div onMouseLeave={() => setHoverStars(0)}>
                    <i className={`${stars >= 1 || hoverStars >= 1 ? "fa-solid" : "fa-regular"} fa-face-smile`} onClick={() => setStars(1)} onMouseEnter={() => setHoverStars(1)}></i>
                    <i className={`${stars >= 2 || hoverStars >= 2 ? "fa-solid" : "fa-regular"} fa-face-smile`} onClick={() => setStars(2)} onMouseEnter={() => setHoverStars(2)}></i>
                    <i className={`${stars >= 3 || hoverStars >= 3 ? "fa-solid" : "fa-regular"} fa-face-smile`} onClick={() => setStars(3)} onMouseEnter={() => setHoverStars(3)}></i>
                    <i className={`${stars >= 4 || hoverStars >= 4 ? "fa-solid" : "fa-regular"} fa-face-smile`} onClick={() => setStars(4)} onMouseEnter={() => setHoverStars(4)}></i>
                    <i className={`${stars === 5 || hoverStars === 5 ? "fa-solid" : "fa-regular"} fa-face-smile`} onClick={() => setStars(5)} onMouseEnter={() => setHoverStars(5)}></i>
                </div>
                {errors.stars ? <p>{errors.stars}</p> : null}
                <h4>Tell us the vibes</h4>
                <h5>Let everyone know what you thought of this playlist</h5>
                <label>
                    <textarea
                        value={reviewInput}
                        onChange={(e) => setReviewInput(e.target.value)}
                        placeholder="Leave your review here"
                        maxLength={255}
                    />
                    <p>{reviewInput.length} / 255</p>
                    {errors.review ? <p>{errors.review}</p> : null}
                </label>
                <button disabled={!stars || !reviewInput || reviewInput.length < 10}>Save edits</button>
                <button type="button" onClick={() => reviewMenuOpen(false)}>Cancel</button>
            </form>
        </div>
    )
}