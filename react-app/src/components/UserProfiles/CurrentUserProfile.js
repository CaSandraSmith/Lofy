import { useSelector } from "react-redux"

export default function CurrentUserProfile() {
    const user = useSelector(state => state.session.user)
    return (
        <div className="user-profiles-wrapper">
            <h1>Hello</h1>
        </div>
    )
}