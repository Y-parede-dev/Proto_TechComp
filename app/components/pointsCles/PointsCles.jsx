import InjectPointsCLefHTML from "../clientComponents/InjectPointsClefHTML"
import BarStyled from "../detailsProductBarStyled/BarStyled"
import styles from "./PointsCles.module.css"
const PointsCles = ({produit, param}) => {
    if(param){
        return(
            <div className={styles.pointsClesSugContainer}>
                <ul className={styles.PointsClesSugList}>
                    {produit.pointsClef.map((e)=>[
                    Object.values(e).map((elt)=>[
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
                {produit.pointsClef.map((e)=>[
                    Object.values(e).map((elt)=>[
                        <li className={styles.PointsClesListElt} key={elt.nom}>
                            <h3>{elt.nom}: {elt.note}/10</h3>
                            <InjectPointsCLefHTML prod={elt.description}/>
                            <BarStyled note={elt.note}/>
                        </li>
                    ])
                ])}
            </ul>
        </div>
    )
}
export default PointsCles