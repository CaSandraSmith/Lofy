import { useRef, useState } from "react"
import { useAudio } from "../../../context/Audio"
import "./AudioBar.css"

export default function AudioBar() {
    const audioBarRef = useRef()
    let [currentTime, setCurrentTime] = useState(0)
    let [inputValue, setInputValue] = useState(0)
    let { audio, playing, setPlaying, albumCover, songName, artist, duration } = useAudio()

    let handlePlayBottonClick = () => {
        if (playing) {
            audioBarRef.current.pause()
            setPlaying(false)
        } else {
            audioBarRef.current.play()
            setPlaying(true)
        }
    }

    let convertLengthTable = (length) => {
        let minutes = Math.floor(length / 60)
        let seconds = length % 60
        let sec = seconds.toString()
        if (sec.length < 2) {
            sec = "0" + sec
        }
        return `${minutes}:${sec}`
    }

    return (
        <div className="audio-bar">
            <audio
                ref={audioBarRef}
                src={audio}
                // onTimeUpdate={() => setInputValue(Math.floor(audioBarRef.current.currentTime))}
                autoPlay>
            </audio>
            <div className="visible-audio-bar">
                {songName && <div>
                    <img className="audio-bar-album-cover" src={albumCover} alt={`Album cover for ${songName}`} />
                    <div>
                        <p>{songName}</p>
                        <p>{artist}</p>
                    </div>
                </div>}
                <div>
                    <i className="fa-solid fa-backward-step"></i>
                    <i onClick={handlePlayBottonClick} className={playing ? "fa-solid fa-circle-pause" : "fa-solid fa-circle-play"}></i>
                    <i className="fa-solid fa-forward-step"></i>
                </div>
                <div>
                    <span>{convertLengthTable(audioBarRef.current ? Math.floor(audioBarRef.current.currentTime) : 0)}</span>
                    <input
                        value={audioBarRef.current ? audioBarRef.current.currentTime : 0}
                        type="range"
                        onChange={(e) => audioBarRef.current.currentTime = e.target.value}
                        max={duration ? duration : 0}
                    />
                    <span>{convertLengthTable(duration)}</span>
                </div>
            </div>
        </div>
    )
}