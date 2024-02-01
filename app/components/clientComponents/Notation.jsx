'use client'
// refactor a faire
import { useRef, useState } from 'react'
import styles from './Notation.module.css'
import Note from '../notationStyled/Note'

const Notation = ({produit, param}) =>{

    const [notesState, setNodeState] = useState({
        noteActive: true,
        noteActiveGaming: false
    })
    const refSpec = useRef();
    const changeDesktopGaming = (e, note) => {
        if(notesState?.noteActive&&note=="gaming"){
            setNodeState((prevData)=>({...prevData, noteActive: notesState?.noteActive}));
            setNodeState((prevData)=>({...prevData, noteActiveGaming: !notesState?.noteActiveGaming}));
        }
        if(notesState?.noteActiveGaming&&note=="bureau"){
            setNodeState((prevData)=>({...prevData, noteActiveGaming: notesState?.noteActiveGaming}));
            setNodeState((prevData)=>({...prevData, noteActive: !notesState?.noteActive}));
        }
    }
    if(param){
        const usageIconTest = "🎮";
        const usageScreenTest = "💻";
        if(param.includes("gaming/bureau")){
            return(
                <>
                    <div className={styles.notes_contentOnSugg}>
                        <p className={styles.noteOnSugg}>Usage:  [{usageIconTest} {usageScreenTest}]/ Note: </p>
                        <>{Note(produit?.notegaming?.int)}</>          
                    </div>
                </>
            )
        }
        else if(param == "usage gaming" || param.includes("gaming")){
            return(
                <>
                    <div className={styles.notes_contentOnSugg}>
                        <p className={styles.noteOnSugg}>Usage:  {usageIconTest}/ Note: </p>
                        <>{Note(produit?.notegaming?.int)}</>          
                    </div>
                </>
            )
        }
        else{
            return(
                <>
                    <div className={styles.notes_contentOnSugg}>
                        <p className={styles.noteOnSugg}>Usage:  {usageScreenTest}/ Note: </p>
                        <>{Note(produit?.notedesc?.int)}</>          
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <div className={styles.notes_content}>
                <h2>Notation</h2>
                <div className={styles.containerNoteDetails}>
                    <div className={styles.tabs}>
                        <ul className={styles.choiseNote}>
                            <li className={notesState?.noteActive?`${styles.note} ${styles.noteBureau}`:`${styles.noteBureau} ${styles.note} ${styles.noteInactive}`} onClick={(e)=>changeDesktopGaming(e, "bureau")}>
                                <p>Note bureau</p>
                                {Note(produit?.notedesc?.int)}
                            </li>
                            <li className={!notesState?.noteActiveGaming?`${styles.note} ${styles.noteInactive} ${styles.noteGaming}`: `${styles.noteGaming} ${styles.note}`} onClick={(e)=>changeDesktopGaming(e, "gaming")}>
                                <p>Note Gaming</p>
                                {Note(produit?.notegaming?.int)}
                            </li>
                        </ul>
                    </div>
                    { notesState?.noteActive?
                        <div className={styles.details}>
                            <h3>Inconvéniants</h3>
                            <ul className={`${styles.badNote} ${styles.ListDetail}`}>
                                {produit?.notedesc.bad?.map(e=>[
                                    <li className={`${styles.detailBad} ${styles.detail} ${styles.detailActive}`} key={refSpec}>{e}</li>
                                ])}
                            </ul>
                            <h3>Avantages</h3>
                            <ul className={`${styles.goodNote} ${styles.ListDetail}`}>
                                {produit?.notedesc.good?.map(e=>[
                                    <li className={`${styles.detailGood} ${styles.detail} ${styles.detailActive}`} key={refSpec}>{e}</li>
                                ])}
                            </ul>
                        </div>
                        :
                        <div className={styles.details}>
                            <h3>Inconvéniants</h3>
                            <ul className={`${styles.badNote} ${styles.ListDetail}`}>
                                {produit?.notegaming.bad?.map(e=>[
                                    <li className={`${styles.detailBad} ${styles.detail}`} key={refSpec}>{e}</li>
                                ])}
                            </ul>
                            <h3>Avantages</h3>
                            <ul className={`${styles.goodNote} ${styles.ListDetail}`}>
                                {produit?.notegaming.good?.map(e=>[
                                    <li className={`${styles.detailGood} ${styles.detail}`} key={refSpec}>{e}</li>
                                ])}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default Notation;