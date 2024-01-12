import { arrayGoodBad, descriptions } from "../dataBrut/databrut";

export const ConfigItem = (params) => {
    console.log(params)
    const {target, element, setDataProduct} = params;
    setDataProduct((prevDataProduct)=>({
        ...prevDataProduct,
        config:{
            ...prevDataProduct.config,
            [target]: element
        }
    }))
}
const checkPartialMatch = (input, keyword) => {
    const normalizedInput = input.toLowerCase().replace(/\s/g, '');  // Convertit en minuscules et supprime les espaces
    const normalizedKeyword = keyword.toLowerCase().replace(/\s/g, '');

    const keywordLength = normalizedKeyword.length;
    const threshold = Math.ceil(keywordLength * 0.9);  // Correspondance de 90%

    let matchCount = 0;

    for (let i = 0; i < keywordLength; i++) {
        if (normalizedInput.includes(normalizedKeyword[i])) {
            matchCount++;
        }
    }

    return matchCount >= threshold;
};
export const checkElement = (params) => {
    const normalisedInput = params.element.toLowerCase().replace(/\s/g, '');

    // Vérifier si l'input inclut l'un des éléments du tableau pour chaque catégorie
    for (const [category, keywords] of Object.entries(params.array)) {
        if (keywords.some(keyword => normalisedInput.includes(keyword.toLowerCase().replace(/\s/g, '')))) {
            // Attribuer une note en fonction de la catégorie
            switch (category) {
                case 'ultra':
                    return 10;
                case 'good':
                    return 8;
                case 'moyen':
                    return 7;
                case 'bas':
                    return 5;
                default:
                    return 5;
            }
        }
    }

    // Si l'élément n'est pas trouvé dans l'input, retourner une note par défaut
    return 0;
};
export const checkElementGpu = (params) => {
    const normalisedInput = params.element.toLowerCase().replace(/\s/g, '');
    let note=0;
    // Vérifier si l'input inclut l'un des éléments du tableau pour chaque catégorie
    for (const [category, keywords] of Object.entries(params.array)) {
        if (keywords.some(keyword => normalisedInput.includes(keyword.toLowerCase().replace(/\s/g, '')))) {
            // Attribuer une note en fonction de la catégorie
            switch (category) {
                case 'ultra':
                    note=10;
                    break
                case 'good':
                    note=8;
                    break
                case 'moyen':
                    note=7;
                    break
                case 'bas':
                    note=0;
                    break
                default:
                    note=0;
                    break;
            }
        }
    }
    if(note===0){
        if(
            params.element.toLowerCase().includes('geforce')||
            params.element.toLowerCase().includes('radeon')){
                note=5
        }
    }
    // Si l'élément n'est pas trouvé dans l'input, retourner une note par défaut
    return note;
};
export const checkIntElement = (params) => {
    const normalizedInput = params.val.toLowerCase().replace(/\s/g, '').split('go')[0];
    const inputToInt = parseInt(normalizedInput);
    let note = 0;
    const sortedEntries = Object.entries(params.Obj).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    for (const[cat, threshold] of sortedEntries){
        if(inputToInt>= threshold){
            switch (cat) {
                case 'ultra':
                    note = 10;
                    break;
                case 'good':
                    note = 8;
                    break;
                case 'moyen':
                    note = 6;
                    break;
                case 'bas':
                    note = 5;
                    break;
                default:
                    note = 0;
            }
        }
    }
    return note
}
export const moyeneElement = (params) => {
    const nombresNotes = params.notes.length;
    let moyene = 0;
    params.notes.forEach((note)=>{
        moyene+=note;
    });
    moyene = Math.round(moyene / nombresNotes);
    return moyene;
};
export const setDescribeAuto = (params) => {
    if(params.note>=9){
        return descriptions(params.data)[params.element].ultra
    }else if(params.note>=7 && params.note<=8){
        return descriptions(params.data)[params.element].good
    }else if(params.note>=5 && params.note<=6){
        return descriptions(params.data)[params.element].moyen
    }else{
        return descriptions(params.data)[params.element].bas
    }
};
export const setGoodBadPointAuto = (params) => {
    const res = {
        good:["null"],
        bad: ["null"]
    } 
    if(params.note>= 9){
        res.good = arrayGoodBad(params.data).good.ultra;
        res.bad = arrayGoodBad(params.data).bad.ultra
    }else if(params.note>=7 && params.note<=8){
        res.good = arrayGoodBad(params.data).good.good;
        res.bad = arrayGoodBad(params.data).bad.good
    }else if(params.note>=5 && params.note<=6){
        res.good = arrayGoodBad(params.data).good.moyen;
        res.bad = arrayGoodBad(params.data).bad.moyen
    }else{
        res.good = arrayGoodBad(params.data).good.bas;
        res.bad = arrayGoodBad(params.data).bad.bas
    }
    return res
}