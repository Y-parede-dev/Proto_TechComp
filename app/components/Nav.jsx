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
                    <p>navigation</p>
                    <ul className={styles.listItems}>
                        <li><Link href={"/"}>🏠 Accueil</Link></li>
                        <li onClick={()=>handle("all", "tag")}>
                            <Link href={urlPcPortable}>💻 Tous nos PC portable</Link>
                        </li>
                        <li>Catégories</li>
                        <li>Comparaisons </li>
                    </ul>
                </li>
                <li>
                    <p>classements</p>
                    <ul className={styles.listItems}>
                        <li>
                            <ul>
                                <li onClick={()=>setMoinsCher(!moinsCher)}>PC portable moins chers</li>
                                {moinsCher && 
                                <>
                                    <li onClick={()=>handle(500, "price")}>moins de 500€
                                    {/* <Link href={urlPcPortable}>moins de 500€</Link> */}
                                    </li>
                                    <li onClick={()=>handle(1000, "price")}><p>moins de 1000€</p></li>
                                    <li onClick={()=>handle(2000, "price")}><p>moins de 2000€</p></li>
                                </>
                                }

                            </ul>
                        </li>
                        <li>PC portable Gaming</li>
                        <li>PC portable Bureau</li>
                        <li onClick={()=>handle("all", "tag")}><Link href={urlPcPortable}>Tous les PC portable</Link></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </li>
                <li>
                    <p>contact</p>
                    <ul className={styles.listItems}>
                        <li>
                            À propos 
                        </li>
                        <li>
                            Contact  
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};
export default Nav;