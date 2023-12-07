"use client";
import Link from 'next/link';
import styles from './Nav.module.css';
import FormSearch from '../../components/clientComponents/FormSearch';
import { useContext, useState, useEffect} from 'react';
import { SearchCTX } from '../../context/SearchCTX';
import { ProductSearchByPrice, ProductSearchByTag } from '@/lib/ProductSearch';
import { useRouter } from 'next/navigation';
import config from '@/config/config.json' assert{type:"json"};
import { FilterNoRepeat } from '@/lib/FonctionsUtiles';
import Cookies from 'js-cookie';
import GetByJson from '@/lib/GetByJson';
// refactor a faire
const Nav = ({responsive}) => {
    const [inptUser, setinptUser] = useState([]);
    const [by, setBy] = useState("");
    const [showNavBar, setshowNavBar] = useState(false);
    const [items, setItems] = useState({
        marques:['empty']
    })
    const [modales, setModales] = useState({
        moinsCherModale: false,
        marquesModale: false,
        clasementMarques: false
    })
    useEffect(()=>{
        const marques = [];
        GetByJson().map(elt=>marques.push(elt.brand));
        setItems({marques: FilterNoRepeat(marques)});
    },[]);
    const router = useRouter();
    const [sea,setSea] = useState(false);
    const CTX = useContext(SearchCTX);
    const arr_MoinsCher = [500, 1000, 1500, 2000, 3000];
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
    }, [modales.moinsCherModale]);


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
                            <li className={styles.linkOnNav} onClick={()=>setModales({
                                marquesModale: !modales.marquesModale,
                                moinsCherModale: modales.moinsCherModale})}>
                                <Link href={" "}>® Marques</Link>
                            </li>
                            <ul className={styles.listBrand}>
                                {modales.marquesModale && 
                                    items.marques.map((marque) => [
                                            <li className={`${styles.linkOnNav} ${styles.onPriceLink} ${styles.brandLink}`} key={marque}>{marque}</li>
                                        ]
                                    )
                                }
                            </ul>
                        </ul>
                    </li>
                    <li>
                        <h2 className={styles.titleCategoryListItem}>classements</h2>
                        <ul className={styles.listItems}>
                            <li>
                                <ul>
                                    <li onClick={()=>setModales({
                                        moinsCherModale: !modales.moinsCherModale,
                                        marquesModale: modales.marquesModale})} className={styles.linkOnNav}>
                                        <Link href={" "}>PC portable moins chers</Link>
                                    </li>
                                    {modales.moinsCherModale && 
                                    <ul>
                                        {
                                            arr_MoinsCher.map((prix)=>[
                                                <li key={`${prix}-${prix.length}`} className={`${styles.linkOnNav} ${styles.onPriceLink}`} onClick={()=>handle(prix, "price")}><Link href={urlPcPortable}>moins de {prix.toString()}€</Link></li>
                                            ])
                                        }
                                        {/* <li className={`${styles.linkOnNav} ${styles.onPriceLink}`} onClick={()=>handle(1000, "price")}><Link href={urlPcPortable}>moins de 1000€</Link></li>
                                        <li className={`${styles.linkOnNav} ${styles.onPriceLink}`} onClick={()=>handle(2000, "price")}><Link href={urlPcPortable}>moins de 2000€</Link></li> */}
                                    </ul>
                                    }

                                </ul>
                            </li>
                            <li className={styles.linkOnNav} onClick={()=>handle("pc gaming", "tag")}><Link href={urlPcPortable}>PC portable Gaming</Link></li>
                            <li className={styles.linkOnNav} onClick={()=>handle("pc bureau", "tag")}><Link href={urlPcPortable}>PC portable Bureau</Link></li>
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