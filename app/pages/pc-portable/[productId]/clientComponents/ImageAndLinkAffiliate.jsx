"use client"

import { useContext, useEffect, useReducer, useState } from "react"
import styles from './ImageAndLinkAffiliate.module.css'
import Image from 'next/image'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { SaveFav } from "@/app/cookies/favorisStorage";
import { SearchCTX } from "@/app/context/SearchCTX";
import GetProductImages from "../imagesComponents/GetProductImages";
import initFirebaseAndStockage from "@/config/configFirebase/conf.firebase";
import { listAll, list } from "firebase/storage";
import { FilterNoRepeat } from "@/lib/NoRepeat";

const ImageAndLinkAffiliate = ({produit}) => {
    console.log('prod'+ produit)
    console.log(produit)

    const storageRef = initFirebaseAndStockage();
    const CTX = useContext(SearchCTX)
    const [clicked, setclicked] = useState(false)
    // const [isLoading, setIsLoading] = useState(true)
    const [urlImageDefault, setUrlImageDefault] = useState(
        {
            image:produit.images[0],
            defaut: true
        }
        )
        console.log(typeof(urlImageDefault.image))
    const [curentProductId, setCurentProductId] = useState(null);
    const [testSTate , settestSTate] = useState([])
    const [curentId, setCurentId] = useState(null)
    let test = []
    // const url = `https://firebasestorage.googleapis.com/v0/b/${process.env.FB_STORAGE_BUCKET}/o`;
    const urlCustom = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.appspot.com/o/pcPortables%2F${produit.brand}%2F${produit.id}`;
    useEffect(()=>{
        setCurentId(produit.id)
    },[])
    useEffect(()=>{
        list(storageRef)
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
                                                    let count = 0;
                                                    list(foldItemRef)
                                                        .then((resItems)=>{
                                                            resItems.items.map((item)=>{
                                                                count=count+1
                                                                // settestSTate([...testSTate, item.name]);
                                                                console.log('count '+ count)
                                                                if(!testSTate.includes(item.name)){
                                                                    testSTate.push(item.name)
                                                                }
                                                                // testSTate.push(item.name)
                                                                setUrlImageDefault({image:testSTate[0], default: false})
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
    },[])
    // useEffect(()=>{
    //     FilterNoRepeat(testSTate)
    // },[testSTate])
    console.log(testSTate)
    

    useEffect(()=>{
        setCurentProductId(produit.id)
    },[])
    const changeImage = (item) => {
        console.log(item.target.src)
        let url = `${item.target.src.split('url=')[1]}`;
        setUrlImageDefault({image:url.split("%252F")[3].split("%3F")[0]})
    }
    
    const AddProductOnFav = (elt) => {
        setclicked(!clicked)
        SaveFav(elt)
    }
    return(
        <>
            <div className={styles.imageContainer}>
                <div><Image width={400} height={400} src={`${urlCustom}%2F${urlImageDefault.image}?alt=media`}></Image></div>
                <div className={styles.imagesList}>
                    {
                        testSTate.map((imgs)=>[
                            <Image key={imgs} width={100} onClick={e=>changeImage(e)} height={100} src={`${urlCustom}%2F${imgs}?alt=media`}></Image>

                        ])
                    }
                </div>
            </div>
            <div className={styles.array}>
                <p className={styles.array_price_title}>Meilleurs prix du marché</p>
                <affilizz-rendering-component publication-content-id={produit.array.publicationContentId} loading={produit.loading}></affilizz-rendering-component>
            </div>
        </>
    )
}
export default ImageAndLinkAffiliate