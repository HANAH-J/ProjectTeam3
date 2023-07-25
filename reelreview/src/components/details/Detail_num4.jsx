import styles from '../../css/details/Detail_num4.module.css';
import CommentsCol from './smallComponents/CommentsCol';

function Detailnum4(props) {
    const movieData = props.movieData;
    const comments = movieData.comments;
    console.log(comments);
    return(
        <div className={styles.wrapper}>
            <div className={styles.topHead}>
                <div>
                    <h2>코멘트</h2><h3>{comments.length}</h3>
                </div>
            </div>

            <div className={styles.cont}>
                <div className={styles.colby}>
                    {comments.length>0 && (
                        comments.map((comment, index) => (
                            index < 8 && <CommentsCol key={index} comment={comment} />
                        ))

                    )}
                    
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default Detailnum4;