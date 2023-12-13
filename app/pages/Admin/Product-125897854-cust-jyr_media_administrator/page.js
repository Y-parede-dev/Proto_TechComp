"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { descriptions, arrayResolution, arrayGoodBad } from './dataBrut/databrut';
import { TableauNotes } from './component/componentsCustom';
import { modelProduit } from './model/model';
import { ConfigRender } from './component/componentsCustom';
import { Image } from 'next/image';
import { ref, uploadBytes } from 'firebase/storage';
import { imageRef, storage } from '@/config/configFirebase/conf.firebase';
// import fs from 'fs/promises';

const pageAdminAddPutDeleteProduct = () => {
    // ::START::REQ:POST - Sauvegarde un produit dans le fichier json associer
    const POST = async (dataProduct) => {
        try {
            const response = await fetch("/api/Admin", {
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
    // ::END::REQ:POST

    
    
    const Formulaire__AddProduct = () => {
        const [dataProduct, setDataProduct] = useState({
            ...modelProduit
        })
        
        const [urlTemp, setUrlTemp] = useState('empty')
        
        const notes = []
        for(let i=0;i<11;i++){
            notes.push(i)
        }
        // console.log(notes)
        
        useEffect(()=>{
            setDataProduct((prevDataProduct)=>({
                ...prevDataProduct,
                pointsClef:prevDataProduct.pointsClef.map((point, index)=>({
                    ...point,
                    gaming:{
                        ...point.gaming,
                        description: descriptions(dataProduct).gaming[0]
                    },
                    rapidite:{
                        ...point.rapidite,
                        description:descriptions(dataProduct).rapidite[0]
                    },durabilite:{
                        ...point.durabilite,
                        description:descriptions(dataProduct).durabilite[0]
                    },confort:{
                        ...point.confort,
                        description:descriptions(dataProduct).confort[0]
                    }
                }))
            }))
        },[])
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
        //::END::bonus
        //::START:: retourne la marque en minuscule
        useEffect(()=>{
            setDataProduct((prevDataProduct)=>({
                ...prevDataProduct,
                brand: prevDataProduct.brand.toLowerCase()
            }))
        }, [dataProduct.brand]);
        // ::START:: Set le type du prix sur number
        useEffect(()=>{
            setDataProduct((prevDataProduct)=>({
                ...prevDataProduct,
                prix: parseInt(prevDataProduct.prix)
            }));
        },[dataProduct.prix]);
        useEffect(()=>{
            setDataProduct((prevDataProduct)=>({
                ...prevDataProduct,
                noteDesc:{
                    ...prevDataProduct.noteDesc,
                    int: parseInt(prevDataProduct.noteDesc.int)
                }
            }));
        },[dataProduct.noteDesc.int]);
        useEffect(()=>{
            setDataProduct((prevDataProduct)=>({
                ...prevDataProduct,
                noteGaming:{
                    ...prevDataProduct.Gaming,
                    int: parseInt(prevDataProduct.noteGaming.int)
                }
            }));
        },[dataProduct.noteGaming.int]);
        // ::END::

        // ::START:: Set l'ID du produit et sa description SEO
        useEffect(()=>{
            try {
                setDataProduct((prevDataProduct)=>({
                    ...prevDataProduct,
                    id: prevDataProduct.title.replaceAll(' ', '-'),
                    description: `Découvrez et comparez les spécifications, performances et prix de ${dataProduct.denominateur} ${dataProduct.title} sur itek-comparateur.fr notre site de comparateur. Cet ${dataProduct.title} offre une expérience immersive avec sa configuration optimisée. Trouvez le meilleur prix et faites le bon choix pour vos besoins  avec ${dataProduct.title}`
                }))
            } catch (error) {
                console.error(error);    
            }
            try {
                if(dataProduct.id!=="null" &&dataProduct.id.includes(',')){
                    dataProduct.id = dataProduct.id.replace(',', "")
                }

            } catch (error) {
                
            }
        }, [dataProduct.title]);
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

        const resetState = () =>{
            setDataProduct({...modelProduit})
        }
        // ::START:: FONCTION DE SUBMIT
        const handleSubmit=(e)=>{
            e.preventDefault()
            console.log(dataProduct)
            POST(dataProduct)
            
            resetState()
            
            // const timer = setTimeout(()=>{
                
            // },500)
            // const clear = () => clearTimeout(timer)
            // clear()
        }
        // ::END::3
        const PointsCles = () => {
            const ref = useRef()
            return (
                <>
                    <h2>points clés</h2>
                    <ul>
                        { dataProduct.pointsClef.map((point, index)=>[
                            <div key={index}>
                                <li>
                                    {/* <p>{point.nom}</p> */}

                                    <h3>{point.gaming.nom}</h3>
                                    <p>note:</p>
                                    <TableauNotes parametre={{pointId:point.gaming.id, setDataProduct, notes, isPointCle:true}} />
                                    <div>
                                        <label htmlFor='description_gaming'></label>
                                        <select
                                        value={dataProduct.pointsClef[0].gaming.description}
                                        name='description_gaming' id='description_gaming' onChange={(e)=>{
                                            setDataProduct((prevDataProduct)=>({
                                                ...prevDataProduct,
                                                pointsClef: prevDataProduct.pointsClef.map((point, index)=>{
                                                    return {
                                                        ...point,
                                                        gaming: {
                                                            ...point.gaming,
                                                            description: e.target.value
                                                        }
                                                    }
                                                })
                                            }))
                                        }}>
                                            {
                                                descriptions(dataProduct).gaming.map((e, index)=>[
                                                    <option value={e} key={index}>{e}</option>

                                                ])
                                            }
                                        </select>
                                        
                                    </div>
                                </li>
                                <li>
                                
                                    <h3>{point.rapidite.nom}</h3>
                                    <p>note:</p>
                                    <TableauNotes parametre={{pointId:point.rapidite.id, setDataProduct, notes, isPointCle:true}} />
                                    
                                    <div>
                                        <label htmlFor='description_rapidite'></label>
                                        <select
                                        value={dataProduct.pointsClef[0].rapidite.description}
                                        name='description_rapidite' id='description_rapidite' onChange={(e)=>{
                                            setDataProduct((prevDataProduct)=>({
                                                ...prevDataProduct,
                                                pointsClef: prevDataProduct.pointsClef.map((point, index)=>{
                                                    return {
                                                        ...point,
                                                        rapidite: {
                                                            ...point.rapidite,
                                                            description: e.target.value
                                                        }
                                                    }
                                                })
                                            }))
                                        }}>
                                            {
                                                descriptions(dataProduct).rapidite.map((e, index)=>[
                                                    <option value={e} key={index}>{e}</option>

                                                ])
                                            }
                                        </select>
                                        
                                    </div>
                                </li>
                                <li>
                                {/* <p>{point.nom}</p> */}

                                <h3>{point.durabilite.nom}</h3>
                                <p>note:</p>
                                <TableauNotes parametre={{pointId:point.durabilite.id, setDataProduct, notes, isPointCle:true}} />
                                <div>
                                    <label htmlFor='description_durabilite'></label>
                                    <select
                                    value={dataProduct.pointsClef[0].durabilite.description}
                                    name='description_durabilite' id='description_durabilite' onChange={(e)=>{
                                        setDataProduct((prevDataProduct)=>({
                                            ...prevDataProduct,
                                            pointsClef: prevDataProduct.pointsClef.map((point, index)=>{
                                                return {
                                                    ...point,
                                                    durabilite: {
                                                        ...point.durabilite,
                                                        description: e.target.value
                                                    }
                                                }
                                            })
                                        }))
                                    }}>
                                        {
                                            descriptions(dataProduct).durabilite.map((e, index)=>[
                                                <option value={e} key={index}>{e}</option>

                                            ])
                                        }
                                    </select>
                                    
                                </div>
                                </li>
                                <li>
                                {/* <p>{point.nom}</p> */}

                                <h3>{point.confort.nom}</h3>
                                <p>note:</p>
                                <TableauNotes parametre={{pointId:point.confort.id, setDataProduct, notes, isPointCle:true}} />
                                <div>
                                    <label htmlFor='description_confort'></label>
                                    <select
                                    value={dataProduct.pointsClef[0].confort.description}
                                    name='description_confort' id='description_confort' onChange={(e)=>{
                                        setDataProduct((prevDataProduct)=>({
                                            ...prevDataProduct,
                                            pointsClef: prevDataProduct.pointsClef.map((point, index)=>{
                                                return {
                                                    ...point,
                                                    confort: {
                                                        ...point.confort,
                                                        description: e.target.value
                                                    }
                                                }
                                            })
                                        }))
                                    }}>
                                        {
                                            descriptions(dataProduct).confort.map((e, index)=>[
                                                <option value={e} key={index}>{e}</option>

                                            ])
                                        }
                                    </select>
                                    
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
                    <ul>
                        <li>

                            <TableauNotes parametre={{pointId:parametres.PointId, setDataProduct: parametres.setDataProduct, notes:parametres.notes, isPointCle:false, target: parametres.target}} />
                            <h3>Bon point</h3>
                            <select value={
                                dataProduct[parametres.target].good &&
                                dataProduct[parametres.target].good.length>0&&dataProduct[parametres.target].good.slice(-1)[0]}onChange={(e)=>{setDataProduct((prevDataProduct)=>({
                                ...prevDataProduct,
                                [parametres.target]: {
                                    ...prevDataProduct[parametres.target],
                                    good: [...new Set([...(prevDataProduct[parametres.target].good) || [], e.target.value])]
                                }
                            }))}}>
                                {arrayGoodBad(dataProduct).good.map((data, index)=>[
                                    <option value={data} key={index}>{data}</option>
                                ])}
                            </select>
                            <h3>Mauvais point</h3>
                            <select value={
                                dataProduct[parametres.target].bad &&dataProduct[parametres.target].bad.length>0&&dataProduct[parametres.target].bad.slice(-1)[0]} onChange={(e)=>{setDataProduct((prevDataProduct)=>({
                                ...prevDataProduct,
                                [parametres.target]: {
                                    ...prevDataProduct[parametres.target],
                                    bad: [...new Set([...(prevDataProduct[parametres.target].bad) || [], e.target.value])]
                                }
                            }))}}>
                                {arrayGoodBad(dataProduct).bad.map((data, index)=>[
                                    <option value={data} key={index}>{data}</option>
                                ])}
                            </select>
                        </li>
                    </ul>

                </>
            )
        }
        const NotesPc = ()=> {
            return(
                <ul className={styles.listNoteDesc}>
                    <li className={styles.listItemNoteDesc}>
                        <p className={styles.noteDesc}>{dataProduct.noteDesc.int}</p>
                    </li>
                    <li>

                    </li>
                </ul>
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

            const FirebaseImagesUpload = (filename, img) => {
                const storageRef = ref(storage, `pcPortables/${dataProduct.brand}/${dataProduct.id}/${filename}`);
                uploadBytes(storageRef, img)
                console.log(storageRef);
            }

            const handleChangeimages = (e) => {
                
                imagesState.images.forEach(image => URL.revokeObjectURL(image.preview));
                const selectedImages = Array.from(e.target.files);
                const imagesWithPrev = selectedImages.map((image)=>({
                    file: image,
                    preview: URL.createObjectURL(image)
                }))
                setImagesStates((previmageState)=>({
                    ...previmageState,
                    images:[ ...previmageState.images, ...imagesWithPrev ]}))
                    
                imagesWithPrev.forEach((img)=>FirebaseImagesUpload(img.file.name, img.file))
            }
            useEffect(()=>{
                
                if(imagesState.images[0]?.file!==undefined){
                    // setUrlTemp(imagesState.images[0].file.name)
                    setDataProduct((prevDataProduct)=>({
                        ...prevDataProduct,
                        images:[imagesState.images[0].file.name]}))
                    
                }
                return () => {
                    imagesState.images.forEach((image) => URL.revokeObjectURL(image.preview));
                };
            }, [imagesState.images])
            return(
                <>
                    <input onChange={(e)=>{handleChangeimages(e)}} type='file' multiple accept="image/png, image/gif, image/jpeg, image/avif, image/webp"/>
                    <ul>
                        {imagesState.images.map((image, index)=>[
                            <li className={styles.imaeItem} key={index}>
                                <img width={100} height={100} src={`${image.preview}`}/>
                            </li>
                        ])}
                    </ul>
                </>
            )
        }
        
        return(
            <section className={styles.main}>
                <form className={styles.formProduct} onSubmit={(e)=>handleSubmit(e)}>
                    <h1>Ajout de produit</h1>
                    <div className={styles.zone_infoDebase}>
                        <p>ID du produit: <span>{dataProduct.id}</span></p>
                        <h3>Informations de base</h3>
                        <ul className={styles.Form_list}>
                            <li className={styles.Form_list_elt}>
                                <label htmlFor='titre'>Titre</label>
                                <input value={dataProduct.title} onChange={(e)=>setDataProduct((prevDataProduct)=>({...prevDataProduct,title:e.target.value}))} name='titre' id='titre' required/>

                            </li>
                            <li className={styles.Form_list_elt}>
                                <label htmlFor='marque'>marque</label>
                                <input value={dataProduct.brand} onChange={(e)=>setDataProduct((prevDataProduct)=>({...prevDataProduct, brand:e.target.value}))} name='marque' id='marque' required/>
                                <p>{dataProduct.brand}</p>
                            </li>
                            <li className={styles.Form_list_elt}>
                                <label htmlFor='resolution'>resolution</label>
                                <select name='resolution' id='resolution' onChange={(e)=>{setDataProduct((prevDataProduct)=>({...prevDataProduct,resolution:e.target.value}))}}>
                                    {arrayResolution.map((elt, index)=>[
                                        <option value={elt} key={index}>{elt}</option>
                                    ])}
                                </select>
                            </li>
                            <li className={styles.Form_list_elt}>
                                <h3>Selection des images</h3>
                                <ImagesGestion />
                                <p> <i> <span style={{color: "red"}}>‼ Attention ‼</span> images veillez ajouter les 4 images du prodtuit la premiere doit être l'image vue de face du pc dans la mesure du possible </i> </p>

                            </li>

                        </ul>
                    </div>
                    <div className={styles.zone_config}>
                        {ConfigRender(dataProduct, setDataProduct)}
                    </div>
                    <div className={styles.zone_parametrage}>
                        <h3>Partie parametrage</h3>
                        <ul>
                            <li>
                                <p>Tags: </p>
                                <ul>
                                    {dataProduct.tags.length>0&&dataProduct.tags.map((tag, index)=>[
                                        <li className={`tag_${styles[tag]}`}id={tag} key={index}>{tag}</li>
                                    ])}
                                </ul>
                            </li>
                            <li>
                                <label htmlFor='prix'>Prix</label>
                                <input inputMode='numeric' pattern='[0-9]*' type='text' onChange={(e)=>{setDataProduct((prevDataProduct)=>({...prevDataProduct, prix: e.target.value}))}}/>
                                <p>{dataProduct.prix}€</p>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.zone_SEO}>
                        <h3>Partie SEO</h3>
                        
                        <ul>
                            <li className={styles.Form_list_elt}>
                                <p className={styles.description}><span>Description du produit: </span>{dataProduct.description}</p>
                            </li>
                            <li className={styles.Form_list_elt}>
                                bonus: <input placeholder='naJM par défaut'/>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.pointsClesContainer}>
                        <PointsCles />
                        
                    </div>
                    
                    <div className={styles.NoteDescContainer}>
                        <h3>Detail bureau</h3>
                        <DetailBureauGaming parametres={{pointId: dataProduct.noteDesc.note, setDataProduct, notes, isPointCle: false, target: "noteDesc"}}/>
                    </div>
                    <div className={styles.NoteGamingContainer}>
                        <h3>Detail gaming</h3>
                        <DetailBureauGaming parametres={{pointId: dataProduct.noteGaming.note, setDataProduct, notes, isPointCle: false, target: "noteGaming"}}/>
                    </div>
                    <div>
                        <label htmlFor='conseil'>Conseil</label>
                        <select value={dataProduct.conseil} onChange={(e)=>{setDataProduct((prevDataProduct)=>({
                            ...prevDataProduct,
                            conseil: e.target.value
                        }))}} name='conseil' id='conseil'>
                            <option>Ce pc est conseiller pour une utiliseation gaming</option>
                            <option>Ce pc n'est pas conseiller pour une utilisation gaming</option>
                        </select>
                        <select value={dataProduct.conseil} onChange={(e)=>{setDataProduct((prevDataProduct)=>({
                            ...prevDataProduct,
                            usage: e.target.value.split('usage ')[1]
                        }))}} name='conseil' id='conseil'>
                            <option>usage gaming</option>
                            <option>usage bureau</option>
                            <option>usage gaming/bureau</option>
                        </select>
                    </div>
                    <div className={styles.containerBaliseAffil}>
                        <h2>Balises affilizz</h2>
                        <ul>
                            <li>
                                <label htmlFor='tableauAff'>Balise tableau</label>
                                <input onChange={(e)=>{
                                    setDataProduct((prevDataProduct)=>({
                                        ...prevDataProduct,
                                        array:{
                                            publicationContentId: splitBaliseAffil(e.target.value)
                                        }
                                    }))
                                }} name='tableauAff' id="tableauAff"/>
                            </li>
                            <li>
                            <label htmlFor='btnAff'>Balise bouton</label>
                            <input onChange={(e)=>{
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
                    <input value={'Crée le produit'} type='submit'/>
                </form>
            </section>
        )
    };
    return(
        <>
            <Formulaire__AddProduct />
        </>
    );
};
export default pageAdminAddPutDeleteProduct;