"use client";
import Link from 'next/link';
import styles from './Nav.module.css';
import FormSearch from './clientComponents/FormSearch';
import { useContext, useState, useEffect} from 'react';
import { SearchCTX } from '../context/SearchCTX';
import { ProductSearchByPrice, ProductSearchByTag } from '@/lib/ProductSearch';
import { useRouter } from 'next/navigation';
import config from '@/config/config.json' assert{type:"json"};
import { FilterNoRepeat } from '@/lib/NoRepeat';
// refactor a faire
const Nav = () => {
    const [inptUser, setinptUser] = useState([]);
    const [by, setBy] = useState("");
    const [moinsCher,setMoinsCher] = useState(false);
    const [pcGamer,setPcGamer] = useState(false);
    const [pcBureau,setPcBureau] = useState(false);
    const [PcMarque,setPcMarque] = useState(false);
    const router = useRouter();
    const [sea,setSea] = useState(false);
    const CTX = useContext(SearchCTX);

    const urlPcPortable = "/pages/pc-portable";
    useEffect(()=>{
        if(sea){
            let idPresent, DATA;
            let syntax;
            if(by==="tag"){
                [idPresent, DATA] = ProductSearchByTag({searchTags:[inptUser]});
                syntax = [inptUser];
                // console.log(syntax)
                // console.log(idPresent)
            }if(by==="price"){
                [idPresent, DATA] = ProductSearchByPrice({searchPrice: inptUser, CTX});
                syntax = inptUser;
            }
            console.log(typeof(syntax));              
            console.log((syntax));              
            CTX.setTAG(syntax);
            idPresent = FilterNoRepeat(idPresent);
            CTX.setSEARCH(idPresent);
            setSea(false);
        }
    },[inptUser]);
    useEffect(()=>{

    }, [moinsCher]);
    const handle = (input, by)=>{
        setSea(true);
        setBy(by);
        setinptUser(input);
        if(by!=="tag"){
            router.push(`/pages/pc-portable`);
        };
    }
    return (
        <nav className={styles.NavLeft}>
            <ul className={styles.listTitles}>
                <li>
                    {/* NAVIGATION */}
                    <h2 className={styles.titleCategoryListItem}>navigation</h2>
                    <ul className={styles.listItems}>
                        <li className={styles.linkOnNav}><Link href={"/"} >🏠 Accueil</Link></li>
                        <li onClick={()=>handle("all", "tag")} className={styles.linkOnNav}>
                            <Link href={urlPcPortable} >💻 Tous nos PC portable</Link>
                        </li>
                        <li className={styles.linkOnNav}>Catégories</li>
                        <li className={styles.linkOnNav}>Comparaisons </li>
                    </ul>
                </li>
                <li>
                    <h2 className={styles.titleCategoryListItem}>classements</h2>
                    <ul className={styles.listItems}>
                        <li>
                            <ul>
                                <li onClick={()=>setMoinsCher(!moinsCher)} className={styles.linkOnNav}>PC portable moins chers</li>
                                {moinsCher && 
                                <>
                                    <li onClick={()=>handle(500, "price")}><p className={`${styles.linkOnNav} ${styles.onPriceLink}`}>moins de 500€</p></li>
                                    <li onClick={()=>handle(1000, "price")}><p className={`${styles.linkOnNav} ${styles.onPriceLink}`}>moins de 1000€</p></li>
                                    <li onClick={()=>handle(2000, "price")}><p className={`${styles.linkOnNav} ${styles.onPriceLink}`}>moins de 2000€</p></li>
                                </>
                                }

                            </ul>
                        </li>
                        <li><p className={styles.linkOnNav}>PC portable Gaming</p></li>
                        <li><p className={styles.linkOnNav}>PC portable Bureau</p></li>
                        <li onClick={()=>handle("all", "tag")} ><Link href={urlPcPortable} className={styles.linkOnNav}>Tous les PC portable</Link></li>
                        <li></li>
                        <li></li>
                        <li></li>
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
    );
};
export default Nav;