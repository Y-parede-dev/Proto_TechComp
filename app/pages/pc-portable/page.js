
import styles from './page.module.css'
import produits from '@/data/dataProduits/produits.json' assert { type: 'json' }
import Script from 'next/script'
import { metadata } from '@/app/layout'
import Link from 'next/link'
import SuggestionMap from '@/app/components/suggesttion/SuggestionMap'
const Product = () => {

  const content = (
    <section className={styles.section}>
      <h1 className={styles.titlePagePcPortable}>Comparateur PC portables</h1>
      <SuggestionMap page={`pcPortable`}/>
    </section>
  )

  return (
      <div>{content}</div>
  )
}
export default Product