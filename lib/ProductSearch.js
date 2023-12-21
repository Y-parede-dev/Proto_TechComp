// "use client"

import { useContext, useEffect, useState } from 'react';
import {GET} from '@/lib/GetByJson';
import { SearchCTX  } from '@/app/context/SearchCTX';

/**
 * 
 * @param {object} param //content: searchSepar & data 
 * @return {Array} idPresent // retourne un tableau avec tous les ID qui ont les mots cléf dans leurs tags
 */
// let DATA = produitsTest.produits;
let DATA = []
// const RECUPDATA = async()=> {
//     try{
//         let result = await GET();
//         return result
//     }catch(error){
//         console.error(error)
//         return []
//     }
    
// };
// RECUPDATA()
//     .then((e)=>{
//         DATA = e
//     })
const loadData = async () => {
    try {
        const result = await GET();
        DATA = result;
    } catch (error) {
        console.error(error);
        DATA = [];
    }
};

const returnSearch = (arr, id, empty = false) => {
    arr.push(id);
    return arr = (arr.filter((x,i)=>arr.indexOf(x)===i));
};
export const ProductsByDefault = () => {
    
};
export const ProductSearchByTag = async (param) => {
    // alert(DATA)
    await loadData();
    let idPresent = [];
        // console.log(DATA)
        try{
            if(DATA&&DATA.length>0){
                DATA.forEach(pc=>{
                   param.searchTags.length===0?
                   returnSearch(idPresent, pc.id, true)

                   :
                   pc.tags.filter(filteredTags=> {
                       param.searchTags.forEach(tag=>{
                           if(tag.includes("€") ){
                               alert(tag);
                           };
                           if(filteredTags.toLowerCase().includes(tag.toLowerCase())){
                               returnSearch(idPresent, pc.id);
                           }
                       });
                   });
                });
            }else{
                console.log('aucune data')
            }
            console.log("Verification fin du try Effectuer pour ProductSearchByTag");
        }catch(err){
            console.error("error sur le catch pour ProductSearchByTag", err);
            console.error("PARAM (catch error) :", param);

        };
    return [ idPresent, DATA ];
};
export const ProductSearchByPrice = (param) => {
    let idPresent = [];
        try{
            DATA.map(pc=>{
                if(param.searchPrice > pc.prix){
                    param.CTX.setSEARCH(returnSearch(idPresent, pc.id));
                    return returnSearch(idPresent, pc.id);
                };
            });
            console.log("Verification fin du try Effectuer pour ProductSearchByPrice");
        }catch(err){
            console.error("error sur le catch pour ProductSearchByPrice", err ,"PARAM :", param);
        };
        return [ idPresent ];
};
export const ProductSearchByPriceInOrder = (param)=> {
    let idPresent = [];
    let pcSortByPriceCroissant;
    try {
        pcSortByPriceCroissant = DATA.sort((prixMin, prixMax)=>{
            return prixMin.prix - prixMax.prix;
        });
        pcSortByPriceCroissant.map(pc=>{
            param.CTX.setSEARCH(returnSearch(idPresent, pc.id));
            return returnSearch(idPresent, pc.id);
        });
    } catch (error) {
        console.error(error);
    };
};
export const ProductSearchByPriceInDisorder = (param)=> {
    let idPresent = [];
    let pcSortByPriceDisorder;
    try {
        pcSortByPriceDisorder = DATA.sort((prixMin, prixMax)=>{
            return prixMax.prix - prixMin.prix;
        });
        pcSortByPriceDisorder.map(pc=>{
            param.CTX.setSEARCH(returnSearch(idPresent, pc.id));
            return returnSearch(idPresent, pc.id);
        });
    } catch (error) {
        console.error(error);
    };
};
export const ProductSearchByBrand = (param) => {
    let idPresent = [];
        try{
            DATA.map(pc=>{
                if(param.searchBrand >= pc.Brand){
                    // param.CTX.setSEARCH(returnSearch({arr:idPresent,id: pc.id}));
                    return returnSearch(idPresent, pc.id);
                }
            })
            console.log("Verification fin du try Effectuer pour ProductSearchByBrand");
        }catch(err){
            console.error("error sur le catch pour ProductSearchByBrand", err ,"PARAM :", param);
        };
        return [ idPresent, DATA ];
};
export const ClearSearch = (param) => {
    return [ param ];
};
export const ProductSearchById = (param) => {
    // console.log(param.searchId)
    let idPresent = [];
    let FavExistant = []
        try{
            DATA.map((Pc)=>{
                for(let id of param.searchId){

                    if(Pc.id === id){
                        idPresent.push(Pc.id)
                        FavExistant.push(Pc)
                    }
                }
                // param.searchId.foreach((id)=>{
                // })
            })
            param.CTX.setSEARCH(idPresent);
            console.log("Verification fin du try Effectuer pour ProductSearchById");
        }catch(err){
            console.error("error sur le catch pour ProductSearchById", err);
            console.error("PARAM (catch error) :", param);
        };
    return [ idPresent, FavExistant ];
}