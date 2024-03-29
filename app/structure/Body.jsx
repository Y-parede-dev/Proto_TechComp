"use client"
import styles from './Body.module.css'
// refactor a faire
import Header from './header/Header'
import Footer from './footer/Footer'
import Nav from './navigation/Nav'
import { SearchCTX } from '../context/SearchCTX'
import { useState, useEffect } from 'react'
import { BannerAds } from '../components/pub/Banner'
import { BannerAdsTop } from '../components/pub/top'
import { BannerAdsLeft } from '../components/pub/left'
import { BannerAdsRight } from '../components/pub/right'
import { ConsentCookiesCustom } from '../cookies/cookiesConscent'

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
    ConsentCookiesCustom();
    
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
                <Nav responsive={{widthScreen, setwidthScreenCss, desktopDesign, setDesktopDesign}}/>
                <main className={styles.mainOnBody}>
                    
                    <div onClick={()=>window.open('https://clk.tradedoubler.com/click?p=320984&a=3342379&g=25082228', "_blank")} className={styles.bannerAds}>
                        {/* <BannerAds></BannerAds> */}
                    </div>
                    {/* <div className={styles.adsTop}>

                        <BannerAdsTop/>
                    </div>
                    <div className={styles.adsLeft}>

                        <BannerAdsLeft/>
                    </div>
                    <div className={styles.adsRight}>

                        <BannerAdsRight/>
                    </div> */}
                    <div className={styles.content}>{children}</div>
                </main>
                <Footer/>
            </SearchCTX.Provider>
        </>
    )
}
export default Body
