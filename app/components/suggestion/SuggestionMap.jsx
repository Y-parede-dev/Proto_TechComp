"use client"
import {ProductSearchByTag, ProductSearchByPrice, ProductSearchByNoteGaming, ProductSearchById} from "@/lib/ProductSearch"
import styles from "./SuggestionMap.module.css"
import Image from 'next/image'
import Notation from "../clientComponents/Notation"
import PointsCles from "../../pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles"
import Link from "next/link"
import { useEffect, useState, useContext, useRef } from "react"
import { SearchCTX } from "@/app/context/SearchCTX"
import { Modal, Slider } from '@mui/material';
import {Stack} from '@mui/material';
import { FilterNoRepeat } from "@/lib/NoRepeat"

const SuggestionMap = ({searchSepar, page, by = "tag", titreRecherche='votre recherche'})=> {
    const CTX = useContext(SearchCTX)
    const scrollElement = useRef(null)
    const keyElt = useRef()
    let ids, data;
    let searchTags=[searchSepar]
    let searchId = searchSepar;

    const scrollOnX = (direction) => {
        if(direction === 'left'){
            scrollElement.current.scrollLeft -= 350
        }else{
            scrollElement.current.scrollLeft += 350
        }
    }
    if(by=="tag"){
        [ids, data] = ProductSearchByTag({searchTags})
    }
    if(by=="id"){

        [ids, data] = ProductSearchById({searchId, CTX})

    }
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    try{
        if(isEmpty(ids)) {
            ids=[]
            data.map((elt)=>{
                ids.push(elt.id)
                ids = FilterNoRepeat(ids)
            })
        }
    }catch(err){
        console.error(err)
    }
    const handleChange = (e, newValue) => {
        setValue(newValue)
        let searchPrice=newValue
        ProductSearchByPrice({searchPrice, CTX})
    }
    return(
    <div className={styles.suggestions}>
        <div className={styles.containerListOtherItems}>
            <h3>{titreRecherche}</h3>
            <ul className={styles.listCarroussel} ref={scrollElement}>
            {data&&data.map(produitElt=> [
                ids&&ids.map(idSearchReturn=>[
                produitElt.id==idSearchReturn&&
                <Link key={produitElt.id} className={styles.LinkProduit} href={`/pages/pc-portable/${produitElt.id}`}>
                    <li className={styles.litsItemCarroussel}>
                        <Image alt={`Produit de la marque: ${produitElt.brand} `}  width={200} height={200} src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.appspot.com/o/pcPortables%2F${produitElt.brand}%2F${produitElt.id}%2F${produitElt.images[0]}?alt=media`}/>
                        <h4>{produitElt.title}</h4>
                        <Notation produit={produitElt} param={produitElt.usage}/>
                        <PointsCles produit={produitElt} param={produitElt.usage}/>
                        <div className={styles.prix}>
                            <p className={styles.prixMin}>à partir de</p>
                            <affilizz-rendering-component className={styles.affilizzLink} publication-content-id={produitElt.btn.publicationContentId} loading="lazy"></affilizz-rendering-component>
                        </div>
                    </li>
                </Link>
                ])
            ])}
            </ul>
            <div className={styles.arrows}>
                <button onClick={()=>scrollOnX('left')}>{"<"}</button>
                <button onClick={()=>scrollOnX('right')}>{">"}</button>
            </div>
        </div>
    </div>
    )
}
export default SuggestionMap