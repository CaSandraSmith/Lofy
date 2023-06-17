import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { findCurrentUserPlaylists, createNewPlaylist } from "../../../store/playlists"
import "./UserNav.css"

export default function LibraryBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const playlists = useSelector(state => state.playlists.currentUserPlaylists)
    const playlistArr = Object.values(playlists)
    let playlistsLength = playlistArr.length
    console.log("playlists", playlists)
    useEffect(() => {
        dispatch(findCurrentUserPlaylists())
    }, [dispatch])

    let handleNewPlaylistClick = async () => {
        let playlist = await dispatch(createNewPlaylist())
        history.push(`/playlist/${playlist.id}`)
    }

    return (
        <div className="full-user-nav">
            <div className="library-home-and-search">
                <div className="library-general-button" onClick={() => history.push("/home")}>
                    <i className="fa-solid fa-house"></i>
                    <p>Home</p>
                </div>
                <div className="library-general-button">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>Search</p>
                </div>
            </div>
            <div className="library-all-user-playlists">
                <div className="library-playlist-header">
                    <div className="library-playlist-header-title">
                        <i className="fa-solid fa-cloud"></i>
                        <p>Your library</p>
                    </div>
                    <div className="library-create-playlist-button">
                        <i className="fa-solid fa-plus" onClick={handleNewPlaylistClick}></i>
                    </div>
                </div>
                <div>
                    {playlistArr.length ?
                        <div>
                            {playlistArr.map(playlist => (
                                <div className="user-playlists-names" onClick={() => history.push(`/playlist/${playlist.id}`)}>
                                    <p className="library-playlist-name">{playlist.name}</p>
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