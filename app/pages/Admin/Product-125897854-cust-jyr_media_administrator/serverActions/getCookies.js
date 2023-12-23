"use server"
import {cookies} from 'next/headers';
export const getCookies = async () => {
        const admiUid = cookies().get('uidAdmin') 
        return new Promise((resolve)=>{
                resolve(admiUid)
        })
}