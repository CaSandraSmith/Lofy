import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { deleteUserPlaylist } from "../../../store/playlists"
import { useHistory } from "react-router-dom"
import "./DeletePlaylistModal.css"

export default function DeletePlaylistModal({playlist}) {
    const { closeModal } = useModal()
    const history = useHistory()
    const dispatch = useDispatch()
    
    let onClick = async () => {
        let message = await dispatch(deleteUserPlaylist(playlist.id)).then(() => history.push("/home")).then(() => closeModal()).catch((errors) => errors)
        if (message) {
            return message
        }
    }

    return (
        <div className="delete-playlist-modal">
            <p className="delete-playlist-title">Delete from Library?</p>
            <p className="delete-playlist-caption">This will delete <span>{playlist.name}</span> from Your Library.</p>
            <div className="delete-playlist-buttons">
                <button onClick={() => closeModal()}>Cancel</button>
                <button onClick={onClick}>Delete</button>
            </div>
        </div>
    )
}