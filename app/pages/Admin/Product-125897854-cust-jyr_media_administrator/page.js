"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { descriptions, arrayResolution, arrayGoodBad, arrRamResult, arrGpuResult, arrProcResult } from './dataBrut/databrut';
import { TableauNotes,  ConfigRender } from './component/componentsCustom';
import { modelProduit } from './model/model';

import {checkElement,checkIntElement,checkElementGpu, moyeneElement, setDescribeAuto, setGoodBadPointAuto } from './utils/utils.custom';
import {ModaleValidation} from './component/ModaleValidation';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/navigation';
// import fs from 'fs/promises';

const pageAdminAddPutDeleteProduct = () => {
    // ::START::REQ:POST - Sauvegarde un produit dans le fichier json associer
    // let uid = 'wait';
    // const [isAdmin, setIsAdmin] = useState(false);
    // const router = useRouter();
    
    // useEffect(()=>{
    //     if(localStorage.getItem('uidAdmin'===process.env.ADMIN_UID)){
    //         setIsAdmin(true)
    //     }
    // },[])
    // useEffect(()=>{
    //     if(!isAdmin){
    //         router.replace('/pages/Admin/connect');
    //     }
    // },[isAdmin])
    // ::END::REQ:POST
    const PageAdminCreateProduct = () => {
        const [dataProduct, setDataProduct] = useState({
            ...modelProduit
        })
        const [imagePreview, setImagePreview] = useState(['empty'])
        const [notationGo, setNotationGo] = useState(false);
        const [notesTemp, setnotesTemp]  = useState({
            cpu:0,
            gpu:0,
            ram:0,
        })
        const [openCloseModale, setOpenCloseModale] = useState(false);
        const iconValitation = []
        useEffect(() => {
            // Ajouter la classe pour bloquer le défilement
            if (openCloseModale) {
                document.body.style.overflow = 'hidden';
                // document.header.style.zIndex = '1';
            } else {
                document.body.style.overflow = 'visible';
            }
            // Nettoyer l'effet
            return () => {
                document.body.style.overflow = 'visible';
            };
        }, [openCloseModale]);
        // ::START::bonus Change le denominateur dans la description SEO
        useEffect(()=>{
            if(
                dataProduct.brand==='dell'    ||
                dataProduct.brand==='lenovo'  ||
                dataProduct.brand==='samsung' ||
                dataProduct.brand==='hp'){
                setDataProduct({denominateur:'le'})
            };
        },[dataProduct.brand]);

        useEffect(()=>{
            setDataProduct((prevDataProduct)=>({
                ...prevDataProduct,
                brand: prevDataProduct.brand.toLowerCase()
            }))
        }, [dataProduct.brand]);
        useEffect(()=>{
            setDataProduct((prevDataProduct)=>({
                ...prevDataProduct,
                prix: parseInt(prevDataProduct.prix)
            }));
        },[dataProduct.prix]);
        useEffect(()=>{
            if(dataProduct.config.cpu!=='na'){
                const notesCheck = {
                    cpu: checkElement({element:dataProduct.config.cpu, array:arrProcResult}),
                    gpu: checkElementGpu({element:dataProduct.config.gpu, array:arrGpuResult}),
                    ram: checkIntElement({val:dataProduct.config.ram, Obj:arrRamResult}),
                }
                setnotesTemp({
                    cpu:notesCheck.cpu,
                    gpu:notesCheck.gpu,
                    ram:notesCheck.ram
                })
                const describeCheck = {
                    rapidite: setDescribeAuto({data:dataProduct,note:notesCheck.ram, element:'rapidite'}), 
                    gaming: setDescribeAuto({data:dataProduct,note:notesCheck.gpu, element:'gaming'}),
                    durabilite: setDescribeAuto({data:dataProduct,note: moyeneElement({notes:[notesCheck.cpu, notesCheck.gpu]}), element:'durabilite'}),
                    confort: setDescribeAuto({data:dataProduct,note:notesCheck.ram, element:'confort'}),
                }
                const goodBadPointsCheck = {
                    good:setGoodBadPointAuto({data: dataProduct,note:moyeneElement({notes:[notesCheck.cpu, (notesCheck.gpu>0&&notesCheck.gpu), notesCheck.ram]})}).good,
                    bad:setGoodBadPointAuto({data:dataProduct,note:moyeneElement({notes:[notesCheck.cpu, notesCheck.gpu, notesCheck.ram]})}).bad
                }
                setDataProduct((prevData)=>({
                    ...prevData,
                    notedesc:{
                        good:goodBadPointsCheck.good,
                        bad:goodBadPointsCheck.bad,
                        int: notesCheck.cpu
                    },
                    notegaming:{
                        good:goodBadPointsCheck.good,
                        bad:goodBadPointsCheck.bad,
                        int: notesCheck.gpu
                    },
                    pointsclef:prevData.pointsclef?.map((point)=>({
                        gaming: {
                            ...point.gaming,
                            description: describeCheck.gaming,
                            note: notesCheck.gpu
                        },
                        rapidite:{
                            ...point.rapidite,
                            description: describeCheck.rapidite,
                            note: notesCheck.ram
                        },
                        durabilite:{
                            ...point.durabilite,
                            description: describeCheck.durabilite,
                            note: moyeneElement({notes:[notesCheck.cpu, notesCheck.gpu]})<5?moyeneElement({notes:[notesCheck.cpu, notesCheck.gpu]})+3:moyeneElement({notes:[notesCheck.cpu, notesCheck.gpu, notesCheck.ram]})
                        },
                        confort: {
                            ...point.confort,
                            description: describeCheck.confort,
                            note: notesCheck.ram
                        }
                    }))
                }))
            }
        },[notationGo])
        // ::START:: Set l'ID du produit et sa description SEO
        useEffect(()=>{
            try {
                setDataProduct((prevDataProduct)=>({
                    ...prevDataProduct,
                    id: prevDataProduct.title.replaceAll(' ', '-'),
                    description: `Découvrez et comparez les caractéritiques, performances et prix de ${dataProduct.denominateur} ${dataProduct.title} sur itek-comparateur.fr notre site de comparateur. Ce ${dataProduct.title} offre une expérience immersive avec sa configuration optimisée. Trouvez le meilleur prix et faites le bon choix pour vos besoins avec Itek Comparateur`
                }));
            } catch (error) {
                console.error(error);
            };
            try {
                if(dataProduct.id!=="null" &&dataProduct.id.includes(',')){
                    setDataProduct((prevData)=>({
                        ...prevData,
                        id: dataProduct.id.replaceAll(',', "")
                    }));
                };
                if(dataProduct.id!=="null" &&dataProduct.id.includes('"')){
                    setDataProduct((prevData)=>({
                        ...prevData,
                        id: dataProduct.id.replaceAll('"', "")
                    }));
                };
                if(dataProduct.id!=="null" &&dataProduct.id.includes("'")){
                    setDataProduct((prevData)=>({
                        ...prevData,
                        id: dataProduct.id.replaceAll("'", "")
                    }));
                };
            } catch (error) {
                console.error(error);
            };
        }, [dataProduct.title, dataProduct.brand]);
        // ::END::

        useEffect(()=>{
            let Arrtmp= [];
            switch(dataProduct.resolution){
                case '3840 x 2160':
                    Arrtmp=["ultra"];
                break;
                case '3200 x 1800':
                    Arrtmp=['haut'];
                break;
                case '2560 x 1440':
                    Arrtmp=['moyen'];
                break;
                case '1920 x 1080':
                    Arrtmp=['bas'];
                break;
                default:
                    console.log(`resolution: ${dataProduct.resolution}`)
                break;
            }
            if(dataProduct.title.includes('OLED')||dataProduct.title.includes('Oled')||dataProduct.title.includes('oled')){
                Arrtmp.push('oled')
            }
            setDataProduct((prevDataProduct)=>({
                ...prevDataProduct,
                tags:[
                    prevDataProduct.brand,
                    prevDataProduct.usage,
                    ...Arrtmp,
                    prevDataProduct.config.cpu,
                    prevDataProduct.config.gpu
                ]
            }))
        },[dataProduct.title,dataProduct.brand, dataProduct.usage, dataProduct.config.cpu,dataProduct.config.gpu])

    
        const handleSubmit=(e)=>{
            e.preventDefault();
            // console.log(dataProduct);
            setOpenCloseModale(true)
            

        };
        const PointsCles = () => {
            const ref = useRef();
            return (
                <>
                    <h2>points clés</h2>
                    <ul className={styles.ulPCles}>
                        { dataProduct.pointsclef?.map((point, index)=>[
                            <div key={index}>
                                <li className={styles.listItemPCles}>

                                    <h3>{point.gaming.nom}</h3>
                                    <p className={styles.txtChoix}>Note gaming:</p>
                                    <>{point.gaming.note}</>
                                    {/* <TableauNotes parametre={{pointId:point.gaming.id, setDataProduct, notes, isPointCle:true}} /> */}
                                    <div>
                                    <p className={styles.txtChoix} >Description part gaming:</p>
                                    <p>{point.gaming.description?.replaceAll('<strong>',"").replaceAll('</strong>',"")}</p>

                                    </div>
                                </li>
                                <li className={styles.listItemPCles}>
                                    <h3>{point.rapidite.nom}</h3>
                                    <p className={styles.txtChoix}>Note rapidite:</p>
                                    <>{point.rapidite.note}</>
                                    <div>
                                        <p className={styles.txtChoix} >Description part rapidite:</p>
                                        <p>{point.rapidite.description?.replaceAll('<strong>',"").replaceAll('</strong>',"")}</p>
                                    </div>
                                </li>
                                <li className={styles.listItemPCles}>
                                    <h3>{point.durabilite.nom}</h3>
                                    <p className={styles.txtChoix}>Note durabilite:</p>
                                    <>{point.durabilite.note}</>
                                    <div>
                                        <p className={styles.txtChoix} >Description part durabilite:</p>
                                        <p>{point.durabilite.description?.replaceAll('<strong>',"").replaceAll('</strong>',"")}</p>
                                    </div>
                                </li>
                                <li className={styles.listItemPCles}>
                                    <h3>{point.confort.nom}</h3>
                                    <p className={styles.txtChoix}>Note confort:</p>
                                    <>{point.confort.note}</>
                                    <div>
                                    <p className={styles.txtChoix} >Description part confort:</p>
                                    <p>{point.confort.description?.replaceAll('<strong>',"").replaceAll('</strong>',"")}</p>
                                    </div>
                                </li>
                            </div>
                        ])
                        }
                    </ul>
                </>
            )
        }
        const DetailBureauGaming = ({parametres}) => {
            return(
                <>
                    <ul className={styles.listDetails}>
                    <h3>{parametres.target==="notedesc"?
                    "Bureau": "Gaming"}</h3>
                        <li className={styles.listItemPCles}>
                            <p>Note {parametres.target==="notedesc"?
                    "Bureau :": "Gaming :"} {dataProduct[parametres.target]?.int}</p>
                            <h4 className={styles.GoddBadTitle}>Bon points</h4>
                            <ul className={`${styles.renderGoodPoint} ${styles.renderPoint}`}>
                                {
                                    dataProduct[parametres.target].good?.map((elt, index)=>[
                                        <li key={index}>{elt}</li>
                                    ])
                                }
                            </ul>
                            <h4 className={styles.GoddBadTitle}>Mauvais point (en choisir au moins 1)</h4>
                            <ul className={`${styles.renderBadPoint} ${styles.renderPoint}`}>
                                {
                                    dataProduct[parametres.target].bad?.map((elt, index)=>[
                                        <li key={index}>{elt}</li>
                                    ])
                                }
                            </ul>
                        </li>
                    </ul>
                </>
            )
        }
        const splitBaliseAffil = (balise) => {
            const match = /publication-content-id="([^"]*)"/.exec(balise);
            if (match) {
                const baliseSplit = match[1];
                return baliseSplit
            } else {
                console.error("Pattern not found in the provided string.");
            }
        }
        const ImagesGestion = () => {
            const [imagesState, setImagesStates] = useState({
                images:[],
                preview:'empty url'
            })
            const handleChangeimages = (e) => {
                console.log('image change')
                console.log(imagePreview)
                const selectedImages = Array.from(e.target.files);
                const imagesWithPrev = selectedImages?.map((image)=>({
                    file: image,
                    preview: URL.createObjectURL(image)
                }))
                setImagesStates((previmageState)=>({
                    ...previmageState,
                    images:[ ...previmageState.images, ...imagesWithPrev ]}))
            }
            const deleteImage = (e) =>{
                const imagesTemps = []
                console.log("↓ imagesState ↓")
                console.log(imagePreview)
                console.log("↑ imagesState ↑")

                imagePreview?.map((imageSaved, index)=>{
                    console.log("imageSaved file name", imageSaved.file.name)
                    console.log("element file name", e.file.name)
                    console.log("type imageSaved file name", imageSaved.file.name)
                    console.log("type element file name", e.file.name)
                    if(imageSaved.file.name !== e.file.name){
                        imagesTemps.push(imageSaved)
                        console.log('imagesTemp in loop', imagesTemps)
                    }else{
                        URL.revokeObjectURL(imagesState.images[index]?.image.preview);
                    }
                })
                setImagesStates((prevDataProduct)=>({
                    ...prevDataProduct,
                    images:[...imagesTemps]
                }))
                setImagePreview([...imagesTemps])
            }
            useEffect(()=>{
                if(imagesState.images[0]?.file!==undefined){
                    setDataProduct((prevDataProduct)=>({
                        ...prevDataProduct,
                        images:[imagesState.images[0].file.name]}))
                        if(imagePreview[0]!=="empty"){
                            setImagePreview((prevImagePreview)=>[...prevImagePreview,...imagesState.images])
                        }else{
                            setImagePreview([...imagesState.images])
                        }
                }
            }, [imagesState.images])
            return(
                <div className={styles.containerImageDwl}>
                    <input className={styles.inputFile} onChange={(e)=>{handleChangeimages(e)}} type='file' multiple accept="image/png, image/gif, image/jpeg, image/avif, image/webp"/>
                    <ul className={styles.listImagesPrev}>
                        {imagePreview[0]!=="empty"&&
                            imagePreview?.map((image, index)=>[
                                <li className={styles.imaeItem} key={index}>
                                    <img alt='preview before create' width={100} height={100} src={`${image.preview}`}/>
                                    <span onClick={()=>deleteImage(image)} className={styles.deleteIMG}><ClearIcon/></span>
                                </li>
                            ])
                        }
                    </ul>
                </div>
            )
        }
        return(
            <section className={`${styles.main}`}>
                <h1>Ajout de produit</h1>
                <form className={`${styles.formProduct}`} onSubmit={(e)=>handleSubmit(e)}>

                    <div className={`${styles.zoneItem} ${styles.zone_infoDebase}`}>
                        <h2>Informations de base</h2>
                        <ul className={styles.Form_list}>
                            <li className={styles.Form_list_elt}>
                                <label htmlFor='titre'>Titre</label>
                                <input className={styles.inputDesign}
                                placeholder={dataProduct.title}
                                onChange={(e)=>{
                                    setDataProduct((prevDataProduct)=>
                                    ({...prevDataProduct,
                                        title:e.target.value}))}}
                                    name='titre'
                                    id='titre'
                                    required/>
                            </li>
                            <li className={styles.Form_list_elt}>
                                <label htmlFor='marque'>marque</label>
                                <input className={styles.inputDesign} placeholder={dataProduct.brand} onChange={(e)=>setDataProduct((prevDataProduct)=>({...prevDataProduct, brand:e.target.value}))} name='marque' id='marque' required/>
                                {/* <p>{dataProduct.brand}</p> */}
                            </li>
                            <li className={styles.Form_list_elt}>
                                <label htmlFor='resolution'>resolution</label>
                                <select className={styles.select} name='resolution' id='resolution' onChange={(e)=>{setDataProduct((prevDataProduct)=>({...prevDataProduct,resolution:e.target.value}))}}>
                                    {arrayResolution?.map((elt, index)=>[
                                        <option value={elt} key={index}>{elt}</option>
                                    ])}
                                </select>
                            </li>
                            <li className={styles.Form_list_elt}>
                                <label htmlFor='prix'>Prix</label>
                                <input className={styles.inputDesign} placeholder='Uniquement un nombre entier' inputMode='numeric' pattern='[0-9]*' type='text' onChange={(e)=>{setDataProduct((prevDataProduct)=>({...prevDataProduct, prix: e.target.value}))}}/>
                                {/* <p>{dataProduct.prix}€</p> */}
                            </li>
                        </ul>
                        <div className={styles.Form_list_eltImgs}>
                            <h3>Images</h3>
                            <ImagesGestion />
                            <p> <i> <span style={{color: "red"}}>‼ Attention ‼</span> images veillez ajouter les 4 images du produit la premiere doit être l'image vue de face du pc dans la mesure du possible </i> </p>
                        </div>
                        <p className={styles.productID}>ID du produit: <span>{dataProduct.id}</span></p>
                    </div>
                    <div className={`${styles.zoneItem} ${styles.zone_config}`}>
                        {ConfigRender(dataProduct, setDataProduct, setNotationGo)}
                        
                    </div>
                    <div className={`${styles.zoneItem} ${styles.containerBaliseAffil}`}>
                        <h2>Balises affilizz</h2>
                        <ul className={styles.balisesList}>
                            <li className={styles.balise}>
                                <label htmlFor='tableauAff'>Balise tableau</label>
                                <input className={styles.inputDesign} onChange={(e)=>{
                                    setDataProduct((prevDataProduct)=>({
                                        ...prevDataProduct,
                                        arrayaff:{
                                            publicationContentId: splitBaliseAffil(e.target.value)
                                        }
                                    }))
                                }} name='tableauAff' id="tableauAff"/>
                            </li>
                            <li className={styles.balise}>
                            <label htmlFor='btnAff'>Balise bouton</label>
                            <input className={styles.inputDesign} onChange={(e)=>{
                                    setDataProduct((prevDataProduct)=>({
                                        ...prevDataProduct,
                                        btn:{
                                            publicationContentId: splitBaliseAffil(e.target.value)
                                        }
                                    }))
                                }} name='btnAff' id="btnAff"/>
                            </li>
                        </ul>
                    </div>
                    <div className={`${styles.zoneItem} ${styles.pointsClesContainer}`}>
                        <PointsCles />
                    </div>
                    <div className={`${styles.zoneItem} ${styles.notedescContainer}`}>
                        <h2>Details</h2>

                        <DetailBureauGaming parametres={{
                            pointId: dataProduct.notedesc?.int, setDataProduct, isPointCle: false, target: "notedesc"}}/>
                        <DetailBureauGaming parametres={{pointId: dataProduct.notegaming?.int, setDataProduct,  isPointCle: false, target: "notegaming"}}/>
                        <div className={`${styles.tagZone} ${styles.zone_parametrage}`}>
                        
                    </div>
                    <div className={styles.bgTags}>
                        <h3>Partie Tags code promo</h3>
                        <ul>
                            <li className={styles.fulltag}>
                                <p>Tags: </p>
                                <ul className={styles.listTags}>
                                    {dataProduct.tags.length>0&&dataProduct.tags.map((tag, index)=>[
                                        <li className={`tag_${styles[tag]}`}id={tag} key={index}>{tag} </li>
                                    ])}
                                </ul>
                            </li>
                            <li>
                                <div className={styles.Form_list_elt}>bonus: <input placeholder='naJM par défaut'/></div>
                            </li>
                        </ul>
                    </div>
                </div>
                    
                    
                    

                    <div className={`${styles.zoneItem} ${styles.zone_SEO}`}>
                        <h2>Partie SEO</h2>
                        <p>titre {dataProduct.title}</p>
                        <ul>
                            <li className={styles.Form_list_elt}>
                                <p className={styles.description?.replaceAll('<strong>',"").replaceAll('</strong>',"")}><span>Description du produit: </span>{dataProduct.description}</p>
                            </li>

                        </ul>
                    </div>
                    
                    
                    <div className={`${styles.zoneItem} ${styles.Conseil}`}>
                        <label htmlFor='conseil'>Conseil</label>
                        <select className={styles.select} value={dataProduct.conseil} onChange={(e)=>{setDataProduct((prevDataProduct)=>({
                            ...prevDataProduct,
                            conseil: e.target.value
                        }))}} name='conseil' id='conseil'>
                            <option>Ce pc est conseiller pour une utiliseation gaming</option>
                            <option>Ce pc n'est pas conseiller pour une utilisation gaming</option>
                        </select>
                        <select className={styles.select} value={dataProduct.conseil} onChange={(e)=>{setDataProduct((prevDataProduct)=>({
                            ...prevDataProduct,
                            usage: e.target.value.split('usage ')[1]
                        }))}} name='conseil' id='conseil'>
                            <option>Choisir une utilisation</option>
                            <option>usage gaming</option>
                            <option>usage bureau</option>
                            <option>usage gaming/bureau</option>
                        </select>
                    </div>
                    <input className={styles.btnSubmit} value={'Crée le produit'} type='submit'/>
                </form>
                <>
                    {openCloseModale?
                    <ModaleValidation params={{dataProduct, setOpenCloseModale,imagePreview, setImagePreview}}/>:<></>}
                </>
            </section>
        )
    };

    // if(typeof(window)!==undefined){
    //     uid=localStorage.getItem('uidAdmin')
    // }
    return(<>redirect</>)
    // if(isAdmin){
    //     return(
    //         <>
    //             <PageAdminCreateProduct ></PageAdminCreateProduct>
    //         </>
    //     );
    // }
    // else{
    //     return(<>redirect</>)
    // }
    
};
export default pageAdminAddPutDeleteProduct;