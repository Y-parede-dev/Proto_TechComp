"use client"
import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import { SearchCTX } from '../context/SearchCTX'
import { useState, useEffect } from 'react'
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
    const [TAG, setTAG] = useState("")
    const [IDPRESENT, SETIDPRESENT] = useState(false)
    useEffect(()=>{
        if(SEARCH.length > 0){
            SETIDPRESENT(true)
        }else{
            SETIDPRESENT(false)
        }
    },[TAG])
    return (
        <>
            <SearchCTX.Provider value={{setSEARCH, setTAG, SEARCH, TAG, IDPRESENT}} >
                <Header/>
                <Nav />
                <div >{children}</div>
                <Footer/>
            </SearchCTX.Provider>
        </>
    )
}
export default Body
