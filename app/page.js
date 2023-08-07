import Link from 'next/link'
import styles from './page.module.css'

const Home = () => {
  
  
  return (
      <main className={styles.main}>
        <h1>Votre comparateur pour ordinateur portable au meilleurs prix</h1>

        <p>
          <Link href="/pages/pc-portable">Tous les pc portables</Link>
        </p>
      </main>
  )
}
export default Home