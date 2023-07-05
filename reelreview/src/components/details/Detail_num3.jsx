import styles from '../../css/details/Detail_num3.module.css';
import MoviePeople from './smallComponents/people';




function Detailnum3(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.people}>

                <div className={styles.topHead}>
                    <h2>출연/제작</h2>
                </div>

                <div className={styles.cont}>
                    <MoviePeople></MoviePeople>
                    <MoviePeople></MoviePeople>
                    <MoviePeople></MoviePeople>
                </div>
                
            </div>
        </div>
    );
}


export default Detailnum3;