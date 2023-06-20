import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { gatherAllSongs } from "../../store/albums"
import { getOnePlaylist, clearPlaylist, findCurrentUserPlaylists, addSongToPlaylist } from "../../store/playlists"
import { getPlaylistReviews, deletePlaylistReview } from "../../store/reviews"
import { useAudio } from "../../context/Audio"
import SinglePlaylistSearch from "./SinglePlaylistSearch"
import DeletePlaylistModal from "./EditPlaylistModals/DeletePlaylistModal"
import EditPlaylistModal from "./EditPlaylistModals/EditPlaylistModal"
import CreatePlaylistReview from "./PlaylistReviews"
import EditPlaylistReview from "./PlaylistReviews/EditPlaylistReview"
import "./SinglePlaylistPage.css"

export default function SinglePlaylistPage() {
    const dispatch = useDispatch()
    const editPlaylistRef = useRef()
    const history = useHistory()
    const { setModalContent } = useModal()
    const { id } = useParams()
    let playlist = useSelector(state => state.playlists.singlePlaylist)
    let playlistSongs = useSelector(state => state.playlists.singlePlaylist.songs)
    let reviews = useSelector(state => state.reviews.currentPlaylistReviews)
    let user = useSelector(state => state.session.user)
    let reviewsArr = Object.values(reviews)
    let allSongs = useSelector(state => state.albums.songs)
    const [loading, setLoading] = useState(false)
    const [editPlaylistMenuOpen, setEditPlaylistMenuOpen] = useState(false)
    const [playlistEdits, setPlaylistEdits] = useState(false)
    const [editReviewOpen, setEditReviewOpen] = useState(false)
    const { setAudio } = useAudio()
    useEffect(() => {
        dispatch(getOnePlaylist(id)).then(() => setLoading(true))
        dispatch(findCurrentUserPlaylists())
        dispatch(gatherAllSongs())
        dispatch(getPlaylistReviews(id))
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
    
    function filterAndShuffleSongs(songs) {
        let getSongIds = (songs) => {
            let arr = []
            for (let song of songs) {
                arr.push(song.id)
            }
            return arr
        }
        
        let playlistSongsIds = getSongIds(songs)
        let allSongsArr = Object.values(allSongs).filter(song => !playlistSongsIds.includes(song.id))
        
        let songList = []
        let copy = [...allSongsArr]
        while (copy.length) {
            let i = Math.floor(Math.random() * copy.length)
            songList.push(copy[i])
            copy.splice(i, 1)
        }
        return songList.slice(0, 5)
    }
    
    let otherSongs
    let songsArr
    if (playlistSongs) {
        songsArr = Object.values(playlistSongs)
        otherSongs = filterAndShuffleSongs(songsArr)
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

    let handleAddSongClick = async (playlistId, songId) => {
        await dispatch(addSongToPlaylist(playlistId, songId))
    }
    
    let checkUser = () => {
        for (let rev of reviewsArr) {
            if (rev.user.id === user.id) {
                return true
            }
        }
        return false
    }
    
    let deleteReview = async (id) => {
        let message = await dispatch(deletePlaylistReview(id))
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
                            {playlist.owner?.profile_image ?
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
                                        // sSongHoverOff()}
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <SinglePlaylistSearch />
                }
                {playlist.owner.id === user.id ?
                    <div>
                        <h3 className="playlist-reccommended-songs">Recommended</h3>
                        <div>
                            <table className="single-playlist-add-songs-table">
                                <tbody className="single-playlist-add-songs-body">
                                    {otherSongs.map(song => (
                                        <tr>
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
                                            <td><button onClick={() => handleAddSongClick(playlist.id, song.id)}>Add</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : null}
                {reviewsArr.length ?
                    <div>
                        <h3 className="playlist-reccommended-songs">Reviews</h3>
                        <div>
                            {reviewsArr.map(review => (
                                <div>
                                    <p>{review.user.username}</p>
                                    <p>{review.stars}</p>
                                    <p>{review.review}</p>
                                    {review.user.id === user.id ? <div>
                                        <button onClick={() => setEditReviewOpen(true)}>Edit</button>
                                        <button onClick={() => deleteReview(review.id)}>Delete</button>
                                        {editReviewOpen ?
                                            <EditPlaylistReview review={review} reviewMenuOpen={(e) => setEditReviewOpen(e)}/>
                                            :
                                            null}
                                    </div>
                                        : null
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    : null
                }
                {playlist.owner.id != user.id && !checkUser() ?
                    <CreatePlaylistReview playlist={playlist} /> : null}
            </div>
        </div>
    )
}