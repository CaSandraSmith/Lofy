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
                        <p>Profile</p>
                        <h1>{user.username}</h1>
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
                <h2>Playlists</h2>
                <div className="user-profile-playlists-wrapper">
                    {userPlaylistsArr.map(playlist => (
                        <div onClick={() => history.push(`/playlist/${playlist.id}`)}>
                            <img
                                className="user-profile-playlists-cover-image"
                                src={playlist.cover_image ? playlist.cover_image : "https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"}
                                alt={`Playlist ${playlist.name} cover image`}
                            />
                            <div>
                                <p>{playlist.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {userFollowersArr.length ? <div>
                    <h2>Followers</h2>
                    <div className="user-profile-followers-following-wrapper">
                        {userFollowersArr.map(user => (
                            <div onClick={() => history.push(`/user/${user.username}`)}>
                                <img
                                className="other-users-profile-images"
                                    src={user.profile_image ? user.profile_image : "https://res.cloudinary.com/djp7wsuit/image/upload/v1688998982/Untitled_design_13_wssosv.png"}
                                    alt={`User ${user.username} profile image`}
                                />
                                <div>
                                    <p>{user.username}</p>
                                    <p>Profile</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> : null}
                {userFollowingArr.length ? <div>
                    <h2>Following</h2>
                    <div className="user-profile-followers-following-wrapper">
                        {userFollowingArr.map(user => (
                            <div onClick={() => history.push(`/user/${user.username}`)}>
                                <img
                                className="other-users-profile-images"
                                    src={user.profile_image ? user.profile_image : "https://res.cloudinary.com/djp7wsuit/image/upload/v1688998982/Untitled_design_13_wssosv.png"}
                                    alt={`User ${user.username} profile image`}
                                />
                                <div>
                                    <p>{user.username}</p>
                                    <p>Profile</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> : null}
            </div>
        </div>
    )
}