import { useDispatch, useSelector } from "react-redux"
import { findCurrentUserPlaylists } from "../../store/playlists"
import { useEffect } from "react"

export default function UserNav() {
    const dispatch = useDispatch()
    const playlists = useSelector(state => state.playlists.currentUserPlaylists)
    const playlistArr = Object.values(playlists)

    useEffect(() => {
        dispatch(findCurrentUserPlaylists())
    }, [dispatch])

    return (
        <div>
            <div>
                <div>
                    <i className="fa-solid fa-house"></i>
                    <p>Home</p>
                </div>
                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>Search</p>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <i className="fa-solid fa-cloud"></i>
                        <p>Your library</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </div>
                <div>
                    {playlistArr.length ?
                        <div>
                            {playlistArr.map(playlist => (
                                <div>
                                    {playlist.name}
                                </div>
                            ))}
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}