import { useAudio } from "../../../context/Audio"

export default function AudioBar() {
    let { audio } = useAudio()

    return (
        <audio src={audio} controls autoPlay></audio>
    )
}