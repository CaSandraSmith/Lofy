import { useDispatch, useSelector } from "react-redux"
import { findCurrentUserPlaylists } from "../../store/playlists"
import { useEffect } from "react"
import UserNav from "../UserNav"

export default function HomePage() {


    return (
        <div>
            <UserNav />
        </div>
    )
}