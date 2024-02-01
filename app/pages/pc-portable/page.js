// refactor a faire
import { VideoPlayer } from '../Admin/Product-125897854-cust-jyr_media_administrator/component/videoTuto/getUrlYoutube/VideoHomePage'
import styles from './page.module.css'
// import Script from 'next/script'
// import Link from 'next/link'
import ListeProduitsPagePcPortable from '@/app/components/suggestion/ListeProduitsPagePcPortable'
const Product = () => {

  const content = (
    <section className={styles.section}>
      <h1 className={styles.titlePagePcPortable}>Comparateur PC portables</h1>
      {/* <div className={styles.ILLUSTRATOR}>
        <VideoPlayer params={{id:'zm2jlUwownQ', opts:{
          // autoplay:1,
          width:'700px',
          height:"421px",
          playerVars:{
            controls:0,
            rel:0,
            showinfo:0
            // autoplay:1,
        }}}}/>
        <div className={styles.filterNoTouch}></div>
      </div> */}
      <ListeProduitsPagePcPortable />
    </section>
  )

  return (
      <div>{content}</div>
  )
}
export default Product