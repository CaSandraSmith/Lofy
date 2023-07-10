import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { getByUsername, clearUser } from "../../store/session"

export default function OtherUserProfile({username}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    console.log("username", username)
    useEffect(() => {
        dispatch(getByUsername(username)).then(() => setLoading(true))
        return (async () => {
            setLoading(false)
            dispatch(clearUser())
        })
    }, [dispatch, username])
    
    const user = useSelector(state => state.session.currentProfile)
    let userPlaylists = useSelector(state => state.session.currentProfile?.playlists)
    let userPlaylistsArr
    const userFollowers = useSelector(state => state.session.currentProfile?.followers)
    let userFollowersArr
    const userFollowing = useSelector(state => state.session.currentProfile?.following)
    let userFollowingArr

    if (!loading) return <h1>Loading</h1>

    if (Object.values(user).length) {
        userPlaylistsArr = Object.values(userPlaylists)
        userFollowersArr = Object.values(userFollowers)
        userFollowingArr = Object.values(userFollowing)
    }

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