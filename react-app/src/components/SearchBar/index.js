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
    const [searchParams, setSearchParams] = useState(false)
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

    }

    let filterPlaylists = () => {
        
    }

    let filterAlbums = () => {
        
    }

    let filterSongs = () => {
        
    }

    console.log("search params", searchParams)

    return (
        <div>
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
            <div>

            </div>
        </div>
    )
}