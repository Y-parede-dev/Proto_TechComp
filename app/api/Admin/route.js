import { NextResponse } from "next/server"
import fs from 'fs/promises';
import path from "path";
// export const dynamic = "force-dynamic";
// const filePath = './data/dataProduits/produits.test2.json';
// const filePath = process.env.API_PRODUCT_URL;
const filePath = path.join(__dirname, "data", "dataProduits", "produits.test.json");
import { fileExistsCustom } from "../utils/utilsForApi";
import { request } from "http";
import { createKysely } from "@vercel/postgres-kysely";
import { sql } from "@vercel/postgres";

export async function GET(req){
    try {
        const db = createKysely()
        const result = await db
            .selectFrom('produitstable').selectAll()
            .execute()
        
        return NextResponse.json({ message: 'le get fonctione', data: result}, {status: 200});
    } catch (error) {
        
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
export async function POST(req){

    try {
        const { createKysely } = require('@vercel/postgres-kysely');

    const db = createKysely();
    let body = await req.json();
    delete body.denominateur;

    await db
        .insertInto('produitstable')
        .values({
            brand:body.brand,
            btn:JSON.stringify(body.btn),
            title:body.title,
            tags:body.tags,
            images:body.images,
            description:JSON.stringify(body.description),
            id:body.id,
            loading:'lazy',
            usage:body.usage,
            conseil:body.conseil,
            resolution:body.resolution,
            config:JSON.stringify(body.config),
            prix:body.prix,
            bonus:body.bonus,
            arrayaff: JSON.stringify(body.arrayaff),
            pointsclef: JSON.stringify(body.pointsclef),
            notedesc:JSON.stringify(body.notedesc),
            notegaming:JSON.stringify(body.notegaming),
            })
        .execute();
    
        return NextResponse.json({message: 'le POST fonctione'}, {status: 201});
    } catch (error) {
        console.error(error.message)
        console.error(error)
        return NextResponse.json({error: error, error_message: error.message}, {status: 400});
    }
}