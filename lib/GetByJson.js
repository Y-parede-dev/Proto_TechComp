// import { InitFirebase } from '@/config/configFirebase/conf.firebase'

import Header from '@/app/structure/header/Header'
import { InitFirebase } from '@/config/configFirebase/conf.init.firebase'
import produits from '@/data/dataProduits/produits.json' assert { type: 'json' }
import { getDatabase, ref, onValue } from "firebase/database";

const GetByJson = () => {
    const DATA = produits.produits;
    
    return DATA
}
export default GetByJson;


//::START::1 C'est des fou 😂 100 connexions meme pas eu le temp de le paramètrer
export const GetDataOnFireBase = () => {
    return new Promise((resolve, reject) => {
        const DATA = [];
        const appInit = InitFirebase();
        const BDD = getDatabase(appInit, 'https://techcomparateur-default-rtdb.europe-west1.firebasedatabase.app');
        const produit = ref(BDD, 'produits/');
        onValue(produit, (snapshot) => {
            DATA.push(...snapshot.val());
            resolve(DATA);
        });
        onValue(produit,(error)=>{
            reject(error)
        })
    });
};
//::END::1