import Link from 'next/link'
import styles from './page.module.css'
import SuggestionMap from './components/suggestion/SuggestionMap'
// refactor a faire
const Home = () => {
  
  
  return (
      <section className={styles.main}>
        <div className={styles.mainContent}>
          <div className={`${styles.containerAds} ${styles.leaderBoardAdsContainer}`}></div>
          <h1 className={styles.titlePage}>Votre comparateur pour ordinateur portable au meilleurs prix</h1>
          <div className={styles.ILLUSTRATOR}>ICI UNE ILLUSTRATION</div>
          <p className={styles.txtPresentation}>ici un texte de presentation</p>
          
          {/* <p>
            <Link href="/pages/pc-portable">Tous les pc portables</Link>
          </p> */}
          <h2 className={styles.top10}>les top 10:</h2>
          <ul className={styles.listesTop10}>
            {/* liste a reafactore en une foction qui prend en parametres des tableau avex le 'searchSepar' en gros le tag et le titre de le recherche qui sera egalement le titre sur la page  */}
            <li>
              <SuggestionMap searchSepar={"gaming"} titreRecherche={"> Les pc portables gamers"}/>
            </li>
            <li>
              <SuggestionMap searchSepar={"bureau"} titreRecherche={"> Les pc portables bureautique"}/>
            </li>
          </ul>

        </div>
      </section>
  )
}
export default Home