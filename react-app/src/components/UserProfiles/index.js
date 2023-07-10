import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import CurrentUserProfile from './CurrentUserProfile'
import OtherUserProfile from './OtherUserProfile'
import './UserProfiles.css'

export default function UserProfiles() {
    const { username } = useParams()
    const user = useSelector(state => state.session.user)

    if (user.username === username) return <CurrentUserProfile />
    else return <OtherUserProfile username={username}/>
}

