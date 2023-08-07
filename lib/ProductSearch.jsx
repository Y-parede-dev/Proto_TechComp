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

export const ProductSearchByTag = (param) => {
    let idPresent = []
    const returnSearch = (arr, id) => {
        arr.push(id)
        return arr = (arr.filter((x,i)=>arr.indexOf(x)===i))
    }
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
            console.log("Verification fin du try Effectuer ")
        }catch(err){
            console.error("error sur le catch ", err)
            console.error("PARAM (catch error) :", param)

        }
    return [ idPresent, DATA ]
}
export const ProductSearchByPrice = (param) => {
    let idPresent = []
    const returnSearch = (arr, id) => {
        arr.push(id)
        return arr = (arr.filter((x,i)=>arr.indexOf(x)===i))
    }
        try{
            DATA.map(pc=>{
                if(param.searchPrice >= pc.prix){
                    param.CTX.setSEARCH(returnSearch(idPresent, pc.id))
                    return returnSearch(idPresent, pc.id)
                }
            })
            console.log("Verification fin du try Effectuer ")
        }catch(err){
            console.error("error sur le catch ", err ,"PARAM :", param)
        }
        return [ idPresent ]
}