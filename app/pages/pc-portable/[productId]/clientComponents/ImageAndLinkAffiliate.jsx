"use client"

import { useContext, useEffect, useReducer, useState } from "react"
import styles from './ImageAndLinkAffiliate.module.css'
import Image from 'next/image'
import { SaveFav } from "@/app/cookies/favorisStorage";
import { SearchCTX } from "@/app/context/SearchCTX";
import initFirebaseAndStockage from "@/config/configFirebase/conf.firebase";
import { list } from "firebase/storage";

const ImageAndLinkAffiliate = ({produit}) => {

    const storageRef = initFirebaseAndStockage();
    const [clicked, setclicked] = useState(false)
    const [urlImageDefault, setUrlImageDefault] = useState(
        {
            image:produit.images[0],
            defaut: true
        }
        )
        console.log(typeof(urlImageDefault.image))

    const [images , setImages] = useState({
        url: produit.images[0],
        default:true,
        arrayImages: []
    })

    const urlCustom = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.appspot.com/o/pcPortables%2F${produit.brand}%2F${produit.id}`;

    useEffect(() => {
        const getDataFirebase = async () => {

            await list(storageRef)
                .then((pcPortable)=>{
                    pcPortable.prefixes.forEach((folderRef)=>{
                        list(folderRef)
                            .then((resBrand)=>{
                                resBrand.prefixes.forEach((brandRef)=>{
                                    if(brandRef.name.toLowerCase() === produit.brand.toLowerCase()){
                                        list(brandRef)
                                            .then((resFoldByBrand)=>{
                                                resFoldByBrand.prefixes.forEach((foldItemRef)=>{
                                                    if(foldItemRef.name === produit.id)
                                                    {
                                                        list(foldItemRef)
                                                            .then((resItems)=>{
                                                                const arrayTemp = []
                                                                resItems.items.map((item)=>{
                                                                    if(!images.arrayImages.includes(item.name)){
                                                                        arrayTemp.push(item.name)
                                                                    }
                                                                    setImages({url: images.arrayImages[0] ,arrayImages:arrayTemp, default: false})
                                                                })
                                                            });
                                                            
                                                    }
                                                })
                                            })
                                    }
                                })
                            })
                    })
                })
        }
        getDataFirebase()
    },[])

    const changeImage = (item) => {
        let url = `${item.target.src.split('url=')[1]}`;
        setUrlImageDefault({image:url.split("%252F")[3].split("%3F")[0]})
    }
    const GetByAffiliz = async({prod}) => {
        
        return(
            <affilizz-rendering-component publication-content-id={prod.array.publicationContentId} loading={prod.loading}></affilizz-rendering-component>
        )
    } 
    return(
        <>
            <div className={styles.imageContainer}>
                <div><Image width={400} height={400} src={`${urlCustom}%2F${urlImageDefault.image}?alt=media`}></Image></div>
                <div className={styles.imagesList}>
                    {
                        images.arrayImages.map((imgs)=>[
                            <Image className={styles.imageItem} key={imgs} width={100} onClick={e=>changeImage(e)} height={100} src={`${urlCustom}%2F${imgs}?alt=media`}></Image>

                        ])
                    }
                </div>
            </div>
            <div className={styles.array}>
                <p className={styles.array_price_title}>Meilleurs prix du marché</p>
                <GetByAffiliz prod={produit}></GetByAffiliz>
                {/* <affilizz-rendering-component publication-content-id={produit.array.publicationContentId} loading={produit.loading}></affilizz-rendering-component> */}
            </div>
        </>
    )
}
export default ImageAndLinkAffiliate