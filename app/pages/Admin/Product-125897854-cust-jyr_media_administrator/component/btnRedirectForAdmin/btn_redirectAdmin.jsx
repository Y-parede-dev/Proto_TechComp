'use client'
import { useRouter } from "next/navigation"
import styles from './btnRedirectForAdmin.module.css'
export const BtnRedirect = () => {
    const router=useRouter();
    return(
        <section className={`${styles.main}`}>
            <p>Destiner a l'administration du site</p>
            <button onClick={()=>{router.replace('/pages/Admin/connect')}}>Se connecter</button>
        </section>
    )
}