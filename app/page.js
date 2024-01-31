import Link from 'next/link'
import styles from './page.module.css'
import SuggestionMap from './components/suggestion/SuggestionMap'
import Image from 'next/image'
import imageHomepage from "@/public/images/imageHomepage.webp"
import config from "@/config/config.json" assert{type:"json"}
import { AdsLarge } from './components/pub/Large'
// refactor a faire
const Home = () => {
  
  const TextePresentation= () => 
  {return (
    <>
      <p className={styles.pBienvenue}>Bienvenue sur Itek comparateur, votre guide ultime dans l'univers des PC portables! Trouvez l'ordinateur idéal qui correspond à vos besoins, que vous soyez un gamer passionné, un professionnel exigeant ou à la recherche d'une solution abordable.</p>

      <div className={styles.pBienvenue}>
        <h3 className={styles.pBienvenueH3}>🎮 <strong>Gaming Powerhouse, Productivité Maximale, Budget Maîtrisé</strong></h3>
        <p className={`${styles.txtWhite}`}> Explorez notre sélection triée sur le volet de PC portables dans nos trois catégories phares. Des machines de jeu surpuissantes aux ordinateurs de bureau adaptés à toutes les tâches, en passant par des options économiques sans compromis sur la qualité.</p>

      </div>
      <div className={styles.pBienvenue}>
        <h3 className={styles.pBienvenueH3}>🔍 <strong>Explorez l'Étendue des Possibilités</strong></h3>
        <p className={`${styles.txtWhite}`}> Naviguez à travers notre page de références complètes, regroupant toutes les marques, modèles et spécifications. Utilisez notre barre de recherche intelligente pour affiner instantanément vos choix et trouver le PC portable parfait en quelques clics.</p>

      </div>
      <div className={styles.pBienvenue}>
        <h3 className={styles.pBienvenueH3}>💻 <strong>Découvrez en Profondeur</strong></h3>
        <p className={`${styles.txtWhite}`}> Plongez dans chaque détail avec notre page dédiée à chaque produit. Dynamique et réactive grâce à la puissance de la technologie Next.js, explorez les caractéristiques, les avis d'utilisateurs et faites le choix éclairé qui correspond à VOTRE style de vie numérique.</p>
      </div>
      
      <p className={styles.pBienvenue}>🛒 <strong>Trouvez Votre PC Portable Parfait dès Aujourd'hui!</strong></p>
    </>
  )
}
  return (
      <section className={styles.main}>
        <div className={styles.mainContent}>
          <div className={`${styles.containerAds} ${styles.leaderBoardAdsContainer}`}></div>
          <h1 className={styles.titlePage}>Votre comparateur pour ordinateur portable au meilleurs prix</h1>
          <div>
            <div className={styles.ILLUSTRATOR}>
              <Image alt='pc portable illustration' height={729} width={1020} className={styles.imageHomePage} src={config.imageHomepage}></Image>
            </div>
            <div className={styles.txtPresentation}>
              <TextePresentation />
            </div>
          </div>
          {/**
           * <p>            <Link href="/pages/pc-portable">Tous les pc portables</Link>
          </p> */}
          <h2 className={styles.top10}>les top 10:</h2>
          <ul className={styles.listesTop10}>
            {/* liste a reafactore en une foction qui prend en parametres des tableau avex le 'searchSepar' en gros le tag et le titre de le recherche qui sera egalement le titre sur la page  */}
            <li>
              <SuggestionMap searchSepar={"gaming"} titreRecherche={"> Les pc portables gamers"}/>
            </li>
            <AdsLarge></AdsLarge>
            <li>
              <SuggestionMap searchSepar={"bureau"} titreRecherche={"> Les pc portables bureautique"}/>
            </li>
          </ul>

        </div>
      </section>
  )
}
export default Home