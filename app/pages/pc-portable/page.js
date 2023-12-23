// refactor a faire
import styles from './page.module.css'
// import Script from 'next/script'
// import Link from 'next/link'
import ListeProduitsPagePcPortable from '@/app/components/suggestion/ListeProduitsPagePcPortable'
const Product = () => {

  const content = (
    <section className={styles.section}>
      <h1 className={styles.titlePagePcPortable}>Comparateur PC portables</h1>
      <div className={styles.ILLUSTRATOR}>NEED ILLUSTRATION PC PORTABLE</div>
      <ListeProduitsPagePcPortable />
    </section>
  )

  return (
      <div>{content}</div>
  )
}
export default Product