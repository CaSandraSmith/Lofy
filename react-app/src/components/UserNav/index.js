import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { findCurrentUserPlaylists, createNewPlaylist } from "../../store/playlists"
import "./UserNav.css"

export default function UserNav() {
    const dispatch = useDispatch()
    const history = useHistory()
    const playlists = useSelector(state => state.playlists.currentUserPlaylists)
    const playlistArr = Object.values(playlists)

    useEffect(() => {
        dispatch(findCurrentUserPlaylists())
    }, [dispatch])

    let handleNewPlaylistClick = async () => {
        let playlist = await dispatch(createNewPlaylist())
        console.log("playlist", playlist)
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
                        <div >
                            {playlistArr.map(playlist => (
                                <div onClick={() => history.push(`/home/playlist/${playlist.id}`)}>
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