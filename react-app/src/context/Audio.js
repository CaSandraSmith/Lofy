import { createContext, useState, useContext } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext)

export const AudioProvider = props => {
    const [playing, setPlaying] = useState(false)
    const [song, setSong] = useState(false)
    const [queue, setQueue] = useState(false)

    return (
        <AudioContext.Provider 
            value={{ playing, setPlaying, queue, setQueue, song, setSong }}>
            {props.children}
        </AudioContext.Provider>
    )
}