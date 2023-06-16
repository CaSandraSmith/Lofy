import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { deleteUserPlaylist } from "../../../store/playlists"
import { useHistory } from "react-router-dom"

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
        <div>
            <p>Delete from Library</p>
            <p>This will delete {playlist.name} from Your Library.</p>
            <div>
                <button onClick={() => closeModal()}>Cancel</button>
                <button onClick={onClick}>Delete</button>
            </div>
        </div>
    )
}