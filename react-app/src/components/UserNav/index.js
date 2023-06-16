import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { findCurrentUserPlaylists, createNewPlaylist } from "../../store/playlists"
import "./UserNav.css"

export default function UserNav() {
    const dispatch = useDispatch()
    const history = useHistory()
    const playlists = useSelector(state => state.playlists.currentUserPlaylists)
    const playlistArr = Object.values(playlists)
    let playlistsLength = playlistArr.length
    console.log("playlists", playlists)
    useEffect(() => {
        dispatch(findCurrentUserPlaylists())
    }, [dispatch])

    // useEffect(() => {

    // })

    let handleNewPlaylistClick = async () => {
        let playlist = await dispatch(createNewPlaylist())
    }

    return (
        <div className="full-user-nav">
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
                        <i className="fa-solid fa-plus" onClick={handleNewPlaylistClick}></i>
                    </div>
                </div>
                <div>
                    {playlistArr.length ?
                        <div>
                            {playlistArr.map(playlist => (
                                <div className="user-playlists-names" onClick={() => history.push(`/playlist/${playlist.id}`)}>
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