'use client';

import TestFont from "./TestFont/TestFont";
import TestColors from "./TestColors/TestColors";
import styles from './Test.module.css';
import { useEffect, useState } from "react";

export const Test = ()=>{
    const [modaleDeBase, setmodaleDeBase] = useState(false);
    const [modaleFontOpen, setmodaleFontOpen] = useState(false);
    const [modaleColorOpen, setmodaleColorOpen] = useState(false);
    const [body, setBody]= useState(null);
    const [root, setRoot]= useState(null);
    const toggleModaleFont = () => {
        setmodaleFontOpen(!modaleFontOpen);
        setmodaleColorOpen(!modaleColorOpen);
    };
    useEffect(()=>{
        setBody(document.getElementsByTagName('body'));
        setRoot(document.querySelector(':root'));
    },[])

    useEffect(()=>{
        if(modaleFontOpen==true || modaleColorOpen==true){
            setmodaleDeBase(true)
        }
        else{
            setmodaleDeBase(false)
        }
    },[modaleFontOpen])
    return(
        <div className={modaleDeBase?`${styles.TestContainer}`:`${styles.TestContainer} ${styles.e}`}>
            {/* <TestFont props={{modaleDeBase,setmodaleDeBase}}></TestFont> */}
            <TestFont props={{modaleFontOpen,setmodaleFontOpen, body}}></TestFont>
            <TestColors props={{modaleColorOpen, setmodaleColorOpen, body, root}}></TestColors>
            <button onClick={toggleModaleFont} className={styles.button} type="button">{modaleFontOpen?"Fermer":"Modif"}</button>
        </div>
    );
};