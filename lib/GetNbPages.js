import { cache } from "react";

export const GET = async () => {
    try {
        const response = await fetch(`${process.env.HOST}/api/Admin/pages/nbPages`,{
            method:'GET'
        })
        if(response.ok){
            const NbPages = await response.json();
            return (NbPages.data.totalPages);
        }else{
            console.error("Erreur de requette", response.status)
            return []
        }
    } catch (error) {
        console.error("erreur lors de la requette fetch", error)
        return []
    }
}