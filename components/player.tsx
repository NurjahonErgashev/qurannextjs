import { useRef } from "react";
import { Button } from "@mui/material";
import { useStorage } from "../hooks/useStorage";
import styles from "../styles/Player.module.scss";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function Player(): JSX.Element {
    const audio = useStorage((state) => state.audio);
    const setAudio = useStorage((state) => state.setAudio);
    const audioRef = useRef<HTMLAudioElement>(null);
    const author = useStorage((state) => state.author);
    const status = useStorage((state) => state.status);

    if (status.status !== 'pause') {
        audioRef.current?.pause()
    } else {
        audioRef.current?.play()
    }
    return (
        <div className={styles.Player}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.btns}>


                        {audio == 1 ? (

                            <Button variant="contained" disabled>
                                <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={() => setAudio(audio - 1)}>
                                <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
                            </Button>
                        )}

                    {audio < 6236 ? (
                        <Button variant="contained" onClick={() => setAudio(audio + 1)}>
                            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                        </Button>
                    ) : (
                        <Button variant="contained" disabled>
                            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                        </Button>
                    )}
                    </div>
                    <audio
                        src={`https://cdn.islamic.network/quran/audio/128/${author}/${audio}.mp3`}
                        controls
                        ref={audioRef}
                        preload="auto"
                        autoPlay
                    ></audio>
                </div>
            </div>
        </div>
    )
}