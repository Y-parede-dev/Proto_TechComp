import Link from "next/link"
import styles from './Footer.module.css'
// refactor a faire
import config from "@/config/config.json" assert{type:'json'}
const Footer = () => {
    
    return (
        <footer className={styles.footer}>
            <div className={styles.linkFooter}>
                <Link href='/pages/conditions/aPropos'> A propos </Link>
                <Link href='/pages/conditions/mentions'> Mentions légales </Link>
                <Link href='/pages/conditions/contact'> contact </Link>

            </div>
            <div className={styles.txtFooter}>
                <p>{config.year} - Tous droits réservés - ©{config.title}</p>
                <p>Trouvez votre {config.productType} sur <Link style={{color:"white"}} href={`https://${config.title}.fr`}>{config.title}.fr</Link></p>
                <p>{config.title} recherche pour vous les meilleurs choix en terme de {config.productType}</p>
            </div>
        </footer>
    )
}
export default Footer