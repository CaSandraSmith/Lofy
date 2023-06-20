import "./SplashPage.css"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

export default function SplashPage() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)


    return (
        <div className="whole-splash-page">
            <div className="circle-one"></div>
            <div className="circle-two"></div>
            <div className="circle-three"></div>
            <div className="slash-page-text">
                <h1 className="splash-slogan">Maintain chill vibes today with Lofy's collection of lofi music</h1>
                {user ?
                    <button onClick={() => history.push("/home")}>OPEN MEDIA PLAYER</button> :
                    <button onClick={() => history.push("/signup")}>GET LOFY FREE</button>
                }
            </div>
        </div>
    )
}