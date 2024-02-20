export const descriptions = (dataProduct) => {
    return {
        gaming: {
            ultra: `Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} est conçu pour une utilisation gaming optimale. La configuration de ce PC portable avec sa <strong>${dataProduct.config.gpu}</strong> vous permet de jouer aux derniers jeux sortis.`,
            good: `C'est l'ordinateur portable gaming par excellence ${dataProduct.denominator} <strong>${dataProduct.title}</strong>, et sa <strong>configuration gaming</strong> est un choix logique si vous recherchez une expérience gaming plus que correcte.`,
            moyen: `Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} est conçu pour une utilisation bureautique optimale. La configuration de ce PC portable avec sa <strong>${dataProduct.config.gpu}</strong> vous permet de jouer à certains jeux.`,
            bas: `Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} n'est pas conçu pour une utilisation gaming. La configuration <strong>${dataProduct.config.gpu}</strong> de ce PC portable ne vous permettra pas de jouer aux jeux vidéos.`
        },
        rapidite: {
            ultra: `Cet ordinateur figure parmi les plus rapides du marché. Avec son ${dataProduct.config.cpu}, ses ${dataProduct.config.ram} et son disque SSD ultra-rapide, ce PC est un <strong>choix logique</strong> si vous recherchez à jouer aux derniers jeux sortis avec un temps de chargement réduit grâce à son SSD.`,
            good: `Cet ordinateur figure parmi les plus rapides du marché. Avec son ${dataProduct.config.cpu}, ses ${dataProduct.config.ram} et son disque SSD ultra-rapide, ce PC est un <strong>choix logique</strong> si vous recherchez à jouer aux derniers jeux sortis avec un temps de chargement réduit grâce à son SSD.`,
            moyen: `Cet ordinateur figure dans la moyenne du marché. Avec son ${dataProduct.config.cpu}, ${dataProduct.config.ram} et son disque SSD super rapide, ce PC est un <strong>choix logique</strong> si vous avez une utilisation bureautique intermédiaire. ${dataProduct.denominator} ${dataProduct.title} vous offre une rapidité optimale.`,
            bas: `Cet ordinateur figure dans la moyenne basse du marché. Avec son ${dataProduct.config.cpu}, ${dataProduct.config.ram} et son disque SSD, ce PC est un <strong>choix logique</strong> si vous avez une utilisation bureautique. ${dataProduct.denominator} ${dataProduct.title} vous offre une rapidité dans la moyenne.`
        },
        durabilite: {
            ultra: `La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC portables en vente est de 3 ans.`,
            good: `La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC portables en vente est de 3 ans.`,
            moyen: `La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC portables en vente est de 3 ans.`,
            bas: `La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC portables en vente est de 3 ans.`
        },
        confort: {
            ultra: `L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un PC portable avec un <strong>bon confort</strong> en général.`,
            good: `L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un PC portable avec un <strong>bon confort</strong> en général.`,
            moyen: `L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un PC portable avec un <strong>bon confort</strong> en général.`,
            bas: `L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un PC portable avec un <strong>bon confort</strong> en général.`
        }
    };
};

export const arrayResolution = [`1920 x 1080`, `2560 x 1440`, `3200 x 1800`, `3840 x 2160`];

export const arrayGoodBad = (dataProduct) => {
    return {
        good: {
            ultra: [
                `La mémoire vive est excellente - ${dataProduct.config.ram.split("|")[0]} RAM`,
                `Le ${dataProduct.config.cpu} offre d'excellentes performances`,
                `Une excellente combinaison de composants pour des performances optimales`,
                `La ${dataProduct.config.gpu} offre d'excellentes performances`,
                `Les ${dataProduct.config.ram.split("|")[0]} de mémoire en ${dataProduct.config.ram.split("|")[1]} vous offrent une rapidité extrême`,
            ],
            good: [
                `La capacité de stockage est excellente - ${dataProduct.config.stockage.split("|")[0]}`,
                `Le ${dataProduct.config.cpu} offre de bonnes performances`,
                `La mémoire vive (RAM) est excellente pour les jeux vidéos`,
            ],
            moyen: [
                `La ${dataProduct.config.gpu} offre de correctes performances`,
                `Les ${dataProduct.config.ram.split("|")[0]} de mémoire en ${dataProduct.config.ram.split("|")[1]} vous offrent une rapidité correcte`,
            ],
            bas: [
                `La résolution de l'écran est correcte ${dataProduct.resolution}`,
            ]
        },
        bad: {
            ultra: [
                `Le PC est un peu lourd`,
            ],
            good: [
                `Le PC est un peu lourd`,
            ],
            moyen: [
                `Peut être facilement dépassé dans les jeux gourmands`,
                `Ce PC portable n'est pas fait pour une utilisation gaming optimale.`,
            ],
            bas: [
                `Un PC portable peu puissant.`,
                `Ce PC portable n'est pas fait pour une utilisation gaming.`,
            ]
        }
    };
};

export const arrProcResult = {
    ultra:[`i9`,`intel i9`, `amd ryzen 9`, `ryzen 9`, `m3`],
    good:[`i7`, `ryzen 7`,`intel i7`, `amd ryzen 7`, `m2`],
    moyen:[`i5`, `ryzen 5`,`intel i5`, `amd ryzen 5`,`m1`],
    bas:[`i3`, `ryzen 3`,`intel i3`, `amd ryzen 3`, `intégré`]
}
export const arrGpuResult = {
    ultra:[
        "AMD Radeon RX 6800",
        "AMD Radeon RX 6900 XT",
        "AMD Radeon RX 7800 XT",
        "AMD Radeon RX 7900 XT",
        `m3`,
        `m3 Pro`,
        `m3 Max`,
        `m3 ultra`,
        `puce m3`,
        `rtx 4080`,
        `rtx 4090`,
        `rtx 3080`,
        `rtx 3090`,
        `rtx 2080`,
        `RX 7900`,
        `AMD RX 7900`,
        `AMD radeon RX 7900`,
        `RX 7800`,
        `AMD RX 7800`,
        `AMD radeon RX 7800`,
        `nvida rtx 4080`,
        `nvidia geforce rtx 4080`,
        `nvida rtx 4090`,
        `nvidia geforce rtx 4090`,
        `nvida rtx 3080`,
        `nvidia geforce rtx 3080`,
        `nvida rtx 3090`,
        `nvidia geforce rtx 3090`,
        `nvida rtx 2080`,
        `nvidia geforce rtx 2080`,
    ],
    good:[
        "AMD Radeon RX 5700 XT",
        "AMD Radeon RX 6700 XT",
        "AMD Radeon RX 7000",
        "AMD Radeon RX 7050",
        "AMD Radeon RX 7080",
        "Nvidia GeForce RTX 2060",
        "Nvidia GeForce RTX 3060 Ti",
        "Nvidia GeForce RTX 3070",
        "Nvidia GeForce RTX 3070 Ti",
        "Nvidia GeForce RTX 3080 Ti",
        "Intel ARC A770 16 Go",
        "Intel ARC A770 8 Go",
        "Intel ARC A750",
        "ARC A770 16 Go",
        "ARC A770 8 Go",
        "ARC A770",
        `rtx 4070`,
        `rtx 4060`,
        `RX 7600`,
        `RX 7700`,
        `gtx 1080`,
        `gtx 1070`,
        `gtx 1650`,
        `Nvidia rtx 4070`,
        `Nvidia rtx 4060`,
        `Nvidia geforce rtx 4070`,
        `Nvidia geforce rtx 4060`,
        `AMD RX 7600`,
        `AMD RX 7700`,
        `AMD radeon RX 7600`,
        `AMD radeon RX 7700`,
        `nvidia gtx 1080`,
        `nvidia gtx 1070`,
        `nvidia gtx 1650`,
        `nvidia geforce gtx 1080`,
        `nvidia geforce gtx 1070`,
        `nvidia geforce gtx 1650`
    ],
    moyen:[
        "AMD Radeon RX 5600 XT",
        "AMD Radeon RX 5500 XT",
        "AMD Radeon RX 590",
        "AMD Radeon RX 470",
        "AMD Radeon RX 570",
        "AMD Radeon RX 580",
        "AMD Radeon RX 7000",
        "Nvidia GeForce GTX 1660 Super",
        "Nvidia GeForce GTX 1660 Ti",
        "Nvidia GeForce RTX 3050",
        "Nvidia GeForce RTX 3050 Ti",
        "Nvidia GeForce GTX 4060",
        "Intel ARC A770 8 Go",
        "Intel ARC A750",
        "Intel Iris Xe (intégrée)",
        "Apple M1 (intégrée)",
        "Apple M3 Pro",
        `m2`,
        `NVIDIA RTX 2000 Ada`,
        `rtx 4050`,
        `rtx 2000`,
        `rtx 2000 ada`,
        `RX 7500`,
        `RX 7400`,
        `gtx 1060`,
        `gtx 1050`,
        `gtx 980`,
        `gtx 970`,
        `Nvidia rtx 4050`,
        `Nvidia geforce rtx 4050`,
        `amd RX 7500`,
        `amd RX 7400`,
        `amd radeon RX 7500`,
        `amd radeon RX 7400`,
        `nvidia gtx 1060`,
        `nvidia gtx 1050`,
        `nvidia gtx 980`,
        `nvidia gtx 970`,
        `nvidia geforce gtx 1060`,
        `nvidia geforce gtx 1050`,
        `nvidia geforce gtx 980`,
        `nvidia geforce gtx 970`
    ],
    bas:[`intégré`, `cpu`, 'm1']
}
export const arrRamResult = {
    ultra:32,
    good:16,
    moyen:12,
    bas:8
}

// export const old__arrayGoodBad = (dataProduct) => {
//     return {
//         good:
//         [
//             `La memoire vive est excellente - ${dataProduct.config.ram.split("|")[0]} RAM`,
//             `Le ${dataProduct.config.cpu} offre de bonnes performances`,
//             `Le ${dataProduct.config.cpu} offre d\'excellentes performances`,
//             `La capacité de stockage est excellente - ${dataProduct.config.stockage.split("|")[0]}`,
//             `Les 144 Hz sont une exelente idée pour les jeux compétitif`,
//             `Une exelente combinaison de composants pour des performance optimales`,
//             `Un choix qualité prix optimal`,
//             `Très léger pour un PC portable gaming perfomant`,
//             `La mémoire vive (RAM) est excellente pour les jeux vidéos`,
//             `La résolution de l\'écran est satisfaisante ${dataProduct.resolution}`,
//             `La ${dataProduct.config.gpu} offre d\'excellentes performances`,
//             `La ${dataProduct.config.gpu} offre de correcte performances`,
//             `Les ${dataProduct.config.ram.split("|")[0]} de Mémoire en ${dataProduct.config.ram.split(`|`)[1]} vous offre une rapidité extreme`,
//             `Les ${dataProduct.config.ram.split(`|`)[0]} de Mémoire en ${dataProduct.config.ram.split(`|`)[1]} vous offre une rapidité correct`,
//             `La dalle de l\'écran en 240hz offre une rapidité d\'affichage excellente pour les jeux compétitif`
            
//         ], bad:[
//             `L\'écran étant très brillant il reflete beaucoup en exterieur.`,
//             `un clavier un peut petit`,
//             \'Le pc est un peut lourd\',
//             `Un pc portable peut puissant.`,
//             `Une faible capacité de stockage`,
//             `Ce pc portable n\'est pas fait pour une utilisation gaming.`,
//             `Un écran un peu petit.`
//         ]
//     };
// };