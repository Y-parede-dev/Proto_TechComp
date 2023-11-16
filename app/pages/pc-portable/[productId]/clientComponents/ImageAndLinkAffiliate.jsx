"use client"

import { useContext, useEffect, useState } from "react"
import styles from './ImageAndLinkAffiliate.module.css'
import Image from 'next/image'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { SaveFav } from "@/app/cookies/favorisStorage";
import { SearchCTX } from "@/app/context/SearchCTX";
const ImageAndLinkAffiliate = ({produit}) => {
    const CTX = useContext(SearchCTX)
    const [clicked, setclicked] = useState(false)
    const [urlImageDefault, setUrlImageDefault] = useState(produit.images[0])
    // const openVideo = () => {
    //     setPlayVideo(!playVideo)
    // }
    // const closeVideo = () => {
    //     setPlayVideo(false)
    // }
    useEffect(()=>{
        CTX.IDPRESENT = !CTX.IDPRESENT
    },[clicked])
    const changeImage = (item) => {
        let url = `/_${item.target.src.split('/_')[1]}`
        // console.log(url)
        setUrlImageDefault(url)
    }
    const AddProductOnFav = (elt) => {
        setclicked(!clicked)
        SaveFav(elt)
    }
    return(
        <>
            <div className={styles.imageContainer}>
                <div className={styles.imagesList}>
                    {produit.images.map((imageUrl) => (
                        <Image key={`${produit.title} - ${imageUrl}`} alt={`${produit.title}`} onClick={(e)=>changeImage(e)} className={styles.imageTiny} width={130} height={100} src={imageUrl}/>
                    ))}
                </div>
                <Image alt={`${produit.title}`} className={styles.image} 
                    width={400} height={300}
                    src={urlImageDefault}/>
            </div>
            <div className={styles.array}>
                <button onClick={()=>AddProductOnFav(produit.id)} className={styles.btnFav}>FAV</button>
                <p className={styles.array_price_title}>Meilleurs prix du marché</p>
                <affilizz-rendering-component publication-content-id={produit.array.publicationContentId} loading={produit.loading}></affilizz-rendering-component>
            </div>
        </>
    )
}
export default ImageAndLinkAffiliate