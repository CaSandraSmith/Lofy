import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { findCurrentUserPlaylists, createNewPlaylist, getSavedPlaylistsOfCurrentUser } from "../../../store/playlists"
import { getAllUserSavedSongs, getAllUsersSavedAlbums } from "../../../store/albums"
import "./UserNav.css"

export default function LibraryBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [homeHover, setHomeHover] = useState(false)
    const [searchHover, setSearchHover] = useState(false)
    const [viewableCategories, setViewableCategories] = useState("all")

    useEffect(() => {
        dispatch(getAllUserSavedSongs())
        dispatch(findCurrentUserPlaylists())
        dispatch(getAllUsersSavedAlbums())
        dispatch(getSavedPlaylistsOfCurrentUser())
    }, [dispatch])

    const playlists = useSelector(state => state.playlists.currentUserPlaylists)
    const playlistArr = Object.values(playlists)
    // let playlistsLength = playlistArr.length
    const savedSongs = useSelector(state => state.albums.savedSongs)
    const savedSongsArr = Object.values(savedSongs)
    const savedAlbums = useSelector(state => state.albums.savedAlbums)
    const savedAlbumsArr = Object.values(savedAlbums)
    const savedPlaylists = useSelector(state => state.playlists.currentUserSavedPlaylists)
    const savedPlaylistsArr = Object.values(savedPlaylists)

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
                <div
                    className="library-general-button"
                    onClick={() => history.push("/home")}
                    onMouseEnter={() => setHomeHover(true)}
                    onMouseLeave={() => setHomeHover(false)}
                >
                    <i style={{ color: homeHover ? "white" : "#b3b3b3" }} className="fa-solid fa-house"></i>
                    <p style={{ color: homeHover ? "white" : "#b3b3b3" }} >Home</p>
                </div>
                <div
                    className="library-general-button"
                    onMouseEnter={() => setSearchHover(true)}
                    onMouseLeave={() => setSearchHover(false)}
                    onClick={() => history.push("/search")}
                >
                    <i  style={{ color: searchHover ? "white" : "#b3b3b3" }} class="fa-solid fa-magnifying-glass"></i>
                    <p style={{ color: searchHover ? "white" : "#b3b3b3" }} >Search</p>
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
                <div className="library-options-buttons-wrapper">
                    {viewableCategories != "all" ?
                        <button className="library-options-clear" onClick={() => setViewableCategories("all")}><i className="fa-solid fa-x "></i></button>
                        : null
                    }
                    {viewableCategories === "all" || viewableCategories === "playlists" ?
                        <button style={{backgroundColor: viewableCategories === "playlists" ? "white" : null, color: viewableCategories === "playlists" ? "black" : null}} className="library-options-buttons" onClick={() => setViewableCategories("playlists")}>Playlists</button>
                        : null
                    }
                    {viewableCategories === "playlists" ?
                        <button className="library-options-buttons" onClick={() => setViewableCategories("by you")}>By you</button>
                        : null
                    }
                    {viewableCategories === "by you" ? 
                    <div className="by-you-playlists-button">
                        <button>Playlists</button>
                        <button>By you</button>
                    </div>                        
                        : null}
                    {viewableCategories === "all" || viewableCategories === "albums" ?
                        <button style={{backgroundColor: viewableCategories === "albums" ? "white" : null, color: viewableCategories === "albums" ? "black" : null}} className="library-options-buttons" onClick={() => setViewableCategories("albums")} >Albums</button>
                        : null
                    }
                </div>
                <div className="current-user-playlists-wrapper">
                    {viewableCategories === "all" || viewableCategories === "playlists" ?
                    <div className="user-playlists-info" onClick={() => history.push("/collection/tracks")}>
                        <img
                            className="user-playlists-cover-image"
                            src="https://res.cloudinary.com/djp7wsuit/image/upload/v1688505274/Untitled_design_12_gksdh3.png"
                            alt="white heart with blue gradient background" />
                        <div className="library-playlist-info">
                            <p className="library-playlist-info-title">Liked Songs</p>
                            <div className="library-playlist-info-wrapper">
                                <i className="fa-solid fa-thumbtack"></i>
                                <p className="library-playlist-info-desc">Playlist</p>
                                <i className="fa-solid fa-circle library-playlist-info-dot"></i>
                                <p className="library-playlist-info-desc">{formatLikedSongs(savedSongsArr)}</p>
                            </div>
                        </div>
                    </div> : null}
                    {playlistArr.length && (viewableCategories === "all" || viewableCategories === "playlists" || viewableCategories === "by you")  ?
                        playlistArr.map(playlist => (
                            <div className="user-playlists-info" onClick={() => history.push(`/playlist/${playlist.id}`)}>
                                <img className="user-playlists-cover-image"
                                    src={playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"}
                                    alt={`Playlist ${playlist.name} cover image`} />
                                <div className="library-playlist-info">
                                    <p className="library-playlist-info-title">{playlist.name}</p>
                                    <div className="library-playlist-info-wrapper">
                                        <p className="library-playlist-info-desc">Playlist</p>
                                        <i className="fa-solid fa-circle library-playlist-info-dot"></i>
                                        <p className="library-playlist-info-desc">{playlist.owner?.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        : null
                    }
                    {savedPlaylistsArr.length && (viewableCategories === "all" || viewableCategories === "playlists") ?
                        savedPlaylistsArr.map(playlist => (
                            <div className="user-playlists-info" onClick={() => history.push(`/playlist/${playlist.id}`)}>
                                <img className="user-playlists-cover-image"
                                    src={playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"}
                                    alt={`Playlist ${playlist.name} cover image`} />
                                <div className="library-playlist-info">
                                    <p className="library-playlist-info-title">{playlist.name}</p>
                                    <div className="library-playlist-info-wrapper">
                                        <p className="library-playlist-info-desc">Playlist</p>
                                        <i className="fa-solid fa-circle library-playlist-info-dot"></i>
                                        <p className="library-playlist-info-desc">{playlist.owner?.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        : null
                    }
                    {savedAlbumsArr.length && (viewableCategories === "all" || viewableCategories === "albums") ?
                        savedAlbumsArr.map(album => (
                            <div className="user-playlists-info" onClick={() => history.push(`/album/${album.id}`)}>
                                <img className="user-playlists-cover-image"
                                    src={album.cover_image}
                                    alt={`Album ${album.name} cover image`}
                                />
                                <div className="library-playlist-info">
                                    <p className="library-playlist-info-title">{album.name}</p>
                                    <div className="library-playlist-info-wrapper">
                                        <p className="library-playlist-info-desc">Album</p>
                                        <i className="fa-solid fa-circle library-playlist-info-dot"></i>
                                        <p className="library-playlist-info-desc">{album.artist}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        : null
                    }
                </div>
            </div>
        </div>
    )
}