import styles from './BarStyled.module.css'
// refactor a faire
const BarStyled = ({note, param}) => {
    const styleDynNoteBarBack = {
        transform: `scaleX(${note / 10})`, background:`var(--color-note-${Math.round(note)})`
    }
    const styleDynForPoint = {
        right: `${100 - (note * 10) }%`
    }
    const styleColorAndSizePoint = { // à voir car rendu chelou
        background:`var(--color-note-${Math.round(note)})`,
        transform: `scale(1.2)`
    }
    return(
        <div className={styles.barContent}>
            <div style={styleDynNoteBarBack} className={`${styles.barBack}`}>
        </div>
        <div style={styleDynForPoint} className={param?`${styles.pointContent} ${styles.pointContentOnSug}`:styles.pointContent}>
            <div style={styleColorAndSizePoint} className={styles.point}></div>
        </div>
    </div>
    )
}
export default BarStyled;