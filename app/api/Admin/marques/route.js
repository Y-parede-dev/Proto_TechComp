import { NextResponse } from "next/server"
import { createKysely } from "@vercel/postgres-kysely";
import { performance } from 'perf_hooks';
export async function GET(){
    try {
        const start = performance.now();
        const db = createKysely()
        const result = await db
            .selectFrom('produitstable')
            .select('brand')
            .distinct()
            .execute();
        
        const end = performance.now();
        console.log(`Temps d'exécution du GETBRAND Server : ${end - start} millisecondes`);
        return NextResponse.json({ message: 'le get marque fonctione', data: result }, {status: 200});
    } catch (error) {
        
        return NextResponse.json({error: error.message}, {status: 400});
    }
}