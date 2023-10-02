"use client"

import produits from '@/data/dataProduits/produits.json' assert { type: 'json' }
import { useEffect, useState } from 'react'
import GetByJson from './GetByJson'

/**
 * 
 * @param {object} param //content: searchSepar & data 
 * @return {Array} idPresent // retourne un tableau avec tous les ID qui ont les mots cléf dans leurs tags
 */

const DATA = GetByJson()
const returnSearch = (arr, id) => {
    arr.push(id)
    return arr = (arr.filter((x,i)=>arr.indexOf(x)===i))
}
export const ProductSearchByTag = (param) => {
    let idPresent = []
        try{
            DATA.map(pc=>{
                param.searchTags.length===0?
                returnSearch(idPresent, pc.id)
                :
                pc.tags.filter(filteredTags=> {
                    param.searchTags.forEach(tag=>{
                        if(tag.includes("€") ){
                            alert(tag)
                        }
                        if(filteredTags.toLowerCase().includes(tag.toLowerCase())){
                            returnSearch(idPresent, pc.id)
                        }
                    })
                })
            })
            console.log("Verification fin du try Effectuer pour ProductSearchByTag")
        }catch(err){
            console.error("error sur le catch pour ProductSearchByTag", err)
            console.error("PARAM (catch error) :", param)

        }
    return [ idPresent, DATA ]
}
export const ProductSearchByPrice = (param) => {
    let idPresent = []
        try{
            DATA.map(pc=>{
                if(param.searchPrice > pc.prix){
                    param.CTX.setSEARCH(returnSearch(idPresent, pc.id))
                    return returnSearch(idPresent, pc.id)
                }
            })
            console.log("Verification fin du try Effectuer pour ProductSearchByPrice")
        }catch(err){
            console.error("error sur le catch pour ProductSearchByPrice", err ,"PARAM :", param)
        }
        return [ idPresent ]
}

export const ProductSearchByBrand = (param) => {
    let idPresent = []
        try{
            DATA.map(pc=>{
                if(param.searchBrand >= pc.Brand){
                    param.CTX.setSEARCH(returnSearch(idPresent, pc.id))
                    return returnSearch(idPresent, pc.id)
                }
            })
            console.log("Verification fin du try Effectuer pour ProductSearchByBrand")
        }catch(err){
            console.error("error sur le catch pour ProductSearchByBrand", err ,"PARAM :", param)
        }
        return [ idPresent ]
}
export const ClearSearch = (param) => {
    return [ param ]
}