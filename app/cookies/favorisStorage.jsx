"use client"
import Cookies from "js-cookie";
import { useEffect, useState, useRef, useContext } from "react";
import { SearchCTX } from "../context/SearchCTX";

export const SaveFav = (props) => {
    
    const localStorageElt = localStorage.getItem('favoris');
    let favoris = [];
    if(localStorageElt==null || localStorageElt.length <1){
        favoris.push(props);
    }else{
        favoris.push(localStorageElt);
        if(favoris[0].includes(',')){
            favoris = favoris[0].split(',');
        }
        const result = favoris.filter((fav)=> fav !== props);
        const resultnoReap = favoris.filter((fav)=> fav == props)
        if(resultnoReap.length!=1){
            result.push(props);
        }
        favoris = result;
    }
    localStorage.setItem('favoris', favoris);
    Cookies.set('favoris', favoris)
    // console.log(localStorageElt)
};
export function FavExist(){
    const favorisCookies = Cookies.get('favoris')
    const lsFavActual = localStorage.getItem('favoris')
    if( favorisCookies !== undefined ){
        if(lsFavActual==null || lsFavActual.length<1){
            localStorage.setItem("favoris",favorisCookies);
        }
        else{
            console.log('LocalStorage is Allready initialize, this values is: '+ lsFavActual)
        }
    }
    else{
        console.log('favorisCookies is '+ favorisCookies)
        // console.log(lsFavActual)
    }
}