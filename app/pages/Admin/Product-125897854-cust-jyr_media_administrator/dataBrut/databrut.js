export const descriptions = (dataProduct) => {
    return {
        gaming: {
            ultra: `Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} est conçu pour une utilisation gaming optimal. La configuration de ce pc portable avec sa <strong>${dataProduct.config.gpu}</strong>, vous permet de jouer au derniers jeux sortie.`,
            good: `C'est l'ordinateur portable gaming par excellence ${dataProduct.denominateur} <strong>${dataProduct.title}</strong> et sa <strong>configuration gaming</strong> est un choix logique si vous rechercher une experience gaming de plus que correct.`,
            moyen:`Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} est conçu pour une utilisation bureautique optimal. La configuration de ce pc portable avec sa <strong>${dataProduct.config.gpu}</strong>, vous permet de jouer a certain jeux.`,
            bas:`Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} n'est pas conçu pour une utilisation gaming. La configuration <strong>${dataProduct.config.gpu}</strong>de ce pc portable, ne vous permétra pas de jouer aux jeux vidéos.`
        },
        rapidite: {
            ultra:`Cet ordinateur figure parmi les plus rapide du marché. Avec son ${dataProduct.config.cpu}, ses ${dataProduct.config.ram} et son disque SSD ultra rapide. Ce PC est un <strong>choix logique</strong> si vous rechercher a jouer au dernier jeux sortie avec un temp de chargement réduit grace a son SSD`,
            good:`Cet ordinateur figure parmi les plus rapide du marché. Avec son ${dataProduct.config.cpu}, ses ${dataProduct.config.ram} et son disque SSD ultra rapide. Ce PC est un <strong>choix logique</strong> si vous rechercher a jouer au dernier jeux sortie avec un temp de chargement réduit grace a son SSD`,
            moyen:`Cet ordinateur figure dans la moyene du marché. Avec son ${dataProduct.config.cpu}, ${dataProduct.config.ram} et son disque SSD super rapide. Ce PC est un <strong>choix logique</strong> si vous avez une utilisation Bureautique intermerdiaire, ${dataProduct.denominateur} ${dataProduct.title} Vous offre une rapidité optimale`,
            bas:`Cet ordinateur figure dans la moyene basse du marché. Avec son ${dataProduct.config.cpu}, ${dataProduct.config.ram} et à son disque SSD . Ce PC est un <strong>choix logique</strong> si vous avez une utilisation Bureautique, ${dataProduct.denominateur} ${dataProduct.title} Vous offre une rapidité dans la moyenne`
        },
        durabilite: {
            ultra:`La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC Portables en vente est de 3 ans.`,
            good:`La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC Portables en vente est de 3 ans.`,
            moyen:`La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC Portables en vente est de 3 ans.`,
            bas:`La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC Portables en vente est de 3 ans.`        
        },
        confort: {
            ultra: "L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un pc portable avec un <strong>Bon confort</strong> en général.",
            good: "L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un pc portable avec un <strong>Bon confort</strong> en général.",
            moyen: "L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un pc portable avec un <strong>Bon confort</strong> en général.",
            bas: "L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un pc portable avec un <strong>Bon confort</strong> en général."
        }
    };
};
export const arrayResolution = ["1920 x 1080", "2560 x 1440", "3200 x 1800", "3840 x 2160"];

export const arrayGoodBad = (dataProduct) => {
    return {
        good:{
            ultra:[
                `La memoire vive est excellente - ${dataProduct.config.ram.split("|")[0]} RAM`,
                `Le ${dataProduct.config.cpu} offre d'excellentes performances`,
                "Une exelente combinaison de composants pour des performance optimales",
                `La ${dataProduct.config.gpu} offre d'excellentes performances`,
                `Les ${dataProduct.config.ram.split("|")[0]} de Mémoire en ${dataProduct.config.ram.split("|")[1]} vous offre une rapidité extreme`,
            ],
            good:[
                `La capacité de stockage est excellente - ${dataProduct.config.stockage.split("|")[0]}`,
                `Le ${dataProduct.config.cpu} offre de bonnes performances`,
                "La mémoire vive (RAM) est excellente pour les jeux vidéo",

            ],
            moyen:[
                `La ${dataProduct.config.gpu} offre de correcte performances`,
                `Les ${dataProduct.config.ram.split("|")[0]} de Mémoire en ${dataProduct.config.ram.split("|")[1]} vous offre une rapidité correct`,
            ],
            bas:[
                `La résolution de l'écran est correcte ${dataProduct.resolution}`,
            ]
        },
        bad:{
            ultra:[
                'Le pc est un peut lourd',
            ],
            good:[
                'Le pc est un peut lourd',
            ],
            moyen:[
                "Peut etre facilement dépasser dans les jeux gourmands",
                "Ce pc portable n'est pas fait pour une utilisation gaming optimal.",
            ],
            bas:[
                "Un pc portable peut puissant.",
                "Ce pc portable n'est pas fait pour une utilisation gaming.",
            ]
        }
    };
};

export const arrProcResult = {
    ultra:["i9", 'ryzen 9', "m3"],
    good:["i7", 'ryzen 7', "m2"],
    moyen:["i5", "ryzen 5","m1"],
    bas:["i3", "ryzen 3", "intégré"]
}
export const arrGpuResult = {
    ultra:["rtx 4080", 'rtx 4090', "rtx 3080", 'rtx 3090', 'rtx 2080',"RX 7900"],
    good:["rtx 4070", 'rtx 4060', "RX 7600", "RX 7700", "gtx 1080", "gtx 1070", 'gtx 1650'],
    moyen:['rtx 4050', "RX 7500", "RX 7400", "gtx 1060", "gtx 1050", 'gtx 980', 'gtx 970'],
    bas:["intégré"]
}
export const arrRamResult = {
    ultra:['32', "64", '128', '254',"508"],
    good:['16'],
    moyen:['8'],
    bas:[" 7","6"]
}

// export const old__arrayGoodBad = (dataProduct) => {
//     return {
//         good:
//         [
//             `La memoire vive est excellente - ${dataProduct.config.ram.split("|")[0]} RAM`,
//             `Le ${dataProduct.config.cpu} offre de bonnes performances`,
//             `Le ${dataProduct.config.cpu} offre d'excellentes performances`,
//             `La capacité de stockage est excellente - ${dataProduct.config.stockage.split("|")[0]}`,
//             `Les 144 Hz sont une exelente idée pour les jeux compétitif`,
//             "Une exelente combinaison de composants pour des performance optimales",
//             "Un choix qualité prix optimal",
//             "Très léger pour un PC portable gaming perfomant",
//             "La mémoire vive (RAM) est excellente pour les jeux vidéo",
//             `La résolution de l'écran est satisfaisante ${dataProduct.resolution}`,
//             `La ${dataProduct.config.gpu} offre d'excellentes performances`,
//             `La ${dataProduct.config.gpu} offre de correcte performances`,
//             `Les ${dataProduct.config.ram.split("|")[0]} de Mémoire en ${dataProduct.config.ram.split("|")[1]} vous offre une rapidité extreme`,
//             `Les ${dataProduct.config.ram.split("|")[0]} de Mémoire en ${dataProduct.config.ram.split("|")[1]} vous offre une rapidité correct`,
//             "La dalle de l'écran en 240hz offre une rapidité d'affichage excellente pour les jeux compétitif"
            
//         ], bad:[
//             "L'écran étant très brillant il reflete beaucoup en exterieur.",
//             "un clavier un peut petit",
//             'Le pc est un peut lourd',
//             "Un pc portable peut puissant.",
//             "Une faible capacité de stockage",
//             "Ce pc portable n'est pas fait pour une utilisation gaming.",
//             "Un écran un peu petit."
//         ]
//     };
// };