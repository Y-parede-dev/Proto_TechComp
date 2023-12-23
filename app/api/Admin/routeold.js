import { NextResponse } from "next/server"
import fs from 'fs/promises';
import path from "path";

const filePath = path.join(__dirname, "data", "dataProduits", "produits.test.json");
import { fileExistsCustom } from "../utils/utilsForApi";
export async function GET(req){
    const currentData = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(currentData);
    try {
        
        return NextResponse.json({ message: 'le get fonctione', data: jsonData.produits}, {status: 200});

    } catch (error) {
        console.error(error.message);
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
export async function POST(req){

    try {
        const fileExists = await fileExistsCustom(filePath);

        if (!fileExists) {
            await fs.writeFile(filePath, JSON.stringify({ produits: [] }, null, 2), 'utf-8');
            console.log("File created with initial content");
        }
        const currentData = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(currentData);
        const body = await req.json();
        jsonData.produits.push(body);
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log("write on json complete");
        return NextResponse.json({message: 'le POST fonctione'}, {status: 201});
    } catch (error) {
        console.error(error.message)
        console.error(error)
        return NextResponse.json({error: error.message}, {status: 400});
    }
}