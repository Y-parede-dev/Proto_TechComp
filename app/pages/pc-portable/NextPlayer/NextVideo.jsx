
import Video from 'next-video';
import CustomVideo from '@/public/videos/RechercheVideo.mp4';

export const CustomPlayer = () => {
    return (
        <Video
            src={CustomVideo}
            // playing={true}
            loop={true}
            width={700}
            playerVars={
                autoplay=1
            }
        />
    )
}