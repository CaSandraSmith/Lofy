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
    const { closeModal } = useModal()

    let handleSubmit = async (e) => {
        console.log("helloooooo")
        e.preventDefault()

        let data = {
            name,
            description: desc
        }
        console.log("DATA", data)
        let updatedPlaylist = await dispatch(updatePlaylist(playlist.id, data))

        if (updatedPlaylist.errors) {
            return playlist
        } else {
            setter(true)
            closeModal()
            // history.push(`/playlist/${playlist.id}`)
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
                        {/* <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    /> */}
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