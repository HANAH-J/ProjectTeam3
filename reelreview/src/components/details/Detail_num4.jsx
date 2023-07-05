import styles from '../../css/details/Detail_num4.module.css';
import CommentsCol from './smallComponents/detailnum4Col';

function Detailnum4() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.topHead}>
                <div>
                    <h2>코멘트</h2><h3>3000+</h3>
                </div>
            </div>

            <div className={styles.cont}>
                <div className={styles.colby}>
                    <CommentsCol/>
                    <CommentsCol/>
                    <CommentsCol/>
                    <CommentsCol/>
                </div>
                <div>
                    <CommentsCol/>
                    <CommentsCol/>
                    <CommentsCol/>
                    <CommentsCol/>
                </div>
            </div>
        </div>
    );
}

export default Detailnum4;