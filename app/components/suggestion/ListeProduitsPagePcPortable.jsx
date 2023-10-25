"use client"
// refactor a faire
import {ProductSearchByTag, ProductSearchByPrice, ProductSearchByBrand, ProductSearchByNoteGaming} from "@/lib/ProductSearch";
import styles from "./SuggestionMap.module.css";
import Image from 'next/image';
import Notation from "../clientComponents/Notation";
import PointsCles from "../../pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { SearchCTX } from "@/app/context/SearchCTX";
import { Modal, Slider } from '@mui/material';
import {Stack} from '@mui/material';
import { FilterNoRepeat } from "@/lib/NoRepeat";

const ListeProduitsPagePcPortable = ({searchSepar, page, by = "tag", titreRecherche='votre recherche'})=> {
    const CTX = useContext(SearchCTX);
    const [modaleOpen,setModaleOpen]= useState(false);
    const [modaleOpenMarque,setModaleOpenMarque]= useState(false);

    const [value,setValue]= useState(5000);
    
    let ids = CTX.SEARCH ;
    let searchTags = CTX.TAG;

    let [idPresent, data] = ProductSearchByTag({searchTags});
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    };
    try{
        // ids = ids.SEARCH
        if(isEmpty(ids)) {
            ids=[];
            data.map((elt)=>{
                ids.push(elt.id);
                ids = FilterNoRepeat(ids); //ids.filter((x,i)=>ids.indexOf(x)===i)
            });
        };
    }catch(err){
        console.error(err);
    };
    const handleChange = (e, newValue) => {
        setValue(newValue);
        let searchPrice=newValue;
        ProductSearchByPrice({searchPrice, CTX});
    }
    const Content = ({params}) => {
        if(params.value=='prix'){
            return(
                modaleOpen&&
                <div className={styles.contentBtn}>
                    <div className={styles.childCtBtn}>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Slider valueLabelDisplay="auto" min={100} max={5000} aria-label="Prix" value={value} onChange={handleChange} />
                        </Stack>
                    
                        <p>{value}€</p>
                    </div>
                </div>
            );
        };
        if(params.value=="marque"){
            // const [select, setSelect] = useState(false);
    
            const changeResult = (e, elt) => {
                let searchTags = [elt];
                const [id, nothing] = ProductSearchByTag({searchTags});
                CTX.setSEARCH(id);
                CTX.setTAG(searchTags);
                e.target.classList.add(styles.t);
                // setSelect(true);
            };
            let arrTemp = [];
            // let v = 0;
            data.map((prod)=>{
                arrTemp.push(prod.brand);
                arrTemp = FilterNoRepeat(arrTemp);
            });
            return(
                modaleOpenMarque&&
                <div className={styles.contentBtn}>
                    <ul className={`${styles.listMarquesSearch} ${styles.childCtBtn}`}>
                    {arrTemp.map((elt)=>[
                        <li key={elt} onClick={(e)=>changeResult(e,elt)}>{elt}</li>
                    ])}
                    </ul>
                </div>
            );
        };
    };
    const ButonSearch = ({params}) => { // cres un fichier pour cette fonction
        const styleBtnBold = {
            fontWeight:`700`
        };
        const styleBtn = {
            fontWeight:`300`
        };
        
        return(
            <div>
                <ul>
                    <li className={styles.btn} style={{ height: `max-content`}}>
                        <button onClick={()=>openCloseModale(params.value)} value={params.value}>
                            {params.value}
                        </button>
                    </li>
                </ul>
            </div>
        );
    };
    const openCloseModale = (value) => { // cres un fichier pour cette fonction
        switch(value){
            case "prix":
                setModaleOpen(!modaleOpen);
                setModaleOpenMarque(false);
            break;
            case "marque":
                setModaleOpenMarque(!modaleOpenMarque);
                setModaleOpen(false);
            break;
            default:
                setModaleOpenMarque(false);
                setModaleOpen(false);
            break;
        };
    };
    const FoundBy = () => { // cres un fichier pour cette fonction
        
        const [modal,setModal] = useState(false);
        const [order,setOrder] = useState("Note gaming");
        const byOrder = (e) => {
            setOrder(e.target.textContent);
        }
        useEffect(()=>{
            // if(modal){console.log(CTX)}
            
            let arrTemp = [];
            if(CTX.IDPRESENT){
                data.map((produit)=>{
                    CTX.SEARCH.map(idOnCtx=>{
                        if(idOnCtx === produit.id){
                            arrTemp.push({id:produit.id, note:produit.noteDesc.int});
                            
                        };
                    });
                });
            };
            // console.log("arrtemp BEFORE!", arrTemp)

            arrTemp.sort((a,b)=> b.note - a.note);
            const arrTempR=[];
            arrTemp.map((elt)=>{
                arrTempR.push(elt.id);
            });
            // console.log(arrTempR)
            // CTX.setSEARCH(arrTempR)

            setModal(false);
        },[order]);
        return(
            <div className={styles.contentModalFound}>
                <p className={styles.triezPar} onClick={()=>setModal(!modal)}>triez par:<span className={styles.spanFoundBy}> {order}</span>
                </p>
                {modal&&
                <ul className={styles.listFoundBy}>
                    <li onClick={(e)=>byOrder(e)}>Note gaming</li>
                    <li onClick={(e)=>byOrder(e)}>Note bureau</li>
                    <li onClick={(e)=>byOrder(e)}>Prix croisant</li>
                    <li onClick={(e)=>byOrder(e)}>Prix décroisant</li>
                </ul>
                }
            </div>
        );
    };
    return(
        <div className={styles.resultSearchContainer}>
            {CTX.TAG && 
            <>
                <h2 className={styles.resultSearchTitle}>Comparatif pc portable
                    <span className={styles.titleDynSearch}>
                    
                    { 
                        typeof(CTX.TAG)==="number"?
                        <span className={styles.spanTagsTitle}> {` à moins de  ${CTX.TAG}€ `} </span>
                        :
                        <>
                        {
                            <>
                                {` pour: "`}
                                {CTX.TAG.map(tag=>[
                                    tag==" " || tag==""?<></>:
                                        <span className={styles.spanTagsTitle}>
                                            {CTX.TAG.findLast(()=>tag)?
                                            <>{` ${tag}`}</>:
                                            <>{` ${tag} - `}</>
                                            }
                                        </span>
                                ])}
                                {`"`}
                            </>
                        }
                        </>
                        }
                        
                    </span>
                </h2>
                
                <p>Tous les pc portable 
                    {
                    typeof(CTX.TAG)==="number"?
                    <span className={styles.spanTags}>{` à moins de ${CTX.TAG}€`} </span>:
                    CTX.TAG.map(tag=>[
                    tag==" " || tag==""?<></>:
                    
                    <span className={styles.spanTags}>{` ${tag},`} </span> ])}
                
                </p>
            </>
            }

            
            <div className={styles.resultSearchContainerListItems}>
                <h3>{titreRecherche}</h3>
                <div className={styles.btnContainer}>
                    <ButonSearch params={{value:"prix"}}/>
                    <ButonSearch params={{value:"marque"}}/>
                </div>
                <>
                    <Content params={{value:"prix"}}/>
                    <Content params={{value:"marque"}}/>
                </>
                <>
                    <FoundBy/>
                </>
                <ul className={styles.listItemsResult}>
                    {data.map(produitElt=> [
                        ids.map(idSearchReturn=>[
                            produitElt.id==idSearchReturn&&
                            <Link key={produitElt.id} className={styles.LinkProduit} href={`/pages/pc-portable/${produitElt.id}`}>
                                <li className={styles.litsItemCarroussel}>
                                    <Image alt={`Produit de la marque: ${produitElt.brand} `} width={200} height={200} src={produitElt.images[0]}/>
                                    <h4>{produitElt.title}</h4>
                                    <Notation produit={produitElt} param={produitElt.usage}/>
                                    <PointsCles produit={produitElt} param={produitElt.usage}/>
                                    <div className={styles.prix}> <p className={styles.prixMin}>à partir de</p> <affilizz-rendering-component className={styles.affilizzLink} publication-content-id={produitElt.btn.publicationContentId} loading="lazy"></affilizz-rendering-component></div>
                                    
                                </li>
                            </Link>
                        ])
                    ])}
                </ul>
            </div>
        </div>
    );
};
export default ListeProduitsPagePcPortable;