import styles from '../../page.module.css';
// import styles2 from '@/product/page.module.css';



import iconCpu from '../../inconsConfig/icon_cpu.png';
import iconRam from '../../inconsConfig/icon_ram.png';
import iconGpu from '../../inconsConfig/icon_gpu.png';
import iconScreen from '../../inconsConfig/icon_screen.png';
import iconStockage from '../../inconsConfig/icon_stockage.png';
import iconOS from '../../inconsConfig/icon_OS.png';
import Image from 'next/image';
export const Caracteristique = ({produit})=>{
    return (
        <>
        <div className={styles.carac}>
            <h2>Caractéristique</h2>
            <div>
            <p className={styles.caracTxt}>Cet ordinateur portable de la marque <strong className={styles.spanCaracComputer}>{produit.brand}</strong> possède un écran de <strong className={styles.spanCaracComputer}>{produit.config.screen}"</strong>, <span>{produit.conseil}</span>. L'ordinateur portable <strong className={styles.spanCaracComputer}>{produit.title}</strong> obtient une moyenne de <strong>
                {produit.noteGaming.int>0?((produit.noteDesc.int + produit.noteGaming.int) / 2).toFixed(1):produit.noteDesc.int.toFixed(1)}/10</strong>.</p>    
            <table className={styles.tablecute}>
                <tbody>
                <tr>
                    <td>
                    <div className={styles.configItem}>
                        <Image loading='eager' alt='processeur' className={styles.iconR} src={iconCpu}/>
                        <p>Processeur</p>
                    </div>
                    </td>
                    <td>
                    <p>{produit.config.cpu}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                    <div className={styles.configItem}>
                        <Image loading='eager' alt='carte graphique' className={styles.iconR} src={iconGpu}/>
                        <p>Carte Graphique</p>
                    </div>
                    </td>
                    <td>
                    <p>{produit.config.gpu}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                    <div className={styles.configItem}>
                        <Image loading='eager' alt='barette de mémoire vive' className={styles.iconR} src={iconRam}/>
                        <p>Mémoire vive</p>
                    </div>
                    </td>
                    <td><p>{produit.config.ram}</p></td>
                </tr>
                <tr>
                    <td>
                    <div className={styles.configItem}>
                        <Image loading='eager' alt='disque dur' className={styles.iconR} src={iconStockage}/>
                        <p>Stockage</p>
                    </div></td><td><p>{produit.config.stockage}</p></td>
                </tr>
                <tr><td><div className={styles.configItem}>
                    <Image loading='eager' alt='écran' className={styles.iconR} src={iconScreen}/>
                    <p>Écran</p></div></td><td><p>{produit.config.screen}</p></td>
                </tr>
                <tr><td><div className={styles.configItem}>
                    <Image loading='eager' alt='operating system (OS)' className={styles.iconR} src={iconOS}/>
                    <p>os</p></div></td><td><p>{produit.config.os}</p></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </>
    )
}