import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewReview } from "../../../store/reviews"


export default function CreatePlaylistReview({ playlist, reviews }) {
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    const [review, setReview] = useState("")
    const [stars, setStars] = useState(0)
    const [hoverStars, setHoverStars] = useState(0)
    const [createReviewMenu, setCreateReviewMenu] = useState(false)
    const [errors, setErrors] = useState({})

    let handleNewReview = async (e) => {
        e.preventDefault()
        setErrors({})
        let valErrors = {}
        if (!review) {
            valErrors.review = "Must have review to create new review."
        }
        if (review.length < 10) {
            valErrors.review = "Review must be less at least 10 characters."
        }
        if (review.length > 255) {
            valErrors.review = "Review must be less than 255 characters."
        }
        if (!stars) {
            valErrors.stars = "Stars must be set to submit review"
        }

        if (Object.values(valErrors).length) {
            setErrors(valErrors)
            return
        }

        let newReview = await dispatch(createNewReview(playlist.id, review, stars))
    }

    let cancelReview = () => {
        setCreateReviewMenu(false)
        setReview("")
        setHoverStars(0)
        setStars(0)
        setErrors({})
    }

    return (
        <div>
            {
                createReviewMenu ?
                    <button onClick={cancelReview}>
                        Cancel review
                    </button> :
                    <button onClick={() => setCreateReviewMenu(true)}>
                        Create a review
                    </button>
            }
            {createReviewMenu && <div>
                <form onSubmit={handleNewReview}>
                    <h3>Create Review</h3>
                    <h4>Overall Rating</h4>
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
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Leave your review here"
                            maxLength={255}
                        />
                        <p>{review.length} / 255</p>
                        {errors.review ? <p>{errors.review}</p> : null}
                    </label>
                    <button disabled={!stars || !review || review.length < 10}>Submit</button>
                </form>
            </div>}
        </div>
    )
}