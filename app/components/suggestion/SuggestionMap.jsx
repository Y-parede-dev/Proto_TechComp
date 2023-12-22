"use client"
import {ProductSearchByTag, ProductSearchByPrice, ProductSearchBynotegaming, ProductSearchById} from "@/lib/ProductSearch"
import styles from "./SuggestionMap.module.css"
import Image from 'next/image'
import Notation from "../clientComponents/Notation"
import {PointsCles} from "@/app/pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles"
import Link from "next/link"
import { useEffect, useState, useContext, useRef } from "react"
import { SearchCTX } from "@/app/context/SearchCTX"
import { Modal, Slider } from '@mui/material';
import {Stack} from '@mui/material';
import { FilterNoRepeat } from "@/lib/FonctionsUtiles"
import { isEmpty } from "@/lib/FonctionsUtiles"
const SuggestionMap = ({searchSepar, page, by = "tag", titreRecherche='votre recherche'})=> {
    const CTX = useContext(SearchCTX)
    const scrollElement = useRef(null)
    const [loader, setLoader] = useState({
        isLoading:true,
        nbDefaultElt: 12,
        ListEltLoading: ({nombre}) => {
            const elt = Array.from({length: nombre}, (_, index) => {
                <li key={index}>
                    <h4>{'-----'}</h4>
                        <div className={styles.prix}>
                            <p className={styles.prixMin}>Loading ...  </p>
                        </div>
                </li>
            })
            return(
                <>
                    {elt}
                </>
            )
        }
    })
    const [need, setNeed] = useState({
        ids: null,
        data: []
    })
    const keyElt = useRef()
    let ids,  data = [];
    let searchTags=[searchSepar]
    let searchId = searchSepar;

    const scrollOnX = (direction) => {
        if(direction === 'left'){
            scrollElement.current.scrollLeft -= 342
        }else{
            scrollElement.current.scrollLeft += 342
        }
    }
    const arrayTemp = []
    // useEffect(()=>{
    //     for(let i =0; i< 13;i++){
    //         arrayTemp.push(i)
    //         setLoader({isLoading: loader.isLoading, nbDefaultElt: [...loader.nbDefaultElt, i]})
    //     }

    // },[])

    useEffect(()=>{
        setLoader({...loader,isLoading:true})
        const rechercheProduits = async () => {
            if(by=="tag"){
                [ids, data] = await ProductSearchByTag({searchTags})
                setNeed({ids:ids, data:data});
            }
            if(by=="id"){
                [ids, data] = ProductSearchById({searchId, CTX})
                setNeed({ids:ids, data:data});
            }
            console.log('need', need)
            try{
                if(isEmpty(ids)) {
                    ids=[]
                    data?.map((elt)=>{
                        ids.push(elt.id)
                        ids = FilterNoRepeat(ids)
                    })
                }
            }catch(err){
                console.error(err)
            }
        }
        // console.log(need.data)
        rechercheProduits()
            .finally(()=>{
                setLoader({...loader,isLoading: false});

            });
    }, [])
    // function isEmpty(obj) {
    //     return Object.keys(obj).length === 0;
    // }

    const handleChange = (e, newValue) => {
        setValue(newValue)
        let searchPrice=newValue
        ProductSearchByPrice({searchPrice, CTX})
    }

    if(loader.isLoading){
        return(
            <div className={styles.suggestions}>
            <div className={styles.containerListOtherItems}>
                <h3>{titreRecherche}</h3>
                <ul className={styles.listCarroussel} ref={scrollElement}>
                    {
                        <loader.ListEltLoading nombre={12}/>
                    }
                </ul>
                <div className={styles.arrows}>
                    <button onClick={()=>scrollOnX('left')}>{"<"}</button>
                    <button onClick={()=>scrollOnX('right')}>{">"}</button>
                </div>
            </div>
        </div>
        )
    }
    else{
        return(
        <div className={styles.suggestions}>
            <div className={styles.containerListOtherItems}>
                <h3>{titreRecherche}</h3>
                <ul className={styles.listCarroussel} ref={scrollElement}>
                {need.data?.map(produitElt=> [
                    need.ids?.map(idSearchReturn=>[
                    produitElt.id==idSearchReturn&&
                    <Link key={produitElt.id} className={styles.LinkProduit} href={
                        `/pages/pc-portable/${produitElt.id}`}>
                        <li className={styles.litsItemCarroussel}>
                            <Image loading="lazy" alt={`Produit de la marque: ${produitElt.brand} `}  width={200} height={200} src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.appspot.com/o/pcPortables%2F${produitElt.brand}%2F${produitElt.id}%2F${produitElt.images}?alt=media`}/>
                            <h4>{produitElt.title}</h4>
                            <Notation produit={produitElt} param={produitElt.usage}/>
                            <PointsCles produit={produitElt} param={produitElt.usage}/>
                            <div className={styles.prix}>
                                <p className={styles.prixMin}>à partir de</p>
                                <affilizz-rendering-component className={styles.affilizzLink} publication-content-id={produitElt.btn?.publicationContentId} loading="lazy"></affilizz-rendering-component>
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
}
export default SuggestionMap