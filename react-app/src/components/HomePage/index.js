import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { gatherAllAlbums } from "../../store/albums"
import { findCurrentUserPlaylists, getAllPlaylists } from "../../store/playlists"
import LoginFormModal from "../LoginFormModal"
import { useModal } from "../../context/Modal";
import "./HomePage.css"

export default function HomePage() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(gatherAllAlbums())
        dispatch(findCurrentUserPlaylists())
        dispatch(getAllPlaylists())
    }, [dispatch])

    const user = useSelector(state => state.session.user)
    const albums = useSelector(state => state.albums.albums)
    let albumsArr = Object.values(albums).slice(0, 4)
    const playlists = useSelector(state => state.playlists.currentUserPlaylists)
    const userPlaylistArr = Object.values(playlists).slice(0, 6)
    let allPlaylists = useSelector(state => state.playlists.allPlaylists)
    let otherUserPlaylists = Object.values(allPlaylists).filter(playlist => playlist.owner.id != user.id).slice(0, 4)
    const { setModalContent } = useModal()

    let checkTime = () => {
        let date = new Date()
        let hour = date.getHours()

        if (hour <= 4) {
            return "Good night"
        } else if (hour > 4 && hour < 12) {
            return "Good morning"
        } else if (hour >= 12 && hour < 17) {
            return "Good afternoon"
        } else if (hour >= 17 && hour < 20) {
            return "Good evening"
        } else return "Good night"
    }

    return (
        <div className="home-page-wrapper">
            <h1 className="home-time-title">{checkTime()}</h1>
            <div className="home-page-user-playlists">
                <div
                    className="home-page-user-playlists-wrapper"
                    onClick={() => history.push(`/collection/tracks`)}
                >
                    <img className="home-page-user-playlists-cover-image" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1688505274/Untitled_design_12_gksdh3.png" alt="liked songs playlist cover" />
                    <p>Liked Songs</p>
                </div>
                {userPlaylistArr.map(playlist => (
                    <div
                        className="home-page-user-playlists-wrapper"
                        onClick={() => history.push(`/playlist/${playlist.id}`)}
                    >
                        <img className="home-page-user-playlists-cover-image" src={playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"} alt={`Playlist ${playlist.name} cover image`} />
                        <p>{playlist.name}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2 className="home-section-headers">Checkout out these albums</h2>
                <div className="home-all-albums-wrapper">
                    {albumsArr.map(album => (
                        <div
                            className="home-single-album-wrapper"
                            onClick={() => history.push(`/album/${album.id}`)}
                        >
                            <img className="home-all-albums-cover-image" src={album.cover_image} alt={`${album.name} cover image`} />
                            <p>{album.name}</p>
                            <p className="home-playlist-description">{album.artist}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="home-section-headers">More lofy collections</h2>
                <div className="home-all-albums-wrapper">
                    {otherUserPlaylists.map(playlist => (
                        <div onClick={() => history.push(`/playlist/${playlist.id}`)} className="home-single-album-wrapper">
                            <img
                                className="home-all-albums-cover-image"
                                src={
                                    playlist.cover_image ? playlist.cover_image :
                                        "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"}
                                alt={`Playlist ${playlist.name} cover image`
                                } />
                            <p>{playlist.name}</p>
                            <p className="home-playlist-description">{playlist.description ? playlist.description : null}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}