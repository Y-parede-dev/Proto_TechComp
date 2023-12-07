// import { InitFirebase } from '@/config/configFirebase/conf.firebase'
import Header from '@/app/structure/header/Header'
import { InitFirebase } from '@/config/configFirebase/conf.init.firebase'
import produits from '@/data/dataProduits/produits.json' assert { type: 'json' }
const GetByJson = async() => {
    // let bodyReq = InitFirebase()
    // const header = new Headers()
    // const req = await fetch('https://techcomparateur-default-rtdb.europe-west1.firebasedatabase.app/produits', bodyReq);
    // const res = await req.json()
    // console.log(req)
    // console.log(bodyReq)
    const DATA = produits.produits

    return DATA
}
export default GetByJson;