import { useSelector, useDispatch } from "react-redux"
import { logout } from '../../store/session';
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gatherAllAlbums, gatherAllSongs, getAllUserSavedSongs, removeSavedSong, createSavedSong } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllUsers } from "../../store/session";
import { useAudio } from "../../context/Audio"
import "./SearchBar.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { setPlaying, setQueue, setSong } = useAudio()
    let user = useSelector(state => state.session.user)
    const [menu, setMenu] = useState(false)
    const [searching, setSearching] = useState(false)
    const [searchParams, setSearchParams] = useState("")
    const profileRef = useRef()

    useEffect(() => {
        dispatch(gatherAllAlbums())
        dispatch(gatherAllSongs())
        dispatch(getAllPlaylists())
        dispatch(getAllUsers())
        dispatch(getAllUserSavedSongs())
    }, [dispatch])

    useEffect(() => {
        if (!menu || !user) return;

        const closeMenu = (e) => {
            if (!profileRef.current?.contains(e.target)) {
                setMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [menu]);

    useEffect(() => {
        if (searchParams.length) {
            setSearching(true)
        } else {
            setSearching(false)
        }
    }, [searchParams])

    let handleLogout = async () => {
        setMenu(false)
        history.push("/")
        dispatch(logout())
    }

    let users = useSelector(state => state.session.allUsers)
    let playlists = useSelector(state => state.playlists.allPlaylists)
    let albums = useSelector(state => state.albums.albums)
    let songs = useSelector(state => state.albums.songs)
    const savedSongs = useSelector(state => state.albums.savedSongs)
    let savedSongsIds = Object.keys(savedSongs)

    let filterUsers = () => {
        return Object.values(users).filter(user => user.username.toLowerCase().includes(searchParams.toLowerCase()))
    }

    let filterPlaylists = () => {
        return Object.values(playlists).filter(playlist => playlist.name.toLowerCase().includes(searchParams.toLowerCase()))
    }

    let filterAlbums = () => {
        return Object.values(albums).filter(album => album.name.toLowerCase().includes(searchParams.toLowerCase()))
    }

    let filterSongs = () => {
        return Object.values(songs).filter(song => song.name.toLowerCase().includes(searchParams.toLowerCase()))
    }

    let handleSaveSongClick = async (songId) => {
        dispatch(createSavedSong(songId))
    }

    let handleUnsaveSongClick = async (songId) => {
        dispatch(removeSavedSong(songId))
    }

    let handleSongClick = (song, i) => {
        setPlaying(true)
        setSong(song)
        setQueue(filterSongs())
    }

    let convertLengthTable = (length) => {
        let minutes = Math.floor(length / 60)
        let seconds = length % 60
        let sec = seconds.toString()
        if (sec.length < 2) {
            sec = "0" + sec
        }
        return `${minutes}:${sec}`
    }

    return (
        <div className="search-page-wrapper">
            <div className="search-nav" >
                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="search-input-wrapper">
                            <i className="fa-solid fa-magnifying-glass search-bar-icon"></i>
                            <label>
                                <input
                                    className="search-input"
                                    type="text"
                                    value={searchParams}
                                    onChange={(e) => setSearchParams(e.target.value)}
                                    placeholder="What do you want to listen to?"
                                />
                            </label>
                            <i
                                onClick={() => setSearchParams("")}
                                className={`fa-solid fa-xmark ${!searchParams ? "clear-sear-hidden" : "clear-search"}`}></i>
                        </div>
                    </form>
                </div>
                <div>
                    {!user.profile_image ?
                        <i
                            onClick={() => setMenu(!menu)}
                            className="general-nav-profile-no-image fa-regular fa-user"></i>
                        :
                        <img
                            onClick={() => setMenu(!menu)}
                            className="general-nav-profile-image"
                            src={user.profile_image} />
                    }
                    <div ref={profileRef}>
                        {menu &&
                            <div className='navbar-general-profile-options'>
                                <div onClick={() => history.push(`/user/${user.username}`)}>Profile</div>
                                <div>My Reviews</div>
                                <div onClick={handleLogout}>Log out</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {searching &&
                <div className="search-results-wrapper">
                    {filterSongs().length ?
                        <div className="search-songs-results-wrapper">
                            <div>
                                <h2>Top result</h2>
                                {filterSongs().slice(0, 1).map(song => (
                                    <div className="top-result-wrapper">
                                        <img
                                            className="top-result-image"
                                            src={song.album.cover_image} alt={`Song ${song.name} album cover image`} />
                                        <p className="top-result-song-name">{song.name}</p>
                                        <div className="top-result-name-caption">
                                            <p className="">{song.artist_name}</p>
                                            <p className="top-result-caption">Song</p>
                                        </div>
                                        <i onClick={() => handleSongClick(song)} class="fa-solid fa-circle-play top-result-play"></i>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h2>Songs</h2>
                                <div className="search-songs-table">
                                    {filterSongs().slice(0, 4).map(song => (
                                        <div className="search-songs-table-row">
                                            <div>
                                                <img className="song-results-cover-image" src={song.album.cover_image} alt={`Song ${song.name} album cover image`} />
                                                <i onClick={() => handleSongClick(song)} class="fa-solid fa-play search-song-play"></i>
                                            </div>
                                            <div className="song-result-name-artist-wrapper">
                                                <p>{song.name}</p>
                                                <p>{song.artist_name}</p>
                                            </div>
                                            <div>{savedSongsIds.includes(song.id.toString()) ?
                                                <i
                                                    onClick={() => handleUnsaveSongClick(song.id)}
                                                    className="fa-solid fa-heart"></i>
                                                :
                                                <i
                                                    onClick={() => handleSaveSongClick(song.id)}
                                                    className="fa-regular fa-heart search-not-saved-song"></i>
                                            }</div>
                                            <div className="search-song-length">{convertLengthTable(song.length)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        :
                        null}
                    {filterAlbums().length ?
                        <div className="search-results-section">
                            <h2>Albums</h2>
                            <div className="search-results-albums-playlists-wrapper">
                                {filterAlbums().slice(0, 4).map(album => (
                                    <div
                                        onClick={() => history.push(`/album/${album.id}`)}
                                        className="search-album-playlist-wrapper">
                                        <img
                                            className="search-album-playlist-cover-image"
                                            src={album.cover_image}
                                            alt={`Album ${album.name} cover image`}
                                        />
                                        <p>{album.name}</p>
                                        <p>{album.artist}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        null
                    }
                    {filterPlaylists().length ?
                        <div className="search-results-section">
                            <h2>Playlists</h2>
                            <div className="search-results-albums-playlists-wrapper">
                                {filterPlaylists().slice(0, 4).map(playlist => (
                                    <div
                                        onClick={() => history.push(`/playlist/${playlist.id}`)}
                                        className="search-album-playlist-wrapper">
                                        <img
                                            className="search-album-playlist-cover-image"
                                            src={playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"}
                                            alt={`Playlist ${playlist.name} cover image`}
                                        />
                                        <p>{playlist.name}</p>
                                        <p>By {playlist.owner.username}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        null
                    }
                    {filterUsers().length ?
                        <div className="search-results-section">
                            <h2>Profiles</h2>
                            <div className="serarch-users-wrapper">
                                {filterUsers().slice(0, 4).map(user => (
                                    <div
                                        onClick={() => history.push(`/user/${user.username}`)}
                                        className="search-results-users">
                                        <img
                                            className="search-users-images"
                                            src={user.profile_image ? user.profile_image : "https://res.cloudinary.com/djp7wsuit/image/upload/v1688998982/Untitled_design_13_wssosv.png"}
                                            alt={`User ${user.username} profile image`}
                                        />
                                        <p>{user.username}</p>
                                        <p>Profile</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            }
            {searching && !filterSongs().length && !filterAlbums().length && !filterPlaylists().length && !filterUsers().length ?
                <div className="search-page-no-results">
                    <h2>No results found for "{searchParams}"</h2>
                    <h3>Please make sure your words are spelled correctly, or use fewer or different keywords.</h3>
                </div>
                : null}
            {!searching ? <h2 className="search-page-no-results">What can we play for you today?</h2> : null}
        </div>
    )
}