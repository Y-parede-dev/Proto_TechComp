import styles from './page.module.css';

export default function Page(){
    return(
        <section className={styles.main}>
            <h2>Politique de Cookies</h2>
            <div>
                <h3 className={styles.lastUpdate}><i> Dernière mise à jour </i>: 11/01/2024</h3>
                <p>Cette Politique de Cookies explique comment notre site web utilise des cookies et d'autres technologies similaires pour collecter et stocker des informations lorsque vous visitez notre site. En utilisant notre site, vous consentez à l'utilisation de cookies conformément à la présente politique.</p>
            </div>
            <div>
                <h3>Qu'est-ce qu'un cookie ?</h3>
                <p>Un cookie est un petit fichier texte placé sur votre appareil lorsque vous visitez un site web. Il permet au site de reconnaître votre appareil lors de futures visites. Les cookies effectuent différentes fonctions, telles que vous permettre de naviguer efficacement entre les pages, mémoriser vos préférences, et améliorer l'expérience utilisateur.</p>
            </div>
            <div>
                <h3>Comment utilisons-nous les cookies ?</h3>
                <ol>
                    Nous utilisons différents types de cookies pour diverses raisons. Voici une explication de chaque type de cookie utilisé sur notre site :
                    <li><span className={styles.spanBold}>Cookies Essentiels :</span> Ces cookies sont nécessaires au bon fonctionnement du site. Ils vous permettent de naviguer sur les pages, d'accéder à des zones sécurisées, et d'utiliser les fonctionnalités de base du site.</li>
                    <li><span className={styles.spanBold}>Cookies de Fonctionnalité :</span>Les cookies de fonctionnalité sont utilisés pour améliorer la convivialité du site en mémorisant vos préférences, telles que la langue choisie ou la région dans laquelle vous vous trouvez.</li>
                    <li><span className={styles.spanBold}>Cookies d'Analyse :</span>Nous utilisons des cookies d'analyse pour comprendre comment vous interagissez avec notre site. Ces informations nous aident à améliorer constamment notre site et à fournir des contenus pertinents.</li>
                    <li><span className={styles.spanBold}>Cookies de Marketing/Publicité :</span>Nos partenaires publicitaires peuvent définir des cookies sur notre site afin de vous proposer des publicités personnalisées en fonction de vos centres d'intérêt et de votre historique de navigation.</li>
                    <li><span className={styles.spanBold}>Cookies de Réseaux Sociaux :</span>Des fonctionnalités de médias sociaux, telles que les boutons de partage et les modules intégrés de réseaux sociaux, peuvent placer des cookies sur votre appareil pour suivre votre activité sur les réseaux sociaux.</li>
                    
                </ol>
            </div>
            <div>
                <h3>Comment contrôler les cookies ?</h3>
                <p>La plupart des navigateurs web vous permettent de contrôler les cookies via les paramètres du navigateur. Pour en savoir plus sur les cookies, y compris sur la manière de les voir, les gérer et les supprimer, visitez <a href='https://www.allaboutcookies.org'>www.allaboutcookies.org</a>.</p>
            </div>
            <div>
                <h3>Modification de notre Politique de Cookies</h3>
                <p>Nous nous réservons le droit de mettre à jour cette Politique de Cookies à tout moment. Toute modification sera publiée sur cette page avec la date de la dernière mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé des changements.</p>
            </div>
        </section>
    )
}