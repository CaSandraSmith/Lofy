import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUserSavedSongs, removeSavedSong } from "../../../store/albums"
import { useAudio } from "../../../context/Audio"
import SinglePlaylistSearch from "../SinglePlaylistSearch"
import './LikedSongsPlaylist.css'
import { useHistory } from "react-router-dom"

export default function LikedSongsPlaylist() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [hoverSongDiv, setHoverSongDiv] = useState(0)
    const { setPlaying, setQueue, setSong } = useAudio()
    const heartRef = useRef()

    useEffect(() => {
        dispatch(getAllUserSavedSongs())
    }, [dispatch])

    const savedSongs = useSelector(state => state.albums.savedSongs)
    const currentUser = useSelector(state => state.session.user)
    const savedSongsArr = Object.values(savedSongs)

    let convertLength = () => {
        let length = 0
        for (let song of savedSongsArr) {
            length += song.length
        }
        return `${Math.floor(length / 60)} min ${length % 60} sec`
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

    let handleSongClick = (song, e) => {
        setPlaying(true)
        setSong(song)
        setQueue(savedSongsArr)
    }

    let removeSongFromLiked = async (songId) => {
        dispatch(removeSavedSong(songId))
    }

    return (
        <div className="single-playlist-page">
            <div className="single-playlist-header">
                <div>
                    <img className="single-playlist-cover-image"
                        src="https://res.cloudinary.com/djp7wsuit/image/upload/v1688505274/Untitled_design_12_gksdh3.png"
                        alt="white heart with blue gradient background"
                    />
                </div>
                <div className="single-playlist-header-text">
                    <div>
                        <p>Playlist</p>
                        <h1 className="single-playlist-name">Liked Songs</h1>
                    </div>
                    <div className="single-playlist-header-owner-text">
                        <div>
                            {currentUser.profile_image ?
                                <img className="playlist-profile-image" src={currentUser.profile_image} alt="Your profile image" />
                                : <i className="fa-regular fa-user single-playlist-no-image"></i>
                            }
                        </div>
                        <div>
                            <p className="single-playlist-owner-username" onClick={() => history.push(`/user/${currentUser.username}`)}>{currentUser.username}</p>
                        </div>
                        {savedSongsArr.length ?
                            <div className="single-profile-with-songs">
                                <i class="fa-solid fa-circle"></i>
                                <div>
                                    <p>{`${savedSongsArr.length} songs,`}</p>
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
                    <div className="single-playlist-buttons">
                        {savedSongsArr.length ?
                            <i
                                className="fa-solid fa-play play-playlist-button"
                                onClick={() => handleSongClick(savedSongsArr[0], 0)}
                            >
                            </i> : null}
                    </div>
                </div>
                {savedSongsArr.length ?
                    <div>
                        <table className="single-playlist-songs-table">
                            <thead>
                                <tr className="single-playlist-table-headers">
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Album</th>
                                    <th></th>
                                    <th><i className="fa-regular fa-clock"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedSongsArr.map((song, i) => (
                                    <tr
                                        className="playlist-song-row"
                                        onMouseEnter={() => setHoverSongDiv(song.id)}
                                        onMouseLeave={() => setHoverSongDiv(0)}
                                    >
                                        <td>{hoverSongDiv === song.id ?
                                            <i className="fa-solid fa-play play-song-icon" onClick={() => handleSongClick(song, i)}></i>
                                            :
                                            i + 1}</td>
                                        <td>
                                            <div className="single-playlist-title">
                                                <img
                                                    className="single-playlist-album-cover-image"
                                                    src={song.album.cover_image}
                                                    alt={`Album ${song.album.cover_image}'s cover image`} />
                                                <div className="playlist-page-artit-cover-image-description">
                                                    <p>{song.name}</p>
                                                    <p>{song.artist_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="single-playlist-songs-album-name" onClick={() => history.push(`/album/${song.album.id}`)}>{song.album.name}</td>
                                        <td>
                                            <i
                                                className="fa-solid fa-heart"
                                                ref={heartRef}
                                                onClick={() => removeSongFromLiked(song.id)}
                                            ></i>
                                        </td>
                                        <td className="single-playlist-song-length">{convertLengthTable(song.length)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="liked-songs-empty">
                        <h3>Checkout some of our albums or other user's playlists to add songs to your liked songs!</h3>
                    </div>
                    // <SinglePlaylistSearch />
                }
            </div>
        </div>
    )
}