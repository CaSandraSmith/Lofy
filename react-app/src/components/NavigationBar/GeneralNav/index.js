import { useSelector } from "react-redux"
import "./GeneralNav.css"

export default function GeneralNav() {
    let user = useSelector(state => state.session.user)
    return (
        <div className="general-nav">
            {user && !user.profile_image ? 
            <i className="fa-regular fa-user"></i>
            : user && user.profile_image ?
            // <img src="" />
            "Profile" :
            <div>
                <button>Sign up</button>
                <button>Log in</button>
            </div>
            }
        </div>
    )
}