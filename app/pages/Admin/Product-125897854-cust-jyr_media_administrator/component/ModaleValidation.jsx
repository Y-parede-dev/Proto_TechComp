"use client";
import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Notation from '@/app/components/clientComponents/Notation';
import {PointsCles as PClesClient} from '@/app/pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles';
import { ref, uploadBytes } from 'firebase/storage';
import { storage, imageRef } from '@/config/configFirebase/conf.firebase';
export const ModaleValidation = ({params}) => {

    const POST = async (dataProduct) => {
        try {
            const response = await fetch(`${process.env.HOST}/api/Admin`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
                ,body: JSON.stringify(dataProduct),
            })
            const data = await response.json();
            if(data.success){
                console.log("produit ajouté avec success")
            }
            else{
                console.log("erreur lors de l'ajout du produit")
            }
        } catch (error) {
            console.error("erreur lors de la requette fetch", error)
        }
    }

    const{dataProduct, setOpenCloseModale} = params;
    const [configIsOk, setConfigIsOk] = useState(false);
    const [notesIsOk, setNotesIsOk] = useState({
        bureau:{
            good:false,
            bad:false
        },
        gaming:{
            good:false,
            bad:false
        }
    })
    const FirebaseImagesUpload = (filename, img) => {
        const storageRef = ref(storage, `pcPortables/${dataProduct.brand}/${dataProduct.id}/${filename}`);
        uploadBytes(storageRef, img)
        console.log(storageRef);
    }
    console.log(dataProduct)
    const closeModal = () => {
        setOpenCloseModale(false)
    }
    const confirm = () =>{
        POST(dataProduct);
        try{

            params.imagePreview?.forEach((img)=>FirebaseImagesUpload(img.file.name, img.file));
        }catch(err){

        }
        // resetState();
        setOpenCloseModale(false)
    }
    useEffect(()=>{
        if(
            dataProduct.config.cpu==='na'||
            dataProduct.config.gpu==='na'||
            dataProduct.config.screen==='na'||
            dataProduct.config.ram==='na' ||
            dataProduct.config.stockage==='na' ||
            dataProduct.config.os==='na'){
            setConfigIsOk(false)
        }
        else{
            setConfigIsOk(true)
        }
    }, []);
    useEffect(()=>{
        if(dataProduct.notedesc.good.length>0){
            setNotesIsOk((prevState)=>({
                ...prevState,
                bureau:{
                    ...prevState.bureau,
                    good:true
                }
            }))
        };
        if(dataProduct.notegaming.good.length>0){
            setNotesIsOk((prevState)=>({
                ...prevState,
                gaming:{
                    ...prevState.gaming,
                    good:true
                }
            }))
        };
        if(dataProduct.notedesc.bad.length>0){
            setNotesIsOk((prevState)=>({
                ...prevState,
                bureau:{
                    ...prevState.bureau,
                    bad:true
                }
            }))
        };
        if(dataProduct.notegaming.bad.length>0){
            setNotesIsOk((prevState)=>({
                ...prevState,
                gaming:{
                    ...prevState.gaming,
                    bad:true
                }
            }))
        };
    },[])
    return(
        <div className={styles.containerFullModale}>
            <div className={styles.blurBackModale}>
                <div className={styles.containerCardAndAffilateArray}>
                    <div className={styles.containerInfo}>
                        <div className={styles.validationProduitInfo}>
                            <h4>
                                Previsualisation produit
                            </h4>
                            <div className={styles.contentInfo}>
                                <div className={styles.infoCol}>
                                    <p>Nombre de photo</p> 
                                    <div className={styles.info}>
                                        {params.imagePreview[0]==='empty'?
                                        
                                        <p className={styles.error}>{params.imagePreview.length-1}</p>:<p>{params.imagePreview.length}</p>}
                                        {params.imagePreview.length===4?
        
                                            <DoneIcon className={styles.DoneIcon}/> :
                                            <ClearIcon className={styles.ClearIcon}/>
                                            
                                        }
                                    </div>
                                </div>
                                <hr/>
                                <div className={styles.infoCol}>
                                    <p>Partie config est </p> 
                                    <div className={styles.info}>
                                    {configIsOk ?
                                    <><span className={styles.valid}>complète</span> <DoneIcon className={styles.DoneIcon}/></>:<><span className={styles.error}>Incomplète</span><ClearIcon className={styles.ClearIcon}/></>}
                                    </div>
                                </div>
                                <hr/>
                                <div className={styles.infoCol}>
                               
                                    <p>Bon points Bureau</p>
                                    <div className={styles.info}>
                                    {notesIsOk.bureau.good ?
                                    <>
                                    <span className={styles.valid}>{notesIsOk.bureau.good.length} élément{notesIsOk.bureau.good.length>1&&"s"}</span> 
                                    <DoneIcon className={styles.DoneIcon}/></>
                                    :<><span className={styles.error}>0 élément</span><ClearIcon className={styles.ClearIcon}/></>
                                    }
                                    </div>
                                    <hr className={styles.hrInside} />
                                    <p>Mauvais points Bureau</p>
                                    <div className={styles.info}>
                                    {notesIsOk.bureau.good ?
                                    <>
                                    <span className={styles.valid}>{notesIsOk.bureau.bad.length} élément{notesIsOk.bureau.bad.length>1&&"s"}</span> 
                                    <DoneIcon className={styles.DoneIcon}/></>
                                    :<><span className={styles.error}>0 élément</span><ClearIcon className={styles.ClearIcon}/></>
                                    }
                                    </div>
                                    <hr className={styles.hrInside} />
                                    <p>Bon points Gaming</p>
                                    <div className={styles.info}>
                                    {notesIsOk.bureau.good ?
                                    <>
                                    <span className={styles.valid}>{notesIsOk.gaming.good.length} élément{notesIsOk.gaming.good.length>1&&"s"}</span> 
                                    <DoneIcon className={styles.DoneIcon}/></>
                                    :<><span className={styles.error}>0 élément</span><ClearIcon className={styles.ClearIcon}/></>
                                    }
                                    </div>
                                    <hr className={styles.hrInside} />
                                    <p>Mauvais points Gaming</p>
                                    <div className={styles.info}>
                                    {notesIsOk.gaming.good ?
                                    <>
                                    <span className={styles.valid}>{notesIsOk.gaming.bad.length} élément{notesIsOk.gaming.bad.length>1&&"s"}</span> 
                                    <DoneIcon className={styles.DoneIcon}/></>
                                    :<><span className={styles.error}>0 élément</span><ClearIcon className={styles.ClearIcon}/></>
                                    }
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <p></p>
                        </div>
                        <div className={styles.litsItemCarroussel}>
                            <img className={styles.imgMod} alt={`Produit de la marque: ${dataProduct?.brand} `} src={params.imagePreview[0]?.preview}></img>
                            <h4>{dataProduct.title}</h4>

                            <Notation produit={dataProduct} param={dataProduct?.usage}/>

                            <PClesClient produit={dataProduct} param={dataProduct?.usage}/>

                            <div className={styles.prix}>

                                <p className={styles.prixMin}>à partir de</p>
                                <affilizz-rendering-component className={styles.affilizzLink} publication-content-id={dataProduct?.btn?.publicationContentId} loading="lazy"></affilizz-rendering-component>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.arrayaff}>
                        <h3>
                            Display tableau Affilizz
                        </h3>
                        <div className={styles.affilizzLink}>
                            <affilizz-rendering-component  publication-content-id={dataProduct?.arrayaff.publicationContentId} loading="lazy"></affilizz-rendering-component>

                        </div>
                    </div>
                    
                    <div className={styles.validModale} onClick={confirm}>
                        <div>
                            <p className={styles.txtBtn}>Enregistrer le produit</p>
                            <div className={styles.barr}>
                            </div>
                        </div>
                    </div>
                    <button className={styles.closeModale} onClick={closeModal}><ClearIcon className={styles.closeModalIcon}/></button>
                </div>
            </div>

        </div>
    )
}