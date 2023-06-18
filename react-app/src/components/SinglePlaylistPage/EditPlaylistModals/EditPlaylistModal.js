import { useEffect, useState } from "react"
import { updatePlaylist } from "../../../store/playlists"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import "./EditPlaylistModals.css"

export default function EditPlaylistModal({ playlist, value, setter }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [image, setImage] = useState("")
    const [name, setName] = useState(playlist.name)
    const [desc, setDesc] = useState(playlist.description ? playlist.description : "")
    const [previewImage, setPreviewImage] = useState(playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png")
    const [loadingImage, setLoadingImage] = useState(false)
    // const [submit, setSubmit] = useState(false)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    useEffect(() => {
        if (image) {
            let prev = URL.createObjectURL(image)
            setPreviewImage(prev)
            return () => {
                URL.revokeObjectURL(prev)
            }
        }
    }, [image])

    let handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        let valErrors = {}
        if (!name) {
            valErrors.name = "Name is required"
        }
        if (name.length > 100) {
            valErrors.name = "Name must be less that 100 characters"
        }
        if (desc.length > 300) {
            valErrors.desc = "Description must be less than 300 characters"
        }
        if (Object.values(valErrors).length) {
            setErrors(valErrors)
            return
        }

        const playlistData = new FormData()

        if (image) playlistData.append("cover_image", image)
        playlistData.append("name", name)
        playlistData.append("description", desc)
        setLoadingImage(true)

        let updatedPlaylist = await dispatch(updatePlaylist(playlist.id, playlistData))

        if (updatedPlaylist.errors) {
            setErrors(updatedPlaylist)
            return
        } else {
            setLoadingImage(false)
            closeModal()
        }
    }



    // *TO DO: add visible validation errors to form
    return (
        <div className="edit-playlist-modal">
            <form onSubmit={handleSubmit}>
                <div className="edit-playlist-title">
                    <h3>Edit details</h3>
                    <i onClick={() => closeModal()} class="fa-solid fa-xmark close-edit-modal"></i>
                </div>
                <div>
                    <div>
                        {name.length === 0 ?
                            <div className="edit-playlist-no-name-error">
                                <i className="fa-solid fa-exclamation"></i>
                                <p>Playlist name is required.</p>
                            </div>
                            : null}
                        {loadingImage && image ? <p className="loading-image-message">Wait while your image is loaded</p> : null}
                    </div>
                    <div className="edit-playlist-details">
                        <label className="edit-playlist-cover-image">
                            <input
                                className="edit-playlist-cover-image-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <img className="edit-playlist-cover-image-preview"
                                src={previewImage}
                            />
                        </label>
                        <div className="edit-playlist-nam-and-desc">
                            <label className="edit-name-input-wrapper">
                                <input
                                    className="edit-name-input"
                                    type="text"
                                    value={name}
                                    placholder="Add a name"
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={100}
                                />
                            </label>
                            <label>
                                <textarea
                                    className="edit-desc-input"
                                    type="text"
                                    value={desc}
                                    placholder="Add an optional description"
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <button className="save-playlist-edits-button" disabled={name.length ? false : true}>Save</button>
            </form>
        </div>
    )
}