import { useParams, useHistory } from "react-router-dom"
import { gatherAllAlbums } from "../../store/albums"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useAudio } from "../../context/Audio"

export default function SingleAlbumPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { setAudio } = useAudio()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(gatherAllAlbums()).then(() => setLoading(true))
    }, [dispatch])

    
    let albums = useSelector(state => state.albums.albums)
    let album = useSelector(state => state.albums.albums[id])

    if (!loading) return <h1>Loading</h1>
    
    let artistAlbums = Object.values(albums).filter(singleAlbum => singleAlbum.artist === album.artist).slice(0, 4)
    let songsArr = Object.values(album.songs)

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

    return (
        <div>
            <div>
                <div>
                    <img src={album.cover_image} alt={`${album.name} cover image`} />
                </div>
                <div>
                    <p>Album</p>
                    <h1>{album.name}</h1>
                </div>
                <div>
                    <div>
                        <p>{album.artist}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-circle"></i>
                        <div>
                            <p>{`${songsArr.length} songs,`}</p>
                        </div>
                        <div>
                            {convertLength()}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="single-playlist-options">
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th><i className="fa-regular fa-clock"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {songsArr.map((song, i) => (
                                    <tr onClick={() => setAudio(song.audio)}>
                                        <td>{i + 1}</td>
                                        <td>{song.name}</td>
                                        <td>{convertLengthTable(song.length)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <h2>More by {album.artist}</h2>
                <div>
                    {artistAlbums.map(album => (
                        <div
                            onClick={() => history.push(`/album/${album.id}`)}
                        >
                            <img src={album.cover_image} alt={`${album.name} cover image`} />
                            <p>{album.name}</p>
                            <p>{album.artist}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}