import styles from './Videotuto.module.css'
import { VideoPlayer } from './getUrlYoutube/VideoHomePage'
export const VideoTuto = () =>{
    return(
    <div className={styles.videoTutoContainer}>
        <VideoPlayer/>
    </div>)
}