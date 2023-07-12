import { useHistory } from "react-router-dom"
import "./PageNotFound.css"

export default function PageNotFound() {
    const history = useHistory()
    return (
        <div className="page-not-found-wrapper">
            <i className="fa-regular fa-face-grin-beam-sweat page-not-found-emoji"></i>
            <h1>Page not found</h1>
            <p>We can’t seem to find the page you are looking for.</p>
            <button onClick={() => history.push("/home")} className="not-found-button">Home</button>
        </div>
    )
}