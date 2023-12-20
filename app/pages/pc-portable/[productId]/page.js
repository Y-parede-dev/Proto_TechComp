// refactor a faire
// import styles from './page.module.css'
// import ImageAndLinkAffiliate from "./clientComponents/ImageAndLinkAffiliate"
// import iconCpu from './inconsConfig/icon_cpu.png'
// import iconRam from './inconsConfig/icon_ram.png'
// import iconGpu from './inconsConfig/icon_gpu.png'
// import iconScreen from './inconsConfig/icon_screen.png'
// import iconStockage from './inconsConfig/icon_stockage.png'
// import iconOS from './inconsConfig/icon_OS.png'
// import Image from 'next/image'
// import Notation from '@/app/components/clientComponents/Notation'
// import SuggestionMap from '@/app/components/suggestion/SuggestionMap'
// import {PointsCles} from '@/app/pages/pc-portable/[productId]/SSRCompponents/pointsCles/PointsCles'
import {DATA, GET} from '@/lib/GetByJson'
import { FetchDataForPageProduct } from './clientComponents/FetchDataForPageProduct'

// console.log(data)

export async function getServerSideProps() {
  const produits = await GET();
  console.log("Appel de generateStaticParams");
  // console.log( " pp ",produits)
  
  return produits.map((produit) => ({
    params: {
      productId: produit.id
    },
    revalidate: 0
  }));
}
export async function generateMetadata({ params }) {
  try {
    console.log("params", params)
    const allProducts = await GET();
    // Trouvez le produit spécifique par l'ID
    const produit = allProducts.find((e) => params.productId === e.id);

    // console.log("Produit trouvé :", produit);
   allProducts.map((e)=>{
    console.log(e.id)
    if(e.id===params.productId){
      console.log("Produit trouvé :", produit);
    }
    else {
      console.log("Produit Non trouvé");
    }
   })
    // console.log("Produits trouvé :", allProducts);

    return {
      title: produit?.title,
      description: produit?.description,
    };
  } catch (error) {
    console.error("Erreur lors de la génération des métadonnées :", error);
    return {
      title: "Erreur",
      description: "Erreur lors de la génération des métadonnées.",
    };
  }
}
const Page = ({params}) => {

  console.log("params", params)
  return (
      <>
        <FetchDataForPageProduct params={params.productId}></FetchDataForPageProduct>
      </>
  )
}
export default Page