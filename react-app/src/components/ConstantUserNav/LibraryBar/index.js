import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { findCurrentUserPlaylists, createNewPlaylist } from "../../../store/playlists"
import { getAllUserSavedSongs } from "../../../store/albums"
import "./UserNav.css"

export default function LibraryBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getAllUserSavedSongs())
        dispatch(findCurrentUserPlaylists())
    }, [dispatch])
    
    const playlists = useSelector(state => state.playlists.currentUserPlaylists)
    const playlistArr = Object.values(playlists)
    let playlistsLength = playlistArr.length
    const savedSongs = useSelector(state => state.albums.savedSongs)
    const savedSongsArr = Object.values(savedSongs)

    let handleNewPlaylistClick = async () => {
        let playlist = await dispatch(createNewPlaylist())
        history.push(`/playlist/${playlist.id}`)
    }
    let formatLikedSongs = (songs) => {
        if (songs.length === 1) return "1 song"
        else return `${songs.length} songs`
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
                    {playlistArr.length ?
                        <div className="current-user-playlists-wrapper">
                            <div className="user-playlists-info">
                                <img 
                                className="user-playlists-cover-image"
                                src="https://res.cloudinary.com/djp7wsuit/image/upload/v1688505274/Untitled_design_12_gksdh3.png" 
                                alt="white heart with blue gradient background" />
                                <p className="library-playlist-name">{formatLikedSongs(savedSongsArr)}</p>
                            </div>
                            {playlistArr.map(playlist => (
                                <div className="user-playlists-info" onClick={() => history.push(`/playlist/${playlist.id}`)}>
                                    <img className="user-playlists-cover-image" 
                                    src={playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"} 
                                    alt={`Playlist ${playlist.name} cover image`}/>
                                    <p className="library-playlist-name">{playlist.name}</p>
                                </div>
                            ))}
                        </div>
                        : <div className="library-bar-no-playlists">
                            <p>Create your first playlist</p>
                            <p>It's easy, we'll help you</p>
                        </div>
                    }
            </div>
        </div>
    )
}