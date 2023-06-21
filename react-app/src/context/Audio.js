import { createContext, useState, useContext } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext)

export const AudioProvider = props => {
    const [audio, setAudio] = useState("")
    const [playing, setPlaying] = useState(false)
    const [albumCover, setAlbumCover] = useState(false)
    const [songName, setSongName] = useState(false)
    const [artist, setArtist] = useState(false)
    const [duration, setDuration] = useState(false)

    return (
        <AudioContext.Provider value={{audio, setAudio, playing, setPlaying, albumCover, setAlbumCover, songName, setSongName, artist, setArtist, duration, setDuration}}>
            {props.children}
        </AudioContext.Provider>
    )
}