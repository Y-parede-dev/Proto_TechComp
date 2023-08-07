"use client"
import { useEffect, useState } from 'react'
// import styles from './page.module.css'
import produits from '@/data/dataProduits/produits.json' assert { type: 'json' }
import { FilterNoRepeat } from '@/lib/NoRepeat'
// import Image from 'next/image'
const returnSearch = () => {
    const [idPresent, setIdPresent] = useState([])
    const [retourRecherche, setRetourRecherche] = useState([])
    const allProducts = produits.produits
    useEffect(()=>{
        try {
            setIdPresent(sessionStorage.getItem('idSearch').split(","))
        } catch (error) {
            console.error(error)
            return 
        }
    },[])
    useEffect(()=>{
        let tabEfMe=[]
        let tabEfMeT=[]
        if(idPresent.length>0){
            idPresent.map((idSearch)=>{
                allProducts.map(element => {
                    if(idSearch === element.id){
                        tabEfMe.push(element)
                        
                        tabEfMeT = FilterNoRepeat(tabEfMe) // tabEfMe.filter((x,i)=>tabEfMe.indexOf(x)===i)
                    }
                })
            })
            setRetourRecherche(tabEfMeT)
        }else{
            setRetourRecherche(allProducts)
        }
    },[idPresent])
    return retourRecherche 
}
export default returnSearch;