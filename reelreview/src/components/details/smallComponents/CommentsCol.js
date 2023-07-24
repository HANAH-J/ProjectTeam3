import styles from '../../../css/details/Detail_num4.module.css';
import { RiStarSFill } from "react-icons/ri";
import { FaThumbsUp } from "react-icons/fa";
import { ImBubble } from "react-icons/im";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CommentsCol(props) {
    const comment = props.comment;
    const userCd = comment.userCd;
    console.log(comment);
    console.log(userCd);

 
    return(
        
        <div className={styles.col}>
            {comment &&(
                <div className={styles.card}>
                <div className={styles.cardTop}>
                    <div className={styles.cardTopInner}>
                        <div className={styles.cardTopLeft}>
                            <img src={comment.pFImage} className={styles.cardImg}/>
                                <p>{comment.userName}</p>
                        </div>
                        <div className={styles.cardTopRight}>
                            <div className={styles.cardStars}>
                                <RiStarSFill size={20} className={styles.stars}/>
                                <p>3.5</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cardMiddle}>
                    <Link to="/commentDetail" state={{"comment":comment}}>  
                        <div className={styles.comment}>
                            <p>
                                {comment.commentContent}
                            </p>
                        </div>
                    </Link>
                </div>
                <div className={styles.cardBottom}>
                    <span><FaThumbsUp size={14}/></span>
                    <p>{comment.commentGood}</p>
                    <span><ImBubble/></span>
                    <p>{comment.cCommentcount}1</p>
                </div>
            </div>
            )}
            
        </div>
    )
}

export default CommentsCol;