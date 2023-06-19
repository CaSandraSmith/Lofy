import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { getOnePlaylist, clearPlaylist, findCurrentUserPlaylists } from "../../store/playlists"
import { useAudio } from "../../context/Audio"
import SinglePlaylistSearch from "./SinglePlaylistSearch"
import DeletePlaylistModal from "./EditPlaylistModals/DeletePlaylistModal"
import EditPlaylistModal from "./EditPlaylistModals/EditPlaylistModal"
import "./SinglePlaylistPage.css"

export default function SinglePlaylistPage() {
    const dispatch = useDispatch()
    const editPlaylistRef = useRef()
    const history = useHistory()
    const { setModalContent } = useModal()
    const { id } = useParams()
    let playlist = useSelector(state => state.playlists.singlePlaylist)
    let playlistSongs = useSelector(state => state.playlists.singlePlaylist.songs)
    let userPlaylists = useSelector(state => state.playlists.currentUserPlaylists)
    const [loading, setLoading] = useState(false)
    const [editPlaylistMenuOpen, setEditPlaylistMenuOpen] = useState(false)
    const [playlistEdits, setPlaylistEdits] = useState(false)
    const [hoverSongDiv, setHoverSongDiv] = useState("")
    const [hoverSong, setHoverSong] = useState(false)
    const { setAudio } = useAudio()

    useEffect(() => {
        dispatch(getOnePlaylist(id)).then(() => setLoading(true))
        dispatch(findCurrentUserPlaylists())
    }, [dispatch, id, playlistEdits])

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

    let songsArr
    if (playlistSongs) {
        songsArr = Object.values(playlistSongs)
    }

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

    function editPlaylistClick() {
        setModalContent(<EditPlaylistModal playlist={playlist} value={playlistEdits} setter={(x) => setPlaylistEdits(x)} />)
        setEditPlaylistMenuOpen(false)
    }

    function deletePlaylistClick() {
        setModalContent(<DeletePlaylistModal playlist={playlist} />)
        setEditPlaylistMenuOpen(false)
    }

    let handleSongHover = (id) => {
        setHoverSong(true)
        setHoverSongDiv(id)
    }

    let handleSongHoverOff = () => {
        setHoverSong(false)
        setHoverSongDiv("")
    }

    let editMenuClassName = editPlaylistMenuOpen ? "edit-playlist-menu" : "hidden edit-playlist-menu"

    return (
        <div className="single-playlist-page">
            <div className="single-playlist-header">
                <div>
                    <img className="single-playlist-cover-image" src={playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"} />
                </div>
                <div className="single-playlist-header-text">
                    <div>
                        <p>Playlist</p>
                        <h1>{playlist.name}</h1>
                        <p>{playlist.description}</p>
                    </div>
                    <div className="single-playlist-header-owner-text">
                        <div>
                            {playlist.owner.profile_image ?
                                <img className="playlist-profile-image" src={playlist.owner.profile_image} alt={`user ${playlist.owner.username}'s profile imafe`} />
                                : <i className="fa-regular fa-user single-playlist-no-image"></i>
                            }
                        </div>
                        <div>
                            <p>{playlist.owner.username}</p>
                        </div>
                        {songsArr.length ?
                            <div className="single-profile-with-songs">
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
            </div>
            <div>
                <div className="single-playlist-options">
                    {songsArr.length ? <i className="fa-solid fa-play"></i> : null}
                    <i className="fa-solid fa-ellipsis" onClick={() => setEditPlaylistMenuOpen(!editPlaylistMenuOpen)}></i>
                    <div className={editMenuClassName} ref={editPlaylistRef}>
                        <p onClick={editPlaylistClick}>Edit Details</p>
                        <p onClick={deletePlaylistClick}>Delete</p>
                    </div>
                </div>
                {songsArr.length ?
                    <div>
                        <table className="single-playlist-songs-table">
                            <thead>
                                <tr className="single-playlist-table-headers">
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Album</th>
                                    <th><i className="fa-regular fa-clock"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {songsArr.map((song, i) => (
                                    <tr
                                        onMouseOver={() => handleSongHover(song.id)}
                                        onMouseLeave={() => handleSongHoverOff()}
                                        onClick={() => setAudio(song.audio)}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <div className="single-playlist-title">
                                                <img
                                                    className="single-playlist-album-cover-image"
                                                    src={song.album.cover_image}
                                                    alt={`Album ${song.album.cover_image}'s cover image`} />
                                                <div>
                                                    <p>{song.name}</p>
                                                    <p>{song.artist_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{song.album.name}</td>
                                        <td className="single-playlist-song-length">{convertLengthTable(song.length)}</td>
                                        <td>
                                            {hoverSong && hoverSongDiv === song.id ?
                                                <div>
                                                    <i className="fa-solid fa-ellipsis " />

                                                </div>
                                                : null
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <SinglePlaylistSearch />
                }
            </div>
        </div>
    )
}