import { NextResponse } from "next/server"

export async function GET (req) {
    try {
        const response = await fetch("https://app.affilizz.com/fr/publications?mediaId=648d8944cd55e414fc565774");
        const html = await response.text();
        NextResponse.json({ message: 'le get fonctione', data: html}, {status: 200})
    } catch (error) {
        NextResponse.json({ message: 'erreur get ', data:error}, {status: 400})
        
    }

}