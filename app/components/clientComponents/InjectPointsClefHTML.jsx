"use client"
const recupPointsClefHTML = (prod) => {
    return {__html: prod}
}
const InjectPointsCLefHTML = ({prod}) => {
    return(
        <p dangerouslySetInnerHTML={recupPointsClefHTML(prod)}></p>)
}

export default InjectPointsCLefHTML;