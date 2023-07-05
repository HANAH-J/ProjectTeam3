import styles from '../../../css/details/Detail_num3.module.css';
import imgs from '../../../img/Detail/people.jpg';


export default function MoviePeople() {
    return (
        <div className={styles.people1}>
            <div className={styles.people1_1}>
                <a href='#' className={styles.people_link}>
                    <div className={styles.people_img}>
                        <img src={imgs} className={styles.people_img_img} />
                    </div>
                    <div className={styles.people_details}>
                        <h5>마동석</h5>
                        <p>성우 | 버니 루멘</p>
                    </div>
                </a>
            </div>
            <div className={styles.people1_1}>
                <a href='#' className={styles.people_link}>
                    <div className={styles.people_img}>
                        <img src={imgs} className={styles.people_img_img} />
                    </div>
                    <div className={styles.people_details}>
                        <h5>마동석</h5>
                        <p>성우 | 버니 루멘</p>
                    </div>
                </a>
            </div>
            <div className={styles.people1_1}>
                <a href='#' className={styles.people_link}>
                    <div className={styles.people_img}>
                        <img src={imgs} className={styles.people_img_img} />
                    </div>
                    <div className={styles.people_details}>
                        <h5>마동석</h5>
                        <p>성우 | 버니 루멘</p>
                    </div>
                </a>
            </div>
            <div className={styles.people1_1}>
                <a href='#' className={styles.people_link}>
                    <div className={styles.people_img}>
                        <img src={imgs} className={styles.people_img_img} />
                    </div>
                    <div className={styles.people_details}>
                        <h5>마동석</h5>
                        <p>성우 | 버니 루멘</p>
                    </div>
                </a>
            </div>
        </div>
    )
}