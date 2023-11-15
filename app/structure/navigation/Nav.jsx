"use client";
import Link from 'next/link';
import styles from './Nav.module.css';
import FormSearch from '../../components/clientComponents/FormSearch';
import { useContext, useState, useEffect} from 'react';
import { SearchCTX } from '../../context/SearchCTX';
import { ProductSearchByPrice, ProductSearchByTag } from '@/lib/ProductSearch';
import { useRouter } from 'next/navigation';
import config from '@/config/config.json' assert{type:"json"};
import { FilterNoRepeat } from '@/lib/NoRepeat';
import Cookies from 'js-cookie';
// refactor a faire
const Nav = ({responsive}) => {
   
    // let t = Cookies.get('Favoris')
    // console.log(t)
    const [numberOfFav, setnumberOfFav] = useState(0);
    const [DifNumberFav, setDifNumberFav] = useState(false);
    const [inptUser, setinptUser] = useState([]);
    const [by, setBy] = useState("");
    const [moinsCher,setMoinsCher] = useState(false);
    const [pcGamer,setPcGamer] = useState(false);
    const [pcBureau,setPcBureau] = useState(false);
    const [PcMarque,setPcMarque] = useState(false);
    const [showNavBar, setshowNavBar] = useState(false);
    
       

    const router = useRouter();
    const [sea,setSea] = useState(false);
    const CTX = useContext(SearchCTX);

    const urlPcPortable = "/pages/pc-portable";
    try{
        window.onresize = ()=>{
            responsive.setwidthScreenCss(screen.width);
        }
    }catch(err){
        
    };
        useEffect(()=>{
            if(localStorage.getItem('favoris')!=null){
                const nombreFav = localStorage.getItem('favoris').split(',').length 
                CTX.setNUMBERFAVACTUAL(nombreFav)
            }
        }, [CTX])
    useEffect(()=>{
        responsive.setwidthScreenCss(screen.width);
    },[]);
    useEffect(()=>{
        if(responsive.widthScreen<= 1369){
            responsive.setDesktopDesign(false);
        }
        if(responsive.widthScreen> 1369){
            responsive.setDesktopDesign(true);
        }
    },[responsive.widthScreen]);


    useEffect(()=>{
        if(sea){
            let idPresent, DATA;
            let syntax;
            if(by==="tag"){
                [idPresent, DATA] = ProductSearchByTag({searchTags:[inptUser]});
                syntax = [inptUser];

            }if(by==="price"){
                [idPresent, DATA] = ProductSearchByPrice({searchPrice: inptUser, CTX});
                syntax = inptUser;
            }
            CTX.setTAG(syntax);
            idPresent = FilterNoRepeat(idPresent);
            CTX.setSEARCH(idPresent);
            setSea(false);
        };
    },[inptUser]);


    useEffect(()=>{

    }, [moinsCher]);


    const handle = (input, by)=>{
        setSea(true);
        setBy(by);
        setinptUser(input);
    };
    const navBar = (
        <div className={`${styles.ContainerNavLeft} ${showNavBar? styles.NavShow:''}`}>
            <nav className={`${styles.NavLeft}`}>
                {!responsive.desktopDesign&&<FormSearch/>}
                <ul className={styles.listTitles}>
                    <li>
                        {/* NAVIGATION */}
                        <h2 className={styles.titleCategoryListItem}>navigation</h2>
                        <ul className={styles.listItems}>
                            <li className={styles.linkOnNav}><Link href={"/"} >🏠 Accueil</Link></li>
                            <li onClick={()=>handle("pc portable", "tag")} className={styles.linkOnNav}>
                                <Link href={urlPcPortable} >💻 Tous nos PC portable</Link>
                            </li>
                            <li className={styles.linkOnNav}>Catégories</li>
                            <li className={styles.linkOnNav}>Comparaisons </li>
                            <li className={styles.linkOnNav}>
                                <Link href={"/pages/favoris"}>Favoris ⭐({CTX.NUMBERFAVACTUAL})</Link></li>
                        </ul>
                    </li>
                    <li>
                        <h2 className={styles.titleCategoryListItem}>classements</h2>
                        <ul className={styles.listItems}>
                            <li>
                                <ul>
                                    <li onClick={()=>setMoinsCher(!moinsCher)} className={styles.linkOnNav}>
                                        <Link href={" "}>PC portable moins chers</Link></li>
                                    {moinsCher && 
                                    <>
                                        <li className={`${styles.linkOnNav} ${styles.onPriceLink}`} onClick={()=>handle(500, "price")}><Link href={urlPcPortable}>moins de 500€</Link></li>
                                        <li className={`${styles.linkOnNav} ${styles.onPriceLink}`} onClick={()=>handle(1000, "price")}><Link href={urlPcPortable}>moins de 1000€</Link></li>
                                        <li className={`${styles.linkOnNav} ${styles.onPriceLink}`} onClick={()=>handle(2000, "price")}><Link href={urlPcPortable}>moins de 2000€</Link></li>
                                    </>
                                    }

                                </ul>
                            </li>
                            <li className={styles.linkOnNav}><Link href={urlPcPortable}>PC portable Gaming</Link></li>
                            <li className={styles.linkOnNav}><Link href={urlPcPortable}>PC portable Bureau</Link></li>
                            <li className={styles.linkOnNav} onClick={()=>handle("pc portable", "tag")}><Link href={urlPcPortable}>Tous les PC portable</Link></li>
                            
                        </ul>
                    </li>
                    <li>
                        <h2 className={styles.titleCategoryListItem}>contact</h2>
                        <ul className={styles.listItems}>
                            <li className={styles.linkOnNav}>
                                À propos 
                            </li>
                            <li className={styles.linkOnNav}>
                                Contact  
                            </li>
                        </ul>
                    </li>
                </ul>
                
            </nav>
            {!responsive.desktopDesign?<div onClick={()=>toggleShowNav()} className={styles.btnNavBarForMobile}><p>{showNavBar?"<<":">>"}</p></div>:""}
        </div>
    );
    const toggleShowNav = () => {
        setshowNavBar(!showNavBar);
    };
    const dontShowNav = ()=> { //voir si utilisation
        setshowNavBar(false);
    }
    const showNav = ()=> { //voir si utilisation
        setshowNavBar(true);
    }
    return (
        <>
            {navBar}
        </>
    );
};
export default Nav;