import styles from '../../../css/details/Detail_num4.module.css';
import imgs from '../../../img/Detail/people.jpg';
import { RiStarSFill } from "react-icons/ri";
import { FaThumbsUp } from "react-icons/fa";
import { ImBubble } from "react-icons/im";
import { useEffect, useState } from 'react';
import axios from 'axios';


function CommentsCol(props) {
    const comment = props.comment;
    const userCd = comment.userCd;
    console.log(comment);
    console.log(userCd);

    const [userData,setUserData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8085/details/commentGetUser",userCd)
        .then((response)=>{
            setUserData(response.data);
        }).catch((error)=>{
            console.log(error);
        });
    },[]);
    return(
        <div className={styles.col}>

            <div className={styles.card}>
                <div className={styles.cardTop}>
                    <div className={styles.cardTopInner}>
                        <div className={styles.cardTopLeft}>
                            <img src={userData.PFImage} className={styles.cardImg}/>
                                <p>{userData.userName}</p>
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
                    <a href='./commentDetail'>
                        <div className={styles.comment}>
                            <p>
                                {comment.commentContent}
                            </p>
                        </div>
                    </a>
                </div>
                <div className={styles.cardBottom}>
                    <span><FaThumbsUp size={14}/></span>
                    <p>{comment.commentGood}</p>
                    <span><ImBubble/></span>
                    <p>{comment.cCommentcount}1</p>
                </div>
            </div>
        </div>
    )
}

export default CommentsCol;