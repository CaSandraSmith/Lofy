import { useRef, useState } from "react"
import { useAudio } from "../../../context/Audio"
import "./AudioBar.css"

export default function AudioBar() {
    const audioBarRef = useRef()
    let [inputValue, setInputValue] = useState(0)
    let { playing, setPlaying, songName, queue, setSong, song } = useAudio()

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

    let songFinished = () => {
        let index = queue.indexOf(song)
        let lastIndex = queue.length - 1
        if (index === lastIndex) {
            setSong(queue[0])
        } else {
            setSong(queue[index + 1])
        }
        setPlaying(true)
    }

    let handlePrevCLick = () => {
        console.log(audioBarRef.current.currentTime)
        if (audioBarRef.current.currentTime > 2) {
            return audioBarRef.current.currentTime = 0
        }
        let index = queue.indexOf(song)
        let lastIndex = queue.length - 1

        if (index === 0) {
            setSong(queue[lastIndex])
        } else {
            setSong(queue[index - 1])
        }
        setPlaying(true)
    }


    return (
        <div className="audio-bar">
            <audio
                ref={audioBarRef}
                src={song.audio}
                onTimeUpdate={() => setInputValue(Math.floor(audioBarRef.current.currentTime))}
                onEnded={songFinished}
                autoPlay>
            </audio>
            <div className="visible-audio-bar">
                {song ?
                    <div className="audio-bar-song-details">
                        <img className="audio-bar-album-cover" src={song.album.cover_image} alt={`Album cover for ${song.name}`} />
                        <div className="audio-bar-song-name-artist">
                            <p>{song.name}</p>
                            <p>{song.artist_name}</p>
                        </div>
                    </div>
                    : <div>
                        <img
                            className="audio-bar-album-cover"
                            src="https://lofy.s3.us-east-2.amazonaws.com/album_covers/Untitled+design+(5).png"
                        />
                    </div>
                }
                <div className="audio-bar-song-controls">
                    <div className="audio-bar-song-buttons">
                        <button disabled={song ? false : true} onClick={handlePrevCLick}>
                            <i
                                className="fa-solid fa-backward-step forward-backward-buttons"
                            ></i>
                        </button>
                        <button disabled={song ? false : true} onClick={handlePlayBottonClick}>
                            <i className={playing ? "fa-solid fa-circle-pause play-pause-button" : "fa-solid fa-circle-play play-pause-button"}></i>
                        </button>
                        <button disabled={song ? false : true} onClick={songFinished}>
                            <i
                                className="fa-solid fa-forward-step forward-backward-buttons"
                            ></i>
                        </button >
                    </div>
                    <div className="song-duration-input">
                        <span>{song ? convertLengthTable(Math.floor(audioBarRef.current.currentTime)) : "--:--"}</span>
                        <input
                            className="sing-duration-slider"
                            value={audioBarRef.current ? audioBarRef.current.currentTime : 0}
                            type="range"
                            onChange={(e) => audioBarRef.current.currentTime = e.target.value}
                            max={song.length ? song.length : 0}
                        />
                        <span>{song ? convertLengthTable(song.length) : "--:--"}</span>
                    </div>
                </div>
                <div>
                    <input
                        type="range"
                    />
                </div>
            </div>
        </div>
    )
}