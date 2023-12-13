export const ConfigItem = (params) => {
    const {target, element, setDataProduct} = params;
    setDataProduct((prevDataProduct)=>({
        ...prevDataProduct,
        config:{
            ...prevDataProduct.config,
            [target]: element
        }
    }))
}