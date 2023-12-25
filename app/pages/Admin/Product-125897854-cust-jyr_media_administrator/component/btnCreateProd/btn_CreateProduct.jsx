'use client';

import { useState, useEffect } from "react";

import styles from './btn_CreateProduct.module.css'
export const BtnCreateProduct = ({params}) => {
    const {data, handleSubmit} = params
    

    const [btn, setBtn] = useState({
        value:'⛔ Création impossible! ⛔',
        classNameCustom:`${styles.btnSubmit} ${styles.btnSubmit__noData}`
       
    })
    let iscomplete = false;

    useEffect(()=>{
        for (const [parametre, valeur] of Object.entries(data)){

            if(
                valeur === 'null' ||
                valeur === 'na' ||
                valeur === 'describe' ||
                valeur === 'empty' ){
                    iscomplete = false
                }else{
                    iscomplete = true
                }
            if(iscomplete){
                setBtn({
                    value:'Créer le produit 👍',
                    classNameCustom:`${styles.btnSubmit} ${styles.btnSubmit__fullData}`
                    
                })
            }
        }
    },[data])
    return(
            <input onClick={(e)=>e.preventDefault} value={btn.value} className={btn.classNameCustom} type='submit'></input>
        
    )
}