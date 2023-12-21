// import fs from 'fs/promises';
// import Cors from 'cors';

// const cors = Cors({
//     methods:["GET", "POST"]
// })
// export const handler = async (req, res) => {
//     // console.log(req)

//     // await cors(req, res)
//     // console.log(req)
//     try {
//         const currentData = await fs.readFile(filePath, 'utf-8');
//         const jsonData = JSON.parse(currentData);
//         const body = JSON.parse(req.body);
//         jsonData.produits.push(body);
//         await fs.appendFile(filePath, `,\n${JSON.stringify(productData, null, 2)}`, 'utf-8');
//         // console.log("write on json complete");
//         return res.status(200).json({success: true, message: 'le produit a été ajouter au fichier produit.json avec succes'});
        
//     } catch (error) {
//         console.error(error)
//         return res.status(400).json({success: false, message: "erreur client au moment de l'écriture sur le fichier produits.json"})
//     }
// }