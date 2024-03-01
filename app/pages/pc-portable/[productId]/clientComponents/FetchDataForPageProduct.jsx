"use client";
import styles from "../page.module.css";
import ImageAndLinkAffiliate from "../clientComponents/ImageAndLinkAffiliate";

import Notation from '@/app/components/clientComponents/Notation';
import { Caracteristique } from "@/app/pages/pc-portable/[productId]/SSRCompponents/caracteristiques/Caracteristique";
import SuggestionMap from '@/app/components/suggestion/SuggestionMap';
import {PointsCles} from '@/app/pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles';
import { useEffect, useState } from "react";
import {GET} from '@/lib/GetByJson'
import { AdsLarge } from "@/app/components/pub/Large";

export const FetchDataForPageProduct = ({params}) => {
    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const dataFetch = async () =>{
        try{
            setIsLoading(true)

            const req = await GET();
            /*MODIFIER ET CREE FONCTION GET BY ID QUI DANS LE BACKEND VA RECHERCHER DANS LA BDD BY ID*/
        
            req?.map((prod)=>{
                
                if(prod.id===params){
                    
                    setProduit(prod);
                }
            });
        }catch(error){
            console.error(error)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        dataFetch()
            
    }, [params])
    useEffect(()=>{
        // console.log(produit)
    },[isLoading===false])
    if(isLoading){
        return(<>Chargement des ressources</>)
    }else{

        
        return (
            <>
                <section className={styles.section}>
                <h1 className={styles.product_card_title}>{produit.title}</h1>
                    <div className={styles.product_card}>
                    <ImageAndLinkAffiliate produit={produit}/>
                        
                    <hr className={styles.hr}/>
                    <>
                        <Notation produit={produit}/>
                        <Caracteristique produit={produit}/>
                    </>
                    <hr className={`${styles.hr} ${styles.hr2}`}/>
                    <>
                        <PointsCles produit={produit}/>
                    </>
                    <hr className={`${styles.hr} ${styles.hr3}`}/>
                    <>
                        <div className={styles.suggestions}>
                        <h2>suggestions d'autres produits</h2>
                        
                        <SuggestionMap searchSepar={produit.brand} titreRecherche={"PC portables de la même marque"}/>
                        <hr/>
                        <AdsLarge></AdsLarge>

                        <SuggestionMap searchSepar={"gaming"} titreRecherche={"PC portables gamer"}/>
                        <hr/>
                        <AdsLarge></AdsLarge>

                        <SuggestionMap searchSepar={"ultra"} titreRecherche={"PC portables avec écran 4K"}/>
                        <hr/>
                        <AdsLarge></AdsLarge>

                        <SuggestionMap searchSepar={"Oled"} titreRecherche={"PC portables avec écran Oled"}/>
    
                        </div>
                    </>
                    </div>
                </section>
            </>
        )
    }
}