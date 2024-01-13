
import { createKysely } from "@vercel/postgres-kysely";
import { NextResponse } from "next/server"

export const GET = async () => {
    try{
        const db = createKysely()
        const totalItems = await db
                .selectFrom('produitstable')
                .where('id', '>', '0') // Utilise la fonction COUNT pour obtenir le nombre total d'éléments
                
                .execute();
        const totalPages= Math.ceil(totalItems.length/12);
        // const hasNextPage = param.page < totalPages;
        return NextResponse.json({ message: 'le getTotalPage fonctione',data:{totalPages} }, {status: 200});
    }catch(err){
        return NextResponse.json({error: err.message}, {status: 400});
    }
}