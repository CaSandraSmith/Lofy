import { useSelector, useDispatch } from "react-redux"
import { logout } from '../../store/session';
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gatherAllAlbums, gatherAllSongs } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllUsers } from "../../store/session";
import "./SearchBar.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const history = useHistory()
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

    let convertLength = () => {
        let length = 0
        for (let song of songsArr) {
            length += song.length
        }
        return `${Math.floor(length / 60)} min ${length % 60} sec`
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
                        :
                        null}
                </div> :
                <h2 className="search-page-no-results">What do you want to listen to?</h2>
            }
        </div>
    )
}