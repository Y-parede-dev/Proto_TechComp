"use client";
import { useEffect, useState } from 'react';
import styles from './TestFont.module.css';
import { Font } from '@/lib/ClassCustoms';
const TestFont = ({props}) => {

    const {modaleFontOpen, setmodaleFontOpen, body} = props;
    // const [body, setBody]= useState(null);

    // useEffect(()=>{
    //     setBody(document.getElementsByTagName('body'));
    // },[])
    // useEffect(()=>{
    //     changeFont()
    //     changeSeize()
    // },[])
    const fonts = ['Arimo', 'Exo 2', 'Lato', 'Montserrat', 'Open Sans', 'Oswald', 'Roboto', 'Teko'];
    const seize = [100, 110,120,132,140,150,160,170,180,190,200];
    const fonts2 = [

    ];
    fonts?.map(font => {
        let classN = font;
        if(font.includes(' ')){
            classN = font.split(' ')[0] + font.split(' ')[1];
        };
        const t = new Font(font, classN)
        fonts2.push(t);
    });
    const changeFont = (e, font  = 'Arimo') => {
        // console.log(body)
        body[0].style.fontFamily = "'"+font+"'"+", sans-serif";
    };
    const changeSeize = (e, seize = 100) => {
        body[0].style.fontSize = `${seize}%`;
    };
    const toggleModaleFont = () => {
        setmodaleFontOpen(!modaleFontOpen);
    };
    return(
        <div className={modaleFontOpen? styles.testFontContainer:`${styles.testFontContainer} ${styles.e}`}>
            <h2>POLICES</h2>
            <ul className={styles.listChoixFont}>
                {fonts2?.map((elt)=>[
                    <li onClick={e=>changeFont(e, elt.name)} key={elt.name} className={`${styles.font} ${styles[elt.className]}`}>{elt.name}</li>
                    
                ]
                )}
            </ul>
            <h2>TAILLE</h2>
            <ul className={styles.listChoixSeize}>
                {seize?.map((elt)=>[
                    <li onClick={e=>changeSeize(e, elt)} key={elt} className={`${styles.font}`}>{`${elt}%`}</li>
                ]
                )}
            </ul>
            
        </div>
    )
}
export default TestFont;