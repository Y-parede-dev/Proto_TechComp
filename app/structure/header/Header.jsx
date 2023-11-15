import Link from "next/link"
import FormSearch from "../../components/clientComponents/FormSearch"
import styles from './Header.module.css'
// refactor a faire
const Header = ({responsive}) => {
    return (
        <header className={styles.header}>
            <p className={styles.title}><Link className={styles.tilteLink} href='/'><span className={styles.title_first_letter}>itech</span><span className={styles.title_second_letter}>C</span>omparateur</Link></p>
            {responsive.desktopDesign?
                <>
                    <FormSearch />
                    <p className={styles.headerDisclamer}>Votre pc porable au meilleur prix.</p>
                </>
                :""}
            {/* <p className={styles.headerDisclamer}>Nos notes, nos avis et nos classements sont <Link href='https://magin.code'>100% impartiaux et indépendants</Link> .</p> */}
        </header>
    )
}
export default Header