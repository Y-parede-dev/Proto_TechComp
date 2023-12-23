"use client";
import styles from './Details.module.css'

export const DetailBureauGaming = ({parametres}) => {
    return(
        <>
            <ul className={styles.listDetails}>
            <h3>{parametres.target==="notedesc"?
            "Bureau": "Gaming"}</h3>
                <li className={styles.listItemPCles}>
                    <p>Note {parametres.target==="notedesc"?
            "Bureau :": "Gaming :"} {parametres.data?.[parametres.target]?.int}</p>
                    <h4 className={styles.GoddBadTitle}>Bon points</h4>
                    <ul className={`${styles.renderGoodPoint} ${styles.renderPoint}`}>
                        {
                            parametres.data?.[parametres.target]?.good?.map((elt, index)=>[
                                <li key={index}>{elt}</li>
                            ])
                        }
                    </ul>
                    <h4 className={styles.GoddBadTitle}>Mauvais point (en choisir au moins 1)</h4>
                    <ul className={`${styles.renderBadPoint} ${styles.renderPoint}`}>
                        {
                            parametres.data?.[parametres.target]?.bad?.map((elt, index)=>[
                                <li key={index}>{elt}</li>
                            ])
                        }
                    </ul>
                </li>
            </ul>
        </>
    )
}