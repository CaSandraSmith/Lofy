import { useSelector, useDispatch } from "react-redux"
import { logout } from '../../../store/session';
import "./GeneralNav.css"
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function GeneralNav() {
    const dispatch = useDispatch()
    const history = useHistory()
    let user = useSelector(state => state.session.user)
	const [menu, setMenu] = useState(false)

    let handleLogout = async () => {
        history.push("/")
		dispatch(logout())
	}

    return (
        <div className="general-nav">
            {!user.profile_image ?
                <i 
                onClick={() => setMenu(!menu)}
                className="general-nav-profile-no-image fa-regular fa-user"></i>
                :
                <img 
                onClick={() => setMenu(!menu)}
                className="general-nav-profile-image"
                src={user.profile_image} />
            }
            {menu && 
            <div className='navbar-general-profile-options'>
                <div onClick={() => alert("Feature coming soon")}>Account</div>
                <div onClick={handleLogout}>Log out</div>
            </div>
            }
        </div>
    )
}