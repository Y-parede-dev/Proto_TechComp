"use client"
import SuggestionMap from "@/app/components/suggestion/SuggestionMap"
import { SearchCTX } from "@/app/context/SearchCTX"
import { ProductSearchById } from "@/lib/ProductSearch"
import { useEffect, useState, useContext, useRef } from "react"
import styles from '@/app/components/suggestion/SuggestionMap.module.css'
import Link from "next/link"
import Notation from "@/app/components/clientComponents/Notation"
import PointsCles from "../../pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles"
import Image from "next/image"
export const FavoriInit = () => {
    const scrollElement = useRef(null)
    const CTX = useContext(SearchCTX)
    const [fav, setFav] = useState([])
    const [data, setData] = useState([])
    const [ids, setIds] = useState([])
    let idOnLS;
    useEffect(()=>{
        idOnLS = localStorage.getItem('favoris')
        setFav(idOnLS.split(','))
    }, [])
    useEffect(()=>{
        let searchId = fav
        let [id, dataEffetMere ] = ProductSearchById({searchId, CTX}) 
        setData(dataEffetMere)
        setIds(id)
        
    },[fav])
    console.log(typeof(fav))
    console.log((fav))
    console.log((data))
    return(
        <div className={styles.suggestions}>
            <div className={styles.containerListOtherItems}>
                <h3>FAV</h3>
                <ul className={styles.listCarroussel} ref={scrollElement}>
                {data&&data.map(produitElt=> [
                    ids&&ids.map(idSearchReturn=>[
                    produitElt.id==idSearchReturn&&
                    <Link key={produitElt.id} className={styles.LinkProduit} href={`/pages/pc-portable/${produitElt.id}`}>
                        <li className={styles.litsItemCarroussel}>
                            <Image  alt={`Produit de la marque: ${produitElt.brand} `} width={200} height={200} src={produitElt.images[0]}/>
                            <h4>{produitElt.title}</h4>
                            <Notation produit={produitElt} param={produitElt.usage}/>
                            <PointsCles produit={produitElt} param={produitElt.usage}/>
                            <div className={styles.prix}> <p className={styles.prixMin}>à partir de</p> <affilizz-rendering-component className={styles.affilizzLink} publication-content-id={produitElt.btn.publicationContentId} loading="lazy"></affilizz-rendering-component></div>
    
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