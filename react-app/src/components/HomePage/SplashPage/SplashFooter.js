import "./SplashPage.css"
import { Link } from "react-router-dom"

export default function SplashFooter() {
    return (
        <div className="splash-footer">
            <h1>Meet the dev</h1>
            <div className="about-links">
                <div>
                    <a target="_blank" href="https://www.linkedin.com/in/casandra-smith/">
                        Linkedin <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
                <div>
                    <a target="_blank" href="https://github.com/CaSandraSmith">
                        <i className="fa-brands fa-github"></i> GitHub
                    </a>
                </div>
            </div>
        </div>
    )
}