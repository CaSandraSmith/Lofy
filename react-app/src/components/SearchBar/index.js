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
        // let arr = [...songsArr.slice(i), ...songsArr.slice(0, i)]
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
                    <form>
                        <div>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <label>
                                <input
                                    type="search"
                                    value={searchParams}
                                    onChange={(e) => setSearchParams(e.target.value)}
                                    placeholder="What do you want to listen to?"
                                />
                            </label>
                        </div>
                    </form>
                </div>
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
                            <div onClick={handleLogout}>Log out</div>
                        </div>
                    }
                </div>
            </div>
            {searching ?
                <div className="search-results-wrapper">
                    {filterSongs().length ?
                        <div>
                            <div>
                                <h2>Top result</h2>
                                {filterSongs().slice(0, 1).map(song => (
                                    <div>
                                        <img src={song.album.cover_image} alt={`Song ${song.name} album cover image`} />
                                        <p>{song.name}</p>
                                        <div>
                                            <p>{song.artist_name}</p>
                                            <p>Song</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h2>Songs</h2>
                                {filterSongs().slice(0, 5).map(song => (
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src={song.album.cover_image} alt={`Song ${song.name} album cover image`} />
                                                </td>
                                                <td>
                                                    <div>
                                                        <p>{song.name}</p>
                                                        <p>{song.artist_name}</p>
                                                    </div>
                                                </td>
                                                <td>{savedSongsIds.includes(song.id.toString()) ?
                                                    <i
                                                        onClick={() => handleUnsaveSongClick(song.id)}
                                                        className="fa-solid fa-heart"></i>
                                                    :
                                                    <i
                                                        onClick={() => handleSaveSongClick(song.id)}
                                                        className="fa-regular fa-heart"></i>
                                                }</td>
                                                <td className="single-playlist-song-length">{convertLengthTable(song.length)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))}
                            </div>
                        </div>
                        :
                    <h2>No songs found with that name</h2>}
                    {filterAlbums().length ?
                    <div>
                        <h2>Albums</h2>
                        <div>
                            {filterAlbums().slice(0, 4).map(album => (
                                <div>
                                    <img 
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
                    <h2>No albums found with that name</h2>
                    }
                </div> :
                <h2 className="search-page-no-results">What do you want to listen to?</h2>
            }
        </div>
    )
}