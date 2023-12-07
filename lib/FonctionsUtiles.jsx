export const FilterNoRepeat = (arr) =>{
    return arr.filter((x,i)=> arr.indexOf(x)===i);
};
export  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}