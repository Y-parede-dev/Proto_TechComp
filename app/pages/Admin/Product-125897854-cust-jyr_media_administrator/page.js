import AddProduct from './component/AddProduct'
import {getCookies} from './serverActions/getCookies'
import { BtnRedirect } from './component/btnRedirectForAdmin/btn_redirectAdmin'
const page = async () => {
    try{
        const cookieUidAdmin = await getCookies()
        if(cookieUidAdmin.value ===process.env.ADMIN_UID || cookieUidAdmin.value ===process.env.MODO_UID){
            return(
                <>
                    <AddProduct/>
                </>
            )
        }else{
            <>
                
                <BtnRedirect/>
            </>
        }

    }catch(error){
        return <>
                <BtnRedirect/>
            </>
    }
}    

export default page;