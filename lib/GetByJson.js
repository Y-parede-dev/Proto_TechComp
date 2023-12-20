// import { InitFirebase } from '@/config/configFirebase/conf.firebase'

import Header from '@/app/structure/header/Header'

import produits from '@/data/dataProduits/produits.json' assert { type: 'json' }
import { getDatabase, ref, onValue } from "firebase/database";

export const GET = async () => {
    try {
        const response = await fetch(`${process.env.HOST}/api/Admin`, {
            method: 'GET'
        })
        if(response.ok){
            const DATA = await response.json();
            // console.log(DATA?.data)
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

const DATA = async () => {
    try {
        const result = await GET();
        // console.log("res", result)
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export { DATA };

//::START::1 C'est des fou 😂 100 connexions meme pas eu le temp de le paramètrer

