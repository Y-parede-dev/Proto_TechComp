"useClient"
import { useRef } from "react";
import styles from './PointsCles.module.css'
export const PointsCles = (params) => {
    const dataProduct = params.data
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