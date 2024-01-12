"use client";
import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
export const ConsentCookiesCustom = () => {
    const CCContent = {
        guiOptions: {
            consentModal: {
                layout: "bar inline",
                position: "bottom",
                equalWeightButtons: true,
                flipButtons: false
            },
            preferencesModal: {
                layout: "box",
                position: "right",
                equalWeightButtons: true,
                flipButtons: false
            }
        },
        categories: {
            necessary: {
                readOnly: true
            },
            functionality: {},
            analytics: {},
            marketing: {}
        },
        language: {
            default: "fr",
            autoDetect: "browser",
            translations: {
                fr: {
                    consentModal: {
                        title: "Politique de consentement  d'utilisation des cookies!",
                        description: "\nPolitique de Consentement d'Utilisation des Cookies\n\nEn utilisant ce site, vous consentez à l'utilisation de cookies et de technologies similaires conformément à notre Politique de Cookies. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous permettent de reconnaître votre appareil lors de vos visites ultérieures. Ils sont utilisés pour améliorer votre expérience de navigation et analyser comment notre site est utilisé.\n\nNous utilisons différents types de cookies, y compris ceux nécessaires au bon fonctionnement du site, les cookies de fonctionnalité pour mémoriser vos préférences, les cookies d'analyse pour comprendre l'utilisation du site, et les cookies de marketing/publicité pour personnaliser les publicités en fonction de vos intérêts.\n\nVous pouvez contrôler et gérer l'utilisation des cookies dans les paramètres de votre navigateur. Pour plus d'informations sur les cookies et la manière de les gérer, veuillez consulter notre Politique de Cookies.\n\nEn continuant à utiliser notre site, vous acceptez notre utilisation des cookies. Pour toute question ou préoccupation, veuillez nous contacter à contact@itek-comparateur.fr.",
                        acceptAllBtn: "Accepter tout",
                        acceptNecessaryBtn: "Tout rejeter",
                        showPreferencesBtn: "Gérer les préférences",
                        footer: "<a href=\"https://www.itek-comparateur.fr/conditions\">Politique de confidentialité</a>\n<a href=\"https://www.itek-comparateur.fr/conditions\">Termes et conditions</a>"
                    },
                    preferencesModal: {
                        title: "Préférences de cookies",
                        closeIconLabel: "Fermer la modale",
                        acceptAllBtn: "Accepter tout",
                        acceptNecessaryBtn: "Tout rejeter",
                        savePreferencesBtn: "Sauver les préférences",
                        serviceCounterLabel: "Services",
                        sections: [
                            {
                                title: "Utilisation de Cookies",
                                description: "Notre site web utilise des cookies pour améliorer votre expérience tout en naviguant sur le site. Les cookies sont de petits fichiers texte qui sont stockés sur votre appareil lorsque vous visitez notre site. Nous utilisons ces cookies pour diverses raisons, y compris la personnalisation de votre expérience, l'analyse de l'utilisation du site et la diffusion de publicités ciblées.\n\nLes cookies que nous utilisons peuvent être classés dans les catégories suivantes :\n\nCookies Essentiels\nCes cookies sont nécessaires au bon fonctionnement du site. Ils vous permettent de naviguer sur les pages, d'accéder à des zones sécurisées, et d'utiliser les fonctionnalités de base du site.\n\nCookies de Fonctionnalité\nLes cookies de fonctionnalité sont utilisés pour améliorer la convivialité du site en mémorisant vos préférences, tels que la langue choisie ou la région dans laquelle vous vous trouvez.\n\nCookies d'Analyse\nNous utilisons des cookies d'analyse pour comprendre comment vous interagissez avec notre site. Ces informations nous aident à améliorer constamment notre site et à fournir des contenus pertinents.\n\nCookies de Marketing/Publicité\nNos partenaires publicitaires peuvent définir des cookies sur notre site afin de vous proposer des publicités personnalisées en fonction de vos centres d'intérêt et de votre historique de navigation.\n\nCookies de Réseaux Sociaux\nDes fonctionnalités de médias sociaux, telles que les boutons de partage et les modules intégrés de réseaux sociaux, peuvent placer des cookies sur votre appareil pour suivre votre activité sur les réseaux sociaux.\n\nEn utilisant notre site, vous consentez à l'utilisation de ces cookies conformément à notre Politique de Cookies <a href='https;//itek-comparateur.fr/cookies/politiqueCookies'>https;//itek-comparateur.fr/pages/cookies/politiqueCookies</a>."
                            },
                            {
                                title: "Cookies Strictement Nécessaires <span class=\"pm__badge\">Toujours Activé</span>",
                                description: "Ces cookies sont nécessaires pour assurer le bon fonctionnement de notre site. Ils nous permettent de vous fournir des fonctionnalités essentielles telles que la navigation sur les pages et l'accès à des zones sécurisées.",
                                linkedCategory: "necessary"
                            },
                            {
                                title: "Cookies de Fonctionnalité",
                                description: "Nous utilisons ces cookies pour personnaliser votre expérience sur notre site. Ils nous aident à vous montrer du contenu pertinent en fonction de vos préférences.",
                                linkedCategory: "functionality"
                            },
                            {
                                title: "Cookies Analytiques",
                                description: "Les cookies d'analyse nous aident à comprendre comment vous interagissez avec notre site. Ces informations sont utilisées pour améliorer notre site et rendre votre expérience de navigation plus agréable.",
                                linkedCategory: "analytics"
                            },
                            {
                                title: "Cookies Publicitaires",
                                description: "Nous utilisons ces cookies pour vous montrer des publicités qui pourraient vous intéresser. Ils permettent également de mesurer l'efficacité de nos campagnes publicitaires.",
                                linkedCategory: "marketing"
                            },
                            {
                                title: "Plus d'informations",
                                description: "Pour toute question concernant ma politique sur les cookies et vos choix, veuillez <a class=\"cc__link\" href=\"https://itek-comparateur.fr/contact\">me contacter</a>."
                            }
                        ]
                    }
                }
            }
        }
    }
    useEffect(()=>{
        CookieConsent.run({...CCContent});
    }, [])
}