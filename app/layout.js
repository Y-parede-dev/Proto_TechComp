"use client"
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Script from 'next/script'
import { SearchCTX, SearchCTXDispach } from './context/SearchCTX'
import { StrictMode, useReducer, useState } from 'react'
import { useEffect } from 'react'
// import { useClient } from 'next/client';
export const metadata = {
  title: {
    template:'%s | TechComparateur PC Portable : Sélection Expert',
    default: 'TechComparateur PC Portable : Sélection Expert'
  },
  description: "Découvrez les meilleurs PC portables sur TechComparateur le site comparateur de pc portable. Faites le choix éclairé pour vos besoins en informatique."
  
}

const RootLayout = ({children}) => {
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
    <html lang="fr">
      <body >
        <SearchCTX.Provider value={{setSEARCH, setTAG, SEARCH, TAG, IDPRESENT}} >
            <Header/>
            <Nav />
              <div >{children}</div>
            <Footer/>
        </SearchCTX.Provider>
        <Script src="https://sc.affilizz.com/affilizz.js" async></Script>
      </body>
    </html>
  )
}
export default RootLayout
