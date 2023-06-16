import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOnePlaylist } from "../../store/playlists"
import SinglePlaylistSearch from "./SinglePlaylistSearch"
import "./SinglePlaylistPage.css"

export default function SinglePlaylistPage() {
    const dispatch = useDispatch()
    const editPlaylistRef = useRef()
    const { id } = useParams()
    let playlist = useSelector(state => state.playlists.singlePlaylist)
    let playlistSongs = useSelector(state => state.playlists.singlePlaylist.songs)
    const [loading, setLoading] = useState(false)
    const [editPlaylistMenuOpen, setEditPlaylistMenuOpen] = useState(false)


    useEffect(() => {
        dispatch(getOnePlaylist(id)).then(() => setLoading(true))
    }, [dispatch, id])

    useEffect(() => {
        if (!editPlaylistMenuOpen) return;

        const closeMenu = (e) => {
            if (!editPlaylistRef.current.contains(e.target)) {
                setEditPlaylistMenuOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [editPlaylistMenuOpen]);


    if (!loading) return <h1>Loading</h1>
    let songsArr = Object.values(playlistSongs)

    let convertLength = () => {
        let length = 0
        for (let song of songsArr) {
            length += song.length
        }
        return `${Math.floor(length / 60)} min ${length % 60} sec`
    }

    let convertLengthTable = (length) => {
        let minutes = Math.floor(length / 60)
        let seconds = length % 60
        let sec = seconds.toString()
        if (sec.length < 2) {
            sec = sec + "0"
        }
        return `${minutes}:${sec}`
    }

    let editMenuClassName = editPlaylistMenuOpen ? "edit-playlist-menu" : "hidden edit-playlist-menu"

    return (
        <div className="single-playlist-page">
            <div>
                <div>
                    <img></img>
                </div>
                <div>
                    <p>Playlist</p>
                    <h1>{playlist.name}</h1>
                </div>
                <div>
                    <div>
                        <img></img>
                    </div>
                    <div>
                        <p>{playlist.owner.username}</p>
                    </div>
                    {songsArr.length ?
                        <div>
                            <i class="fa-solid fa-circle"></i>
                            <div>
                                <p>{`${songsArr.length} songs,`}</p>
                            </div>
                            <div>
                                {convertLength()}
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
            <div>
                <div className="single-playlist-options">
                    {songsArr.length ? <i className="fa-solid fa-play"></i> : null}
                    <i className="fa-solid fa-ellipsis" onClick={() => setEditPlaylistMenuOpen(!editPlaylistMenuOpen)}></i>
                    <div className={editMenuClassName} ref={editPlaylistRef}>
                        <p>Edit Details</p>
                        <p>Delete</p>
                    </div>
                </div>
                {songsArr.length ?
                    <div>
                        <table>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Album</th>
                                <th><i className="fa-regular fa-clock"></i></th>
                            </tr>
                            {songsArr.map((song, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div>
                                            <img></img>
                                            <div>
                                                <p>{song.name}</p>
                                                <p>{song.artist_name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{song.album.name}</td>
                                    <td>{convertLengthTable(song.length)}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    :
                    <SinglePlaylistSearch />
                }
            </div>
        </div>
    )
}