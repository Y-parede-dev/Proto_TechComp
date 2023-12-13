import Link from "next/link"
import FormSearch from "../../components/clientComponents/FormSearch"
import styles from './Header.module.css';
import logo from './logo/1.png' // autre possibilité 2.png
import Image from "next/image";
// refactor a faire
const Header = ({responsive}) => {
    
    return (
        <header className={styles.header}>
            <Link className={styles.tilteLink} href='/'><Image src={logo} loading='eager' alt="tek comparateur" height={70} width={354}/> </Link>
            {/* <p className={styles.title}><Link className={styles.tilteLink} href='/'><span className={styles.title_first_letter}>itech</span><span className={styles.title_second_letter}>C</span>omparateur</Link></p> */}
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