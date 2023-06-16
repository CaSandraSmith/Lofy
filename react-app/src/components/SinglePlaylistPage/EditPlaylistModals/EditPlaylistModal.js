import { useState } from "react"

export default function EditPlaylistModal({ playlist }) {
    const [image, setImage] = useState(playlist.cover_image)
    const [name, setName] = useState(playlist.name)
    const [desc, setDesc] = useState(playlist.description ? playlist.description : null)

    console.log(name.length)
    return (
        <div>
            <form>
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