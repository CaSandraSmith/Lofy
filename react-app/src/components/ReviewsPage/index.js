import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserReviews } from "../../store/reviews"
import "./ReviewsPage.css"

export default function ReviewsPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentUserReviews())
    }, [dispatch])

    const reviews = useSelector(state => state.reviews.userReviews)

    console.log("reviews", reviews)

    return (
        <div className="review-page-wrapper">
            <h1>Hi</h1>
        </div>
    )
}