import InjectPointsClefHTML from "@/app/components/clientComponents/InjectPointsClefHTML"
import BarStyled from "@/app/components/detailsProductBarStyled/BarStyled"
import styles from "./PointsCles.module.css"
// refactor a faire
export const PointsCles = ({produit, param}) => {

    if(param){
        return(
            <div className={styles.pointsClesSugContainer}>
                <ul className={styles.PointsClesSugList}>
                    {produit?.pointsclef?.map((e)=>[
                    Object.values(e)?.map((elt)=>[
                        <li key={elt.nom} className={styles.pointCleOnSug}>
                            <p>{elt.nom}</p>
                            <BarStyled note={elt.note} param={'petit'}/>
                        </li>
                    ])
                    ])}
                </ul>
        </div>
        )
    }
    return(
        <div className={styles.pointsCles}>
            <h2 className={styles.pointsClesTitle}>Points clés</h2>
            <ul className={styles.PointsClesList}>
                {produit?.pointsclef?.map((e)=>[
                    Object.values(e)?.map((elt)=>[
                        <li className={styles.PointsClesListElt} key={elt.nom}>
                            <h3>{elt.nom}: {elt.note}/10</h3>
                            <InjectPointsClefHTML prod={elt.description}/>
                            <BarStyled note={elt.note}/>
                        </li>
                    ])
                ])}
            </ul>
        </div>
    )
}