"use client"
// refactor a faire
import {ProductSearchByTag, ProductSearchByPrice, ProductSearchByPriceInOrder, ProductSearchByPriceInDisorder,ProductSearchByBrand, ProductSearchBynotegaming} from "@/lib/ProductSearch";
import styles from "./SuggestionMap.module.css";
import Image from 'next/image';
import Notation from "../clientComponents/Notation";
import {PointsCles} from "../../pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles";
import Link from "next/link";
import { useEffect, useState, useContext, useRef, use } from "react";
import { SearchCTX } from "@/app/context/SearchCTX";
import { Modal, Slider } from '@mui/material';
import {Stack} from '@mui/material';
import { FilterNoRepeat } from "@/lib/FonctionsUtiles";
import { GET as  GetTotalPage} from "@/lib/GetNbPages";

const ListeProduitsPagePcPortable = ({searchSepar, page, by="tag", titreRecherche='votre recherche'})=> {
    const CTX = useContext(SearchCTX);
    const [stateModale, setStatemodales] = useState({
        modaleOpenPrix: false,
        modaleOpenMarque: false
    })
    // const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState({
        currentPage:1,
        totalPages: 0
    })

    const [data, setData] = useState({
        idPresent: "null",
        dataFound:[]
    })
    // let idPresent, data = [];
    const [value,setValue]= useState(5000);
    
    useEffect(()=>{
        const FetchNbPage = async()=>{
            const result =  await GetTotalPage()
            setPages((prevData)=>({...prevData, totalPages: result}))
        }
        FetchNbPage()
    },[])
    let ids = CTX.SEARCH ;
    let searchTags = CTX.TAG;
    useEffect(()=>{
        const SetSearch = async () => {

            if(by =="tag"){
                const [rec__Id, rec__Data] = await ProductSearchByTag({searchTags, page: pages.currentPage});
                setData(()=>({
                    idPresent:rec__Id,
                    dataFound: rec__Data
                }))
            }
        }
        SetSearch();
    },[by, pages.currentPage])
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    };
    try{
        if(isEmpty(ids)) {
            ids=[];
            data.dataFound?.map((elt)=>{
                ids.push(elt.id);
                ids = FilterNoRepeat(ids);
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
                stateModale.modaleOpenPrix&&
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
            const changeResult = async (e, elt) => {
                let searchTags = [elt];
                const [id, nothing] = await ProductSearchByTag({searchTags});
                CTX.setSEARCH(id);
                CTX.setTAG(searchTags);
                e.target.classList.add(styles.t);
            };
            let arrTemp = []; 
            data.dataFound?.map((prod)=>{
                arrTemp.push(prod.brand);
                arrTemp = FilterNoRepeat(arrTemp);
            });
            return(
                stateModale.modaleOpenMarque&&
                <div className={styles.contentBtn}>
                    <ul className={`${styles.listMarquesSearch} ${styles.childCtBtn}`}>
                    {arrTemp?.map((elt)=>[
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
                setStatemodales({
                    modaleOpenPrix: !stateModale.modaleOpenPrix,
                    modaleOpenMarque: false
                })
            break;
            case "marque":
                setStatemodales({
                    modaleOpenPrix: false,
                    modaleOpenMarque: !stateModale.modaleOpenMarque
                })
            break;
            default:
                setStatemodales({
                    modaleOpenPrix: false,
                    modaleOpenMarque: false
                })
            break;
        };
    };
    const FoundBy = () => { // cres un fichier pour cette fonction
        
        const [modal,setModal] = useState(false);
        const [modalNote,setModalNote] = useState(false);
        const [byNote, setbyNote] = useState(false);
        const [order,setOrder] = useState("Faites votre choix");
        const [noteCat,setNoteCat] = useState("Faites votre choix")
        const byOrder = (e) => {
            setOrder(e.target.textContent);
        }
        const byNoteChoice = (e) => {
            setNoteCat(e.target.textContent);
        }
        useEffect(()=>{
            switch(order){
                case "Note":
                    setbyNote(true)
                break;
                case 'Prix croisant':
                    setbyNote(false)
                    ProductSearchByPriceInOrder({searchPrice:order, CTX})
                break;
                case 'Prix décroisant':
                    setbyNote(false)
                    ProductSearchByPriceInDisorder({searchPrice:order, CTX})
                break;
                default:
                    setbyNote(false)
                break;
            }
            
            if(order == 'Note'){
                setbyNote(true)
            }else{
                setbyNote(false)
            }
        }, [order])
        return(
            <div className={styles.contentModalFound}>
                <p className={styles.triezPar} onClick={()=>setModal(!modal)}>triez par:<span className={styles.spanFoundBy}> {order}</span>
                </p>
                <>
                    {modal&&
                    <ul className={styles.listFoundBy}>
                        {/* <li onClick={(e)=>byOrder(e)}>Note</li> */}
                        <li onClick={(e)=>byOrder(e)}>Prix croisant</li>
                        <li onClick={(e)=>byOrder(e)}>Prix décroisant</li>
                        
                    </ul>
                    }
                    {byNote&&
                    <>
                    <p className={styles.triezPar} onClick={()=>setModalNote(!modalNote)}> - <span className={styles.spanFoundBy}> {noteCat}</span></p>
                    {modalNote&&
                    <ul className={`${styles.listFoundBy} ${styles.listFoundByNote}`}>
                        <li onClick={(e)=>byNoteChoice(e)}>Tous</li>
                        <li onClick={(e)=>byNoteChoice(e)}>Gaming</li>
                        <li onClick={(e)=>byNoteChoice(e)}>Bureau</li>
                    </ul>
                    }
                    </>
                }
                </>
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
                                {CTX.TAG?.map(tag=>[
                                    tag==" " || tag==""?<></>:
                                        <span key={tag} className={styles.spanTagsTitle}>
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
                    CTX.TAG?.map(tag=>[
                    tag==" " || tag==""?<></>:
                    
                    <span key={tag} className={styles.spanTags}>{` ${tag},`} </span> ])}
                
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
                    {data.dataFound?.map(produitElt=> [
                        ids?.map(idSearchReturn=>[
                            produitElt.id==idSearchReturn&&
                            <Link key={produitElt.id} className={styles.LinkProduit} href={`/pages/pc-portable/${produitElt.id}`}>
                                {/* ${produitElt.id} */}
                                <li className={styles.litsItemCarroussel}>
                                    <Image loading="eager" alt={`Produit de la marque: ${produitElt.brand} `}  width={200} height={200} src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FB_PROJECT_ID}.appspot.com/o/pcPortables%2F${produitElt.brand}%2F${produitElt.id}%2F${produitElt.images}?alt=media`}/>
                                    <h4>{produitElt.title}</h4>
                                    <Notation produit={produitElt} param={produitElt.usage}/>
                                    <PointsCles produit={produitElt} param={produitElt.usage}/>
                                    <div className={styles.prix}> <p className={styles.prixMin}>à partir de</p> <affilizz-rendering-component className={styles.affilizzLink} publication-content-id={produitElt.btn?.publicationContentId} loading="lazy"></affilizz-rendering-component></div>
                                    
                                </li>
                            </Link>
                        ])
                    ])}
                </ul>

                <div className={styles.btnpagination}>
                    <span onClick={(e)=>setPages((prevData)=>({
                        ...prevData,
                        currentPage:1
                    }))}>first</span>
                    {pages.currentPage>1&&
                        <span onClick={(e)=>setPages((prevData)=>({
                            ...prevData,
                            currentPage:parseInt(pages.currentPage-1)}))}>{pages.currentPage-1}</span>
                    }

                    <span>{pages.currentPage}</span>
                    {
                        pages.currentPage +1 <=pages.totalPages&&
                            <span onClick={(e)=>setPages((prevData)=>({
                                ...prevData,
                                currentPage:pages.currentPage+1}))}>{pages.currentPage+1}</span>
                    }
                    {
                        pages.currentPage +2 <=pages.totalPages&&
                            <span onClick={(e)=>setPages((prevData)=>({
                                ...prevData,
                                currentPage:parseInt(pages.currentPage-2)}))}>{pages.currentPage+2}</span>
                    }
                    <span onClick={(e)=>setPages((prevData)=>({
                        ...prevData,
                        currentPage: pages.totalPages
                    }))}>last</span>
                </div>
            </div>
        </div>
    );
};
export default ListeProduitsPagePcPortable;