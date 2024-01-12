"use client";
import YouTube from "react-youtube";
import styles from './Youtube.module.css'

export const VideoPlayer = ({params}) => {
    console.log(params)
    const videoid = {
        default: "OugkGDlz8O4",
        other: undefined
    }
    try {
        if(params.id){
            videoid.other = params.id;
        }    
    } catch (error) {
        
    }
    const onReady = (e) => {
        const player = e.target;
        try{

            if(params.id){
                player.playVideo()
                console.log("E start ");
                console.log(e);
                console.log(e.target);
                console.log("E end ");
    
            }
        }catch(e){}
    };
    const onError = (error) => {
        console.log(error)
    }
    return (
        <YouTube className={styles.YouTubeVideo} 
            videoId={videoid.other!=undefined?videoid.other:videoid.default}
            onReady={onReady}
            onError={onError}
            onEnd={onReady}
            opts={videoid.other!=undefined?params.opts:{
                height: '350px',
                width: '550px',
                playsinline:0}}
        />
    )
}