import imgs from '../../../img/Detail/poster.jpg';
import styles from '../../../css/details/Detail_num6.module.css';


export default function Num6_similar_col() {
    return (
        <div className={styles.similar_col}>
            <a>
                <div className={styles.similar_col_img}>
                    <img src={imgs}></img>
                </div>
                <div className={styles.similar_col_title}>
                    <h4>영화제목</h4>
                    <div className={styles.similar_col_title_detail}>
                        <p>평균 ★ 3.5</p>
                        <span>영화</span>
                    </div>
                </div>
            </a>
        </div>
    )
}

