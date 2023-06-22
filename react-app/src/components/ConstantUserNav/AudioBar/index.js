import { useRef, useState } from "react"
import { useAudio } from "../../../context/Audio"
import "./AudioBar.css"

export default function AudioBar() {
    const audioBarRef = useRef()
    let [inputValue, setInputValue] = useState(0)
    let [shuffle, setShuffle] = useState(false)
    let [loop, setLoop] = useState(false)
    let [shuffleQueue, setShuffleQueue] = useState([])
    let [nextSong, setNextSong] = useState([])
    let { playing, setPlaying, songName, queue, setSong, song, setQueue } = useAudio()

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
        console.log("looping", loop)
        let queueCopy = []
        if (shuffleQueue.length) {
            queueCopy = shuffleQueue
        } else {
            queueCopy = queue
        }
        let index = queueCopy.indexOf(song)
        let lastIndex = queueCopy.length - 1
        if (index === lastIndex && loop) {
            setSong(queueCopy[0])
        } else if (index === lastIndex && !loop) {
            setSong(false)
            setQueue(false)
            setPlaying(false)
        } else {
            setSong(queueCopy[index + 1])
        }
        setPlaying(true)
    }

    let handlePrevCLick = () => {
        if (audioBarRef.current.currentTime > 2) {
            return audioBarRef.current.currentTime = 0
        }
        let queueCopy = []
        if (shuffleQueue.length) {
            queueCopy = shuffleQueue
        } else {
            queueCopy = queue
        }
        let index = queueCopy.indexOf(song)
        let lastIndex = queueCopy.length - 1

        if (index === 0) {
            setSong(queueCopy[lastIndex])
        } else {
            setSong(queueCopy[index - 1])
        }
        setPlaying(true)
    }

    let handleShuffleClick = () => {
        let shuffleStatus = !shuffle
        if (shuffleStatus) {
            let newQueue = []
            let copy = [...queue]
            
            while (copy.length) {
                let i = Math.floor(Math.random() * copy.length)
                newQueue.push(copy[i])
                copy.splice(i, 1)
            }
            setShuffleQueue(newQueue)
        } else {
            setShuffleQueue([])
        }
        setShuffle(!shuffle)
    }

    let handleLoopClick = () => {
        // let looping = !loop
        // if (looping) {
        //     setNextSong(song)
        // } else {
        //     setNextSong([])
        // }
        setLoop(!loop)
    }

    const shuffleClassName = shuffle ? "shuffle-loop-buttons-green" : "shuffle-loop-buttons-white"
    const loopClassName = loop ? "shuffle-loop-buttons-green" : "shuffle-loop-buttons-white"

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
                        <button 
                        disabled={song ? false : true}
                        onClick={handleShuffleClick}
                        >
                            <i
                                className={"fa-solid fa-shuffle shuffle-button " + shuffleClassName}
                            ></i>
                        </button>
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
                        </button>
                        <button 
                        disabled={song ? false : true}
                        onClick={handleLoopClick}
                        >
                            <i 
                            class={"fa-solid fa-rotate-left " + loopClassName}></i>
                        </button>
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