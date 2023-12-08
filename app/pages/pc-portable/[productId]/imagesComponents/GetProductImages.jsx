"use client";
import  {listAll} from 'firebase/storage';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {initFirebaseAndStockage} from '@/config/configFirebase/conf.firebase';
import { InitFirebase } from '@/config/configFirebase/conf.init.firebase';

const GetProductImages = ({setUrlImageDefault, curentProductId, product, url}) => {
    // const storageInit = InitFirebase()
    const imageRef = initFirebaseAndStockage();
    // const [curentProductId, setCurentProductId] = useState(null);
    const [curentURL, setCurentURL] = useState(null)
    // const [imagesArray, setImageArray] = useState([]);
    const [tokenImg,setTokenImg] = useState([])
    const urlCustom = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.appspot.com/o/pcPortables/${product.brand}`;
    const imagesArray =[]
    // useEffect(()=>{
    //     setCurentProductId(productId)
    //     console.log('je change')
    // }, [productId])
    useEffect(()=>{
        listAll(imageRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    if(folderRef.name == curentProductId){
                        console.log(folderRef.name)
                        
                        listAll(folderRef)
                            .then((res)=>{
                                res.items.forEach((items)=>{
                                    console.log(items)
                                    imagesArray.push(items.name)
                                })
                            }).catch((error)=> {
                                // Uh-oh, an error occurred!
                            })
                        }
                    })
                }).catch((error) => {
        })
    },[])
    
    return(
        <ul>
            {
            imagesArray.map((imageName)=>[
                <li>
                    <Image /*onClick={e=>changeImage(e)}*/   width={300} height={300} src={`${urlCustom}%2F${imageName}?alt=media`}></Image>
                </li>
            ])  
            }
            {
            imagesArray.map((imageName)=>[
                <li>
                    <Image /*onClick={e=>changeImage(e)}*/   width={300} height={300} src={`${urlCustom}%2F${imageName[0]}?alt=media`}></Image>
                </li>
            ])  
            }
            {/* <li>
                <Image fill={true}  src={`${urlCustom}%2F${productId}.jpg?alt=media`}></Image>
            </li> 
            */}
            
        </ul>
    )
}
export default GetProductImages
