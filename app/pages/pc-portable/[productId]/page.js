// refactor a faire
import styles from './page.module.css'
import ImageAndLinkAffiliate from "./clientComponents/ImageAndLinkAffiliate"
import iconCpu from './inconsConfig/icon_cpu.png'
import iconRam from './inconsConfig/icon_ram.png'
import iconGpu from './inconsConfig/icon_gpu.png'
import iconScreen from './inconsConfig/icon_screen.png'
import iconStockage from './inconsConfig/icon_stockage.png'
import iconOS from './inconsConfig/icon_OS.png'
import Image from 'next/image'
import Notation from '@/app/components/clientComponents/Notation'
import SuggestionMap from '@/app/components/suggestion/SuggestionMap'
import PointsCles from '@/app/pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles'
import GetByJson from '@/lib/GetByJson'

const data = GetByJson()

export async function generateMetadata({ params }) {
  let recTitleDesc = {}
  data.map(e=>{
    if(params.productId===e.id ){
      recTitleDesc={...e}
      return(recTitleDesc)
    }})
  return {
    title: recTitleDesc.title,
    description:recTitleDesc.description
  }
}

const ProductPage = ({params}) => {
  let produit ={}
  data.map(e=>{
    if(params.productId===e.id ){

      produit={...e}
      return(produit)
    }})

  const caract = (
    <>
      <div className={styles.carac}>
        <h2>Caractéristique</h2>
        <div>
          <p className={styles.caracTxt}>Cet ordinateur portable de la marque <strong className={styles.spanCaracComputer}>{produit.brand}</strong> possède un écran de <strong className={styles.spanCaracComputer}>{produit.config.screen}"</strong>, <span>{produit.conseil}</span>. L'ordinateur portable <strong className={styles.spanCaracComputer}>{produit.title}</strong> obtient une moyenne de <strong>{((produit.noteDesc.int + produit.noteGaming.int) / 2).toFixed(1)}/10</strong>.</p>    
          <table className={styles.tablecute}>
            <tbody>
              <tr>
                <td>
                  <div className={styles.configItem}>
                    <Image alt='processeur' className={styles.iconR} src={iconCpu}/>
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
                    <Image alt='carte graphique' className={styles.iconR} src={iconGpu}/>
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
                    <Image alt='barette de mémoire vive' className={styles.iconR} src={iconRam}/>
                    <p>Mémoire vive</p>
                  </div>
                </td>
                <td><p>{produit.config.ram}</p></td>
              </tr>
              <tr>
                <td>
                  <div className={styles.configItem}>
                    <Image alt='disque dur' className={styles.iconR} src={iconStockage}/>
                    <p>Stockage</p>
                  </div></td><td><p>{produit.config.stockage}</p></td>
              </tr>
              <tr><td><div className={styles.configItem}>
                <Image alt='écran' className={styles.iconR} src={iconScreen}/>
                <p>Écran</p></div></td><td><p>{produit.config.screen}</p></td>
              </tr>
              <tr><td><div className={styles.configItem}>
                <Image alt='operating system (OS)' className={styles.iconR} src={iconOS}/>
                <p>os</p></div></td><td><p>{produit.config.os}</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
  
  const content = (
    <section className={styles.section}>
      <h1 className={styles.product_card_title}>{produit.title}</h1>
        <div className={styles.product_card}>
          <ImageAndLinkAffiliate produit={produit}/>
            
          <hr className={styles.hr}/>
          <>
            <Notation produit={produit}/>
            {caract}
          </>
          <hr className={`${styles.hr} ${styles.hr2}`}/>
          <>
            <PointsCles produit={produit}/>
          </>
          <hr className={`${styles.hr} ${styles.hr3}`}/>
          <>
            <div className={styles.suggestions}>
              <h2>suggestions d'autres produits</h2>
              <SuggestionMap searchSepar={produit.brand} titreRecherche={"PC portable de la même marque"}/>
              <SuggestionMap searchSepar={"gaming"} titreRecherche={"PC portable gamer"}/>
              <SuggestionMap searchSepar={"ultra"} titreRecherche={"PC portable avec écran 4K"}/>
              <SuggestionMap searchSepar={"tactile"} titreRecherche={"PC portable avec écran tactile"}/>
              <SuggestionMap searchSepar={"oled"} titreRecherche={"PC portable avec écran oled"}/>

            </div>
          </>
        </div>
    </section>
  )
  return (
      <>{content}</>
  )
}
export default ProductPage