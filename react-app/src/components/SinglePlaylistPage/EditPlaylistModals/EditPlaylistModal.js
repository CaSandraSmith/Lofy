import { useState } from "react"
import { updatePlaylist } from "../../../store/playlists"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"

export default function EditPlaylistModal({ playlist, value, setter }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [image, setImage] = useState(playlist.cover_image)
    const [name, setName] = useState(playlist.name)
    const [desc, setDesc] = useState(playlist.description ? playlist.description : "")
    const [errors, setErrors] = useState({})
    // const [submit, setSubmit] = useState(false)
    const { closeModal } = useModal()

    let handleSubmit = async (e) => {
        e.preventDefault()

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

        let data = {
            name,
            description: desc
        }

        let updatedPlaylist = await dispatch(updatePlaylist(playlist.id, data))

        if (updatedPlaylist.errors) {
            return playlist
        } else {
            setter(true)
            closeModal()
        }
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Edit details</h3>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div>
                    {name.length === 0 ? 
                    <div>
                        <i className="fa-solid fa-exclamation"></i>
                        <p>Playlist name is required.</p>
                    </div>
                    : null}
                </div>
                <div>
                    <label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    </label>
                    <div>
                        <label>
                            <input
                                type="text"
                                value={name}
                                placholder="Add a name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            <input
                                type="text"
                                value={desc}
                                placholder="Add an optional description"
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <button>Save</button>
            </form>
        </div>
    )
}