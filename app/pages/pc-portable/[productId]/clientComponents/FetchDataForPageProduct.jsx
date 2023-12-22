"use client";
import styles from "../page.module.css";
import ImageAndLinkAffiliate from "../clientComponents/ImageAndLinkAffiliate";

import Notation from '@/app/components/clientComponents/Notation';
import { Caracteristique } from "@/app/pages/pc-portable/[productId]/SSRCompponents/caracteristiques/Caracteristique";
import SuggestionMap from '@/app/components/suggestion/SuggestionMap';
import {PointsCles} from '@/app/pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles';
import { useEffect, useState } from "react";
import {GET} from '@/lib/GetByJson'

export const FetchDataForPageProduct = ({params}) => {
    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const dataFetch = async () =>{
        try{
            setIsLoading(true)

            const req = await GET();
        
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
                        <SuggestionMap searchSepar={produit.brand} titreRecherche={"PC portable de la même marque"}/>
                        <hr/>
                        <SuggestionMap searchSepar={"gaming"} titreRecherche={"PC portable gamer"}/>
                        <hr/>
                        <SuggestionMap searchSepar={"ultra"} titreRecherche={"PC portable avec écran 4K"}/>
                        <hr/>
                        <SuggestionMap searchSepar={"tactile"} titreRecherche={"PC portable avec écran tactile"}/>
    
                        </div>
                    </>
                    </div>
                </section>
            </>
        )
    }
}