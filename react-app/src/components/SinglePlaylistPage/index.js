import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOnePlaylist } from "../../store/playlists"

export default function SinglePlaylistPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    let playlist = useSelector(state => state.playlists.singlePlaylist)
    let playlistSongs = useSelector(state => state.playlists.singlePlaylist.songs)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        dispatch(getOnePlaylist(id)).then(() => setLoading(true))
    }, [dispatch])
    
    if (!loading) return <h1>Loading</h1>
    let songsArr = Object.values(playlistSongs)

    // let convertLength = () => {
        
    // }

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
                {/* {songsArr.length ?  */}
                <div>
                    <div>
                        <img></img>
                    </div>
                    <div>
                        <p>{playlist.owner.username}</p>
                    </div>
                    <i class="fa-solid fa-circle"></i>
                    <div>
                        <p>{`${songsArr.length} songs,`}</p>
                    </div>
                    <div>

                    </div>
                </div>
                {/* : null
            } */}
            </div>
        </div>
    )
}