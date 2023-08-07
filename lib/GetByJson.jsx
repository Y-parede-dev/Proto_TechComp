import produits from '@/data/dataProduits/produits.json' assert { type: 'json' }
const GetByJson = () => {
    const DATA = produits.produits

    return DATA
}
export default GetByJson;