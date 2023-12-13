export const descriptions = (dataProduct) => {
    return {
        gaming: [
            `Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} n'est pas conçu pour une utilisation gaming. La configuration <strong>${dataProduct.config.gpu}</strong>de ce pc portable, ne vous permétra pas de jouer aux jeux vidéos.`,
            `Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} est conçu pour une utilisation bureautique optimal. La configuration de ce pc portable avec sa <strong>${dataProduct.config.gpu}</strong>, vous permet de jouer a certain jeux.`
            ,
            `Cet ordinateur portable ${dataProduct.title} de chez ${dataProduct.brand} est conçu pour une utilisation gaming optimal. La configuration de ce pc portable avec sa <strong>${dataProduct.config.gpu}</strong>, vous permet de jouer au derniers jeux sortie.`
            ,
            `C'est l'ordinateur portable gaming par excellence ${dataProduct.denominateur} <strong>${dataProduct.title}</strong> et sa <strong>configuration gaming</strong> est un choix logique si vous rechercher une experience gaming de plus que correct.`
        ],
        rapidite: [
            `Cet ordinateur figure parmi les plus rapide du marché. Avec son ${dataProduct.config.cpu}, ses ${dataProduct.config.ram} et à son disque SSD ultra rapide. Ce PC est un <strong>choix logique</strong> si vous rechercher a jouer au dernier jeux sortie avec un temp de chargement réduit grace a son SSD`,
            `Cet ordinateur figure dans la moyene du marché. Avec son ${dataProduct.config.cpu}, ${dataProduct.config.ram} et à son disque SSD super rapide. Ce PC est un <strong>choix logique</strong> si vous avez une utilisation Bureautique intermerdiaire, ${dataProduct.denominateur} ${dataProduct.title} Vous offre une rapidité optimale`
        ],
        durabilite: [
            `La configuration de cet ordinateur lui permettra de rester <strong>compétitif pendant environ 4 ans</strong> (de 3 à 5 ans). La moyenne pour les PC Portables en vente est de 3 ans.`
        ],
        confort: [
            "L'aspect esthétique est très subjectif. Nous apprécions son design efficace qui en fait un pc portable avec un <strong>Bon confort</strong> en général."
        ]
    };
};
export const arrayResolution = ["1920 x 1080", "2560 x 1440", "3200 x 1800", "3840 x 2160"];

export const arrayGoodBad = (dataProduct) => {
    return {
        good:[
            `La memoire vive est excellente - ${dataProduct.config.ram.split("|")[0]} RAM`,
            `Le ${dataProduct.config.cpu} offre de bonnes performances`,
            `Le ${dataProduct.config.cpu} offre d'excellentes performances`,
            `La capacité de stockage est excellente - ${dataProduct.config.stockage.split("|")[0]}`,
            `Les 144 Hz sont une exelente idée pour les jeux compétitif`,
            "Une exelente combinaison de composants pour des performance optimales",
            "Un choix qualité prix optimal",
            "Très léger pour un PC portable gaming perfomant",
            "La mémoire vive (RAM) est excellente pour les jeux vidéo",
            `La résolution de l'écran est satisfaisante ${dataProduct.resolution}`,
            `La ${dataProduct.config.gpu} offre d'excellentes performances`,
            `La ${dataProduct.config.gpu} offre de correcte performances`,
            `Les ${dataProduct.config.ram.split("|")[0]} de Mémoire en ${dataProduct.config.ram.split("|")[1]} vous offre une rapidité extreme`,
            `Les ${dataProduct.config.ram.split("|")[0]} de Mémoire en ${dataProduct.config.ram.split("|")[1]} vous offre une rapidité correct`,
            "La dalle de l'écran en 240hz offre une rapidité d'affichage excellente pour les jeux compétitif"
            
        ], bad:[
            "L'écran étant très brillant il reflete beaucoup en exterieur.",
            "un clavier un peut petit",
            'Le pc est un peut lourd',
            "Un pc portable peut puissant.",
            "Une faible capacité de stockage",
            "Ce pc portable n'est pas fait pour une utilisation gaming.",
            "Un écran un peu petit."
        ]
    };
};
