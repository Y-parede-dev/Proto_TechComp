import styles from './ComponentCustom.module.css';
import { ConfigItem } from '../utils/utils.custom';
export const TableauNotes = ({parametre})=>{
    return(
            <ul className={`${styles.listNotes}`}>
                {parametre.notes?.map((note, index)=>[
                    <li 
                        key={index}
                        value={note}
                        className={styles.note}
                        onClick={(e)=>{
                            parametre.setDataProduct((old)=>(
                                parametre.isPointCle?{
                                ...old,
                                pointsclef:old.pointsclef?.map((point)=>{
                                    return {
                                        ...point,
                                        [parametre.pointId]: {
                                            ...point[parametre.pointId],
                                            note: e.target.value
                                        }
                                    }
                                })
                            }:{
                                ...old,
                                [parametre.target]:{
                                    ...old[parametre.pointId],
                                    int: e.target.value
                                }
                            }
                            ))
                        }}
                    >{note}</li>
                ])}
            </ul>
        
    )
}
const ConfigRow = ({label, target, value, onChange, setDataProduct}) =>{
    return(
    <tr>
        <td>{label}</td>
        <td>
            <input className={styles.inputDesign} placeholder={value} onChange={(e)=>{
                onChange({target, element:e.target.value, setDataProduct})
            }}/>
        </td>
    </tr>
    )
}
export const ConfigRender = (data, setDataProduct, setNotationGo) => {
    const handleSetNotes=(e)=>{
        e.preventDefault()
        try{
            if(
                data.config.cpu!=="na" &&
                data.config.gpu!=="na" &&
                data.config.ram!=="na" &&
                data.config.stockage!=="na" && 
                data.config.screen!=="na"){
                    setNotationGo(true)
            }
            
        }catch{
            setNotationGo(false)
        }
    }
    return(
        <div className={styles.configContainer}>
            <h2>Config du pc portable</h2>
            <p className={styles.help}>?</p>
            <table className={styles.tableConfig}>
                {/* <thead>
                    <tr>
                        <th>Config du pc portable</th>
                    </tr>
                </thead> */}
                <tbody>
                    {ConfigRow({
                        label: "CPU (processeur)",
                        target: 'cpu',
                        value: data.config.cpu,
                        onChange:ConfigItem,
                        setDataProduct: setDataProduct
                        
                    })}
                    {ConfigRow({
                        label: "GPU (Carte Graphique)",
                        target: 'gpu',
                        value: data.config.gpu,
                        onChange:ConfigItem,
                        setDataProduct: setDataProduct
                    })}
                    {ConfigRow({
                        label: "Écran (taille en pouce)",
                        target: 'screen',
                        value: data.config.screen,
                        onChange:ConfigItem,
                        setDataProduct: setDataProduct
                    })}
                    {ConfigRow({
                        label: "Ram (modele: 16GO | DDR5)",
                        target: 'ram',
                        value: data.config.ram,
                        onChange:ConfigItem,
                        setDataProduct: setDataProduct
                    })}
                    {ConfigRow({
                        label: "Stockage (modele: 500GO | SSD)",
                        target: 'stockage',
                        value: data.config.stockage,
                        onChange:ConfigItem,
                        setDataProduct: setDataProduct
                    })}
                    {ConfigRow({
                        label: "Os (modele: Window 11)",
                        target: 'os',
                        value: data.config.os,
                        onChange:ConfigItem,
                        setDataProduct: setDataProduct
                    })}
                </tbody>
            </table>
            <button onClick={(e)=>handleSetNotes(e)} className={data.config.os==='na'
                            ?`${styles.disable} ${styles.btnAutoNote}`:styles.btnAutoNote}>get a notes</button>
        </div>
    )
}