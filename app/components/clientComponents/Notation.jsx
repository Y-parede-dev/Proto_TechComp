'use client'
import { useRef, useState } from 'react'
import styles from './Notation.module.css'
import Note from '@/app/components/notationStyled/note'

const Notation = ({produit, param}) =>{
    const [noteActive, setNoteActive] = useState(true)
    const [noteActiveGaming, setNoteActiveGamnig] = useState(false)
    const refSpec = useRef()
    const changeDesktopGaming = (e, note) => {
        if(noteActive&&note=="gaming"){
            setNoteActive(!noteActive)
            setNoteActiveGamnig(!noteActiveGaming)
        }
        if(noteActiveGaming&&note=="bureau"){
            setNoteActive(!noteActive)
            setNoteActiveGamnig(!noteActiveGaming)
        }
    }
    if(param){
        if(param == "usage gaming"){
            let usageIconTest = "🎮"
            return(
                <>
                    <div className={styles.notes_contentOnSugg}>
                        <p className={styles.noteOnSugg}>Usage:  {usageIconTest}/ Note: </p>
                        <>{Note(produit.noteGaming.int)}</>          
                    </div>
                </>
            )
        }
        else{
            let usageScreenTest = "💻"
            return(
                <>
                    <div className={styles.notes_contentOnSugg}>
                        <p className={styles.noteOnSugg}>Usage:  {usageScreenTest}/ Note: </p>
                        <>{Note(produit.noteDesc.int)}</>          
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
                            <li className={noteActive?`${styles.note} ${styles.noteBureau}`:`${styles.noteBureau} ${styles.note} ${styles.noteInactive}`} onClick={(e)=>changeDesktopGaming(e, "bureau")}>
                                <p>Note bureau</p>
                                {Note(produit.noteDesc.int)}
                            </li>
                            <li className={!noteActiveGaming?`${styles.note} ${styles.noteInactive} ${styles.noteGaming}`: `${styles.noteGaming} ${styles.note}`} onClick={(e)=>changeDesktopGaming(e, "gaming")}>
                                <p>Note Gaming</p>
                                {Note(produit.noteGaming.int)}
                            </li>
                        </ul>
                    </div>
                    { noteActive?
                        <div className={styles.details}>
                            <h3>Inconvéniants</h3>
                            <ul className={`${styles.badNote} ${styles.ListDetail}`}>
                                {produit.noteDesc.bad.map(e=>[
                                    <li className={`${styles.detailBad} ${styles.detail} ${styles.detailActive}`} key={refSpec}>{e}</li>
                                ])}
                            </ul>
                            <h3>Avantages</h3>
                            <ul className={`${styles.goodNote} ${styles.ListDetail}`}>
                                {produit.noteDesc.good.map(e=>[
                                    <li className={`${styles.detailGood} ${styles.detail} ${styles.detailActive}`} key={refSpec}>{e}</li>
                                ])}
                            </ul>
                        </div>
                        :
                        <div className={styles.details}>
                            <h3>Inconvéniants</h3>
                            <ul className={`${styles.badNote} ${styles.ListDetail}`}>
                                {produit.noteGaming.bad.map(e=>[
                                    <li className={`${styles.detailBad} ${styles.detail}`} key={refSpec}>{e}</li>
                                ])}
                            </ul>
                            <h3>Avantages</h3>
                            <ul className={`${styles.goodNote} ${styles.ListDetail}`}>
                                {produit.noteGaming.good.map(e=>[
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