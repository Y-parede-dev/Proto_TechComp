"use client"
import styles from './Body.module.css'
// refactor a faire
import Header from './header/Header'
import Footer from './footer/Footer'
import Nav from './navigation/Nav'
import { SearchCTX } from '../context/SearchCTX'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Test as Tests } from '../components/Tests/Tests'
import { FavExist } from '../cookies/favorisStorage'

// import { useClient } from 'next/client';

export const metadata = {
    title: {
        template:'%s | TechComparateur PC Portable : Sélection Expert',
        default: 'TechComparateur PC Portable : Sélection Expert'
    },
    description: "Découvrez les meilleurs PC portables sur TechComparateur le site comparateur de pc portable. Faites le choix éclairé pour vos besoins en informatique.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true
        },
    }
}

const Body = ({children}) => {
    
    const [SEARCH, setSEARCH] = useState("")
    const [NUMBERFAVACTUAL, setNUMBERFAVACTUAL] = useState(0)
    const [TAG, setTAG] = useState("")
    const [IDPRESENT, SETIDPRESENT] = useState(false)

    const [widthScreen, setwidthScreenCss] = useState(0)
    const [desktopDesign, setDesktopDesign] = useState(true);

    useEffect(()=>{
        FavExist()
    },[])
    useEffect(()=>{
        if(SEARCH.length > 0){
            SETIDPRESENT(true)
        }else{
            SETIDPRESENT(false)
        }
    },[TAG])
    return (
        <>
            <SearchCTX.Provider value={{setSEARCH, setTAG, SEARCH, TAG, IDPRESENT, NUMBERFAVACTUAL, setNUMBERFAVACTUAL}} >
                <Header responsive={{widthScreen, setwidthScreenCss, desktopDesign, setDesktopDesign}}/>
                <Tests/>
                
                <Nav responsive={{widthScreen, setwidthScreenCss, desktopDesign, setDesktopDesign}}/>
                <main className={styles.mainOnBody}>
                    <Link href='https://www.acer.com'>
                        <div className={styles.AdsContainer}>PUB</div>
                    </Link>
                    <div className={styles.content}>{children}</div>
                </main>
                <Footer/>
            </SearchCTX.Provider>
        </>
    )
}
export default Body
