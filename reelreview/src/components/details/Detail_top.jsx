
import Header_Dark from "../../components/Header/Header";
import styles from '../../css/details/Detail_top.module.css';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

function Detailtop(props) {

    return(
        <div>
            <p>{props.movieCd}</p>
           <div className={styles.nav}>
            <Header_Dark/>  
           </div>
            <div className={styles.detail_first}>
                <div className={styles.detail_movie_back}>
                    
                    <div className={styles.detail_movie_top}>
                        <h1>엘리멘탈</h1>
                        <div className={styles.detail_movie_top_inEn}>
                            Elemental
                        </div>
                        <div className={styles.openDate_genre_country}>
                            <div className={styles.openDate}>2023</div>
                            <div className={styles.genre}>애니메이션/모험/판타지/SF/로맨스</div> 
                            <div className={styles.country}>미국</div> 
                        </div>
                        <div className={styles.playTime_ageRating}>
                            <div className={styles.playTime}>1시간 33분</div>
                            <div className={styles.ageRating}>전체</div> 
                        </div>
                        <div className={styles.boxOfficeData}>
                            <div className={styles.boxOfficePercent}>예매 순위 1위(35%)</div>
                            <div className={styles.timeSinceOpen}>개봉 17일째</div>
                            <div className={styles.totalAudience}>누적 관객 156만명</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Detailtop;