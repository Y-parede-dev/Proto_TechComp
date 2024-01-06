// import { InitFirebase } from '@/config/configFirebase/conf.firebase'

import { cache } from "react";

// import Header from '@/app/structure/header/Header'

// import { getDatabase, ref, onValue } from "firebase/database";
export const GET = cache( async () => {
        try {
            
            const response = await fetch(`${process.env.HOST}/api/Admin`, {
                method: 'GET'
            })
            if(response.ok){
                const DATA = await response.json();

                return (DATA?.data)
            }else{
                console.error("Erreur de requette", response.status)
                return []
            }
        } catch (error) {
            console.error("erreur lors de la requette fetch", error)
            return []
        }
    }
)