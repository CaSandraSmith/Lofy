import { useSelector, useDispatch } from "react-redux"
import { logout } from '../../../store/session';
import "./GeneralNav.css"
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function GeneralNav() {
    const dispatch = useDispatch()
    const history = useHistory()
    let user = useSelector(state => state.session.user)
    const [menu, setMenu] = useState(false)
    const profileRef = useRef()

    useEffect(() => {
        if (!menu || !user) return;

        const closeMenu = (e) => {
            if (!profileRef.current?.contains(e.target)) {
                setMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [menu]);

    let handleLogout = async () => {
        setMenu(false)
        history.push("/")
        dispatch(logout())
    }

    return (
        <div className="general-nav" >
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
            <div ref={profileRef}>
                {menu &&
                    <div className='navbar-general-profile-options'>
                        <div onClick={() => history.push(`/user/${user.username}`)}>Profile</div>
                        <div onClick={() => history.push("/myreviews")}>My Reviews</div>
                        <div onClick={handleLogout}>Log out</div>
                    </div>
                }
            </div>
        </div>
    )
}