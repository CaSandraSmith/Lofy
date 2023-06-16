export default function DeletePlaylistModal({playlist}) {
    return (
        <div>
            <p>Delete from Library</p>
            <p>This will delete {playlist.name} from Your Library.</p>
            <div>
                <button>Cancel</button>
                <button>Delete</button>
            </div>
        </div>
    )
}