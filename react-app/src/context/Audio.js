import { createContext, useState, useContext } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext)

export const AudioProvider = props => {
    const [audio, setAudio] = useState("")

    return (
        <AudioContext.Provider value={{audio, setAudio}}>
            {props.children}
        </AudioContext.Provider>
    )
}