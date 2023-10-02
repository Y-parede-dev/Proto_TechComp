"use client"

import { useEffect, useState } from "react"
import styles from './ImageAndLinkAffiliate.module.css'
import Image from 'next/image'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

const ImageAndLinkAffiliate = ({produit}) => {
    const [playVideo, setPlayVideo] = useState(false)
    const [urlImageDefault, setUrlImageDefault] = useState(produit.images[0])
    const openVideo = () => {
        setPlayVideo(!playVideo)
    }
    const closeVideo = () => {
        setPlayVideo(false)
    }
    const changeImage = (item) => {
        let url = `/_${item.target.src.split('/_')[1]}`
        // console.log(url)
        setUrlImageDefault(url)
    }
    return(
        <>
            <div className={styles.imageContainer}>
                <div className={styles.imagesList}>
                    {produit.images.map((imageUrl) => (
                        <Image key={`${produit.title} - ${imageUrl}`} alt={`${produit.title}`} onClick={(e)=>changeImage(e)} className={styles.imageTiny} width={100} height={100} src={imageUrl}/>
                    ))}
                </div>
                {/* <aside className={styles.bonusVideo}>
                    <div className={styles.containerIcon} title="play video" onClick={()=>openVideo()}>
                        <PlayArrowIcon />
                    </div>
                    {playVideo&& 
                    <div className={styles.iframeContainer}>
                        <div onClick={()=>closeVideo()} className={styles.closeVideo}>
                            <CloseIcon/>
                        </div>
                        <iframe allowFullScreen className={styles.iframeVideoBonus} title='360 video' src={produit.bonus}></iframe>
                    </div>
                    }
                </aside> */}
                <Image alt={`${produit.title}`} className={styles.image} width={400} height={400} src={urlImageDefault}/>
            </div>
            <div className={styles.array}>
                <p className={styles.array_price_title}>Meilleurs prix du marché</p>
                <affilizz-rendering-component publication-content-id={produit.array.publicationContentId} loading={produit.loading}></affilizz-rendering-component>
            </div>
        </>
    )
}
export default ImageAndLinkAffiliate