import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'


export default function CurrentUserProfile() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const userPlaylists = useSelector(state => state.playlists.currentUserPlaylists)
    const userPlaylistsArr = Object.values(userPlaylists)
    const userFollowers = useSelector(state => state.session.user.followers)
    const userFollowersArr = Object.values(userFollowers)
    const userFollowing = useSelector(state => state.session.user.following)
    const userFollowingArr = Object.values(userFollowing)


    return (
        <div className="user-profiles-wrapper">
            <div className="user-profiles-header">
                <div>
                    <img
                        className="user-profile-main-image"
                        src={user.profile_image ? user.profile_image : "https://res.cloudinary.com/djp7wsuit/image/upload/v1688998982/Untitled_design_13_wssosv.png"}
                        alt={`User ${user.username} profile image`} />
                </div>
                <div>
                    <div>
                        <p className="user-profile-caption">Profile</p>
                        <h1 className="user-profile-name">{user.username}</h1>
                    </div>
                    <div className="user-profile-details">
                        <p>{userPlaylistsArr.length} Playlists</p>
                        <i class="fa-solid fa-circle"></i>
                        <p>{userFollowersArr.length === 1 ? "1 Follower" : `${userFollowersArr.length} Followers`}</p>
                        <i class="fa-solid fa-circle"></i>
                        <p>{userFollowingArr.length} Following</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="user-profile-section">
                    <h2>Playlists</h2>
                    {userPlaylistsArr.length ?
                        <div className="user-profile-playlists-wrapper">
                            {userPlaylistsArr.map(playlist => (
                                <div className="individual-profile-instance-wrappers" onClick={() => history.push(`/playlist/${playlist.id}`)}>
                                    <img
                                        className="user-profile-playlists-cover-image"
                                        src={playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"}
                                        alt={`Playlist ${playlist.name} cover image`}
                                    />
                                    <p className="user-profile-playlist-name">{playlist.name}</p>
                                </div>
                            ))}
                        </div>
                        : <h3>No Playlists Yet <i class="fa-regular fa-face-sad-cry"></i></h3>}
                </div>
                <div className="user-profile-section">
                    <h2>Followers</h2>
                    {userFollowersArr.length ?
                        <div className="user-profile-followers-following-wrapper">
                            {userFollowersArr.map(user => (
                                <div className="individual-profile-instance-wrappers" onClick={() => history.push(`/user/${user.username}`)}>
                                    <img
                                        className="other-users-profile-images"
                                        src={user.profile_image ? user.profile_image : "https://res.cloudinary.com/djp7wsuit/image/upload/v1688998982/Untitled_design_13_wssosv.png"}
                                        alt={`User ${user.username} profile image`}
                                    />
                                    <p className="user-profile-follows-name">{user.username}</p>
                                    <p>Profile</p>
                                </div>
                            ))}
                        </div>
                        : <h3>No Followers Yet <i class="fa-regular fa-face-sad-cry"></i></h3>
                    }
                </div>
                <div className="user-profile-section">
                    <h2>Following</h2>
                    {userFollowingArr.length ?
                        <div className="user-profile-followers-following-wrapper">
                            {userFollowingArr.map(user => (
                                <div className="individual-profile-instance-wrappers" onClick={() => history.push(`/user/${user.username}`)}>
                                    <img
                                        className="other-users-profile-images"
                                        src={user.profile_image ? user.profile_image : "https://res.cloudinary.com/djp7wsuit/image/upload/v1688998982/Untitled_design_13_wssosv.png"}
                                        alt={`User ${user.username} profile image`}
                                    />
                                    <p className="user-profile-follows-name">{user.username}</p>
                                    <p>Profile</p>
                                </div>
                            ))}
                        </div>
                        :
                        <h3>You're not following any users! <i class="fa-regular fa-face-sad-cry"></i></h3>
                    }
                </div>
            </div>
        </div>
    )
}