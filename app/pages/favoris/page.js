
import { ProductSearchById } from '@/lib/ProductSearch';
import styles from './page.module.css';
import { FavoriInit } from './clientComponent/FavoriInit';
const Favoris = () => {
    return(
        <section className={styles.favoriPage}>
            <h2>FAVORIS</h2>
            <FavoriInit></FavoriInit>
        </section>
    );
};

export default Favoris;