import styles from './Note.module.css'
// refactor a faire
const Note = (params) => {
    return(
        <div className={styles.container}>
            <div className={params>7.5? `${styles.bar_active} ${styles.bar}`:styles.bar}> <p>{params>7.5&& params}</p></div>
            <div className={params<7.6&&params>5.5? `${styles.bar_active} ${styles.bar}`:styles.bar}> <p>{params<7.6&&params>5.5 && params} </p></div>
            <div className={params<5.6&&params>3.5? `${styles.bar_active} ${styles.bar}`:styles.bar}> <p>{params<5.6&&params>3.5 && params} </p></div>
            <div className={params<3.6&&params>2.5? `${styles.bar_active} ${styles.bar}`:styles.bar}> <p>{params<3.6&&params>2.5&& params} </p></div>
            <div className={params<2.6 ? `${styles.bar_active} ${styles.bar}`:styles.bar}> <p>{params<2.6&& params} </p></div>
        </div>
    )
}

export default Note;