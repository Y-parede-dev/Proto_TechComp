import AddProduct from './component/AddProduct'
import {getCookies} from './serverActions/getCookies'


const page = async () => {
    try{
        const cookieUidAdmin = await getCookies()
        if(cookieUidAdmin.value ===process.env.ADMIN_UID){
            return(
                <>
                    <AddProduct></AddProduct>
                </>
            )
        }else{
            <>
                <p>redirect on progress ...</p>
            </>
        }

    }catch(error){
        return <>Erreur de cookies, vous n'etes pas administrateur du site</>
    }
}    

export default page;