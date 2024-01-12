'use client';

import { useState, useEffect } from "react";

import styles from './btn_CreateProduct.module.css'
export const BtnCreateProduct = ({params}) => {
    const {data, handleSubmit} = params
    const [iscomplete, setIsComplete] = useState(false)

    const [btn, setBtn] = useState({
        value:'⛔ Création impossible! ⛔',
        classNameCustom:`${styles.btnSubmit} ${styles.btnSubmit__noData}`,
        status: true
       
    })
    // let iscomplete = false;

    useEffect(()=>{
        const isOneBad = [];
        for (const [parametre, valeur] of Object.entries(data)){
            isOneBad.push(valeur);   
        }
        
        if(
            isOneBad?.includes('null') || 
            isOneBad?.includes('na') ||
            isOneBad?.includes('describe') ||
            isOneBad?.includes('empty')
        ){
            setIsComplete(false)
            console.log(isOneBad)
        }else{
            setIsComplete(true)}
        if(iscomplete){
            setBtn({
                value:'Créer le produit 👍',
                classNameCustom:`${styles.btnSubmit} ${styles.btnSubmit__fullData}`,
                status: false
                
            })
        }
    },[data])
    return(
            <input disabled={btn.status} onClick={(e)=>e.preventDefault} value={btn.value} className={btn.classNameCustom} type='submit'></input>
        
    )
}