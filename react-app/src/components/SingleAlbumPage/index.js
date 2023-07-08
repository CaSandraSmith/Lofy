import { useParams, useHistory } from "react-router-dom"
import { gatherAllAlbums, getAllUserSavedSongs, removeSavedSong, createSavedSong, getAllUsersSavedAlbums, removeSavedAlbum, createSavedAlbum } from "../../store/albums"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useAudio } from "../../context/Audio"
import "./SingleAlbumPage.css"

export default function SingleAlbumPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { setPlaying, setQueue, setSong } = useAudio()
    const [loading, setLoading] = useState(false)
    const [hoverSongDiv, setHoverSongDiv] = useState(0)

    useEffect(() => {
        dispatch(gatherAllAlbums()).then(() => setLoading(true))
        dispatch(getAllUserSavedSongs())
        dispatch(getAllUsersSavedAlbums())
    }, [dispatch])


    let albums = useSelector(state => state.albums.albums)
    let album = useSelector(state => state.albums.albums[id])
    let artistAlbums = Object.values(albums).filter(singleAlbum => singleAlbum.artist === album.artist).slice(0, 4)
    let songsArr
    const savedSongs = useSelector(state => state.albums.savedSongs)
    let savedSongsIds = Object.keys(savedSongs)
    const savedAlbums = useSelector(state => state.albums.savedAlbums)
    let savedAlbumsIds = Object.keys(savedAlbums)

    if (!loading) return <h1>Loading</h1>

    if (album.songs) {
        songsArr = Object.values(album.songs)
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

    let handleSongClick = (song, i) => {
        setPlaying(true)
        setSong(song)
        // let arr = [...songsArr.slice(i), ...songsArr.slice(0, i)]
        setQueue(songsArr)
    }

    let handleSaveSongClick = async (songId) => {
        dispatch(createSavedSong(songId))
    }

    let handleUnsaveSongClick = async (songId) => {
        dispatch(removeSavedSong(songId))
    }

    let handleUnsaveAlbumClick = async (albumId) => {
        dispatch(removeSavedAlbum(albumId))
    }

    let handleSaveAlbumClick = async (albumId) => {
        dispatch(createSavedAlbum(albumId))
    }

    return (
        <div className="single-playlist-page">
            <div className="single-playlist-header">
                <div>
                    <img
                        className="single-playlist-cover-image"
                        src={album.cover_image}
                        alt={`${album.name} cover image`} />
                </div>
                <div className="single-playlist-header-text">
                    <div>
                        <p>Album</p>
                        <h1 className="single-playlist-name">{album.name}</h1>
                    </div>
                    <div className="single-album-artist-info">
                        <div>
                            <p>{album.artist}</p>
                        </div>
                        <div className="single-profile-with-songs">
                            <i class="fa-solid fa-circle single-album-clock"></i>
                            <div>
                                <p>{`${songsArr.length} songs,`}</p>
                            </div>
                            <div>
                                {convertLength()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="single-playlist-options">
                    <div className="single-album-options">
                        <i
                            className="fa-solid fa-play play-playlist-button"
                            onClick={() => handleSongClick(songsArr[0], 0)}
                        >
                        </i>
                        {savedAlbumsIds.includes(album.id.toString()) ?
                            <i
                                onClick={() => handleUnsaveAlbumClick(album.id)}
                                className="fa-solid fa-heart"></i>
                            :
                            <i
                                onClick={() => handleSaveAlbumClick(album.id)}
                                className="fa-regular fa-heart"></i>
                        }
                    </div>
                    <div>
                        <table className="single-playlist-songs-table">
                            <thead>
                                <tr className="single-album-table-headers">
                                    <th>#</th>
                                    <th>Title</th>
                                    <th></th>
                                    <th><i className="fa-regular fa-clock"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {songsArr.map((song, i) => (
                                    <tr
                                        onMouseEnter={() => setHoverSongDiv(song.id)}
                                        onMouseLeave={() => setHoverSongDiv(0)}
                                        className="playlist-song-row album-song-row"
                                    >
                                        <td>
                                            {hoverSongDiv === song.id ?
                                                <i className="fa-solid fa-play play-song-icon" onClick={() => handleSongClick(song, i)}></i>
                                                :
                                                i + 1
                                            }
                                        </td>
                                        <td>{song.name}</td>
                                        <td className="album-song-heart-icon">{savedSongsIds.includes(song.id.toString()) ?
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <h2>More by {album.artist}</h2>
                <div className="artist-other-albums-wrapper">
                    {artistAlbums.map(album => (
                        <div
                            className="artist-albums-wrapper"
                            onClick={() => history.push(`/album/${album.id}`)}
                        >
                            <img
                                className="artist-albums-cover-image"
                                src={album.cover_image} alt={`${album.name} cover image`} />
                            <p>{album.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}