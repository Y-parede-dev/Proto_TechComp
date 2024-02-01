// import { InitFirebase } from '@/config/configFirebase/conf.firebase'

import { cache } from "react";

// import Header from '@/app/structure/header/Header'

// import { getDatabase, ref, onValue } from "firebase/database";
export const GET = cache( async (params) => {
        try {
            
            const response = await fetch(`${process.env.HOST}/api/Admin/byMarques?brand=${params.brand}`, {
                method: 'GET'
            })
            const DATA = await response.json();
            if(response.ok){
                return (DATA?.data)
            }else{
                console.error("Erreur de requette GET par marque", response.status)
                return []
            }
        } catch (error) {
            console.error("erreur lors de la requette fetch", error)
            return []
        }
    }
)