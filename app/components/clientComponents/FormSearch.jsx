"use client"
// refactor a faire
import {useContext, useEffect, useState} from "react"
import styles from "./FormSearch.module.css"
import Icon from '@mui/material/Icon';
import {ProductSearchByTag} from "@/lib/ProductSearch";
import {SearchCTX, SearchCTXDispach} from '@/app/context/SearchCTX'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
// import produits from '@/data/dataProduits/produits.json' assert {type: 'json'}
import config from '@/config/config.json' assert {type: 'json'}
import { useRouter } from "next/navigation";
import GET from "@/lib/GetByJson";
import { FilterNoRepeat } from "@/lib/FonctionsUtiles";

const FormSearch = () => {
    const CTX = useContext(SearchCTX)
    const [showlabel, setShowLabel] = useState(true)
    const [searchTags, setSearchTags] = useState([])
    const [idSearch, setIdSearch] = useState([])
    const [focusinput, setFocusinput] = useState(false)
    const [sub, setSub] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const router = useRouter()
    // useEffect(()=>{
    //     setData(GET())
    // }, [])
    useEffect(()=>{
        if(focusinput){
            document.getElementById('labelSearch').classList.add(styles.label_search_alt)
        }else{
            document.getElementById('labelSearch').classList.remove(styles.label_search_alt)
        }
    },[focusinput])
    useEffect(()=>{
        setSearchTags(search.split(' '))
    },[search])
    useEffect(()=>{
        if(sub===true){
            CTX.setTAG(searchTags)
            router.push(`/pages/pc-portable`)
            setSub(false)
        }
    },[idSearch])
    const handleSubmit = async (e, del=false) => {
        e.preventDefault();
        let [recupId, data] = await ProductSearchByTag({searchTags})
        if(del){
            CTX.setSEARCH([])
            return
        }
        
        recupId = FilterNoRepeat(recupId) //recupId.filter((x,i)=> recupId.indexOf(x)===i)
        e.preventDefault()
        setIdSearch(recupId)
        CTX.setSEARCH(recupId)
        setSub(true)

    }
    const focus = () => {
        setFocusinput(true)
    }
    const unFocus = () => {
        setFocusinput(false)
    }
    const deleteSearch = (e) => {
        setSearch("")
        setSearchTags([])
        handleSubmit(e,true)
    }
    const searchInput = (e) => {
        setSearch(e.target.value)
        //STAR:test pour affichage ou non du label
        if(e.target.value.length>0){
            setShowLabel(false)
            return
        }
        setShowLabel(true)
        //END:test pour affichage ou non du label
    }
    return (
        <form className={styles.formSearch} onSubmit={handleSubmit}>
            <div className={styles.form_item}>
                <SearchIcon className={styles.iconSearch} onClick={handleSubmit}/>
                {search.length>0&&<ClearIcon className={styles.iconClear} onClick={deleteSearch} />}
                <label className={styles.label_search} id="labelSearch" htmlFor="recherche">{showlabel?"Rechercher...":''}</label>
                <input 
                    maxLength={40}
                    autoComplete="off"
                    autoCorrect="off"
                    className={styles.input_search}
                    list="empty"
                    type="text"
                    name="recherche"
                    id="recherche"
                    value={search}
                    onChange={(e)=>{searchInput(e)}}
                    onFocus={(e)=>focus(e) }
                    onBlur={()=>unFocus()} />
                <datalist id="empty"/>
            </div>
        </form>    
    )
}
export default FormSearch