"use client";
import YouTube from "react-youtube";
import styles from './Youtube.module.css'

export const VideoPlayer = (params) => {
    const onReady = (e) => {
        const player = e.target;
    };
    const onError = (error) => {
        console.log(error)
    }
    return (
        <YouTube className={styles.YouTubeVideo} 
            videoId={"OugkGDlz8O4"}
            onReady={onReady}
            onError={onError}
            onEnd={onReady}
            opts={{
                height: '350px',
                width: '550px',
                playsinline:0}}
        />
    )
}