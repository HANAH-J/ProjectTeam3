import React from "react";
import styles from '../../../css/profile/UserComment.module.css';
import img from '../../../img/profile/userProfile/empty_user.svg';
import Header from "../../../components/Header/Header";
import { Link } from 'react-router-dom';

function UserComment() {
    
    return(

      <div className={styles.userComment}>
        <Header/>
        <div className={styles.userComment_PageHeader}>
          <Link to="../UserProfile"><div className={styles.userComment_Header_Arrow}></div></Link>
          <div className={styles.userComment_Title}> <h2>User Name님의 코멘트</h2> </div>
        </div>

        <div className={styles.userComment_container}>
          <ul className={styles.userComment_movie}>
            <ul className={styles.userComment_movieHeader}>
              <li>
                <img
                  className={styles.userComment_movieHeader_PFP}
                  src={img}
                  alt='User PFP'
                  />
              </li>
              <li className={styles.userComment_movieHeader_name}>User Name</li>
              <li className={styles.userComment_movieHeader_rating}>★ 3.5</li>
            </ul>
            <ul className={styles.userComment_movieFooter}>
                <li>
                  <img
                    className={styles.userComment_moviePoster}
                    src='https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg'
                    alt='Movie Poster'
                    />
                </li>
              <ul className={styles.userComment_commentContainer}>
                  <li className={styles.userComment_movieTitle}>엄청나게 긴 영화 제목입니다</li>
                  <li className={styles.userComment_commentContent}>엄청나게 긴 코멘트내용 가나다라마바사 아자차카타파하 
                  가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하
                  가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하
                  가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하
                  가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하
                  가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하
                  가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하
                  </li>
              </ul>
            </ul>
            <ul className={styles.userComment_commentFooter}>
              <li className={styles.userComment_commentLikes}>좋아요 [개수] </li>
              <li className={styles.userComment_commentCmt}>댓글 [개수] </li>
            </ul>
          </ul>
            
        </div>

        <div className={styles.userComment_container}>
          <ul className={styles.userComment_movie}>
            <ul className={styles.userComment_movieHeader}>
              <li>
                <img
                  className={styles.userComment_movieHeader_PFP}
                  src={img}
                  alt='User PFP'
                  />
              </li>
              <li className={styles.userComment_movieHeader_name}>User Name</li>
              <li className={styles.userComment_movieHeader_rating}>★ 3.5</li>
            </ul>
            <ul className={styles.userComment_movieFooter}>
                <li>
                  <img
                    className={styles.userComment_moviePoster}
                    src='https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg'
                    alt='Movie Poster'
                    />
                </li>
              <ul className={styles.userComment_commentContainer}>
                  <li className={styles.userComment_movieTitle}>엄청나게 긴 영화 제목입니다</li>
                  <li className={styles.userComment_commentContent}>엄청나게 긴 코멘트내용 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하</li>
              </ul>
            </ul>
            <ul className={styles.userComment_commentFooter}>
              <li className={styles.userComment_commentLikes}>좋아요 [개수] </li>
              <li className={styles.userComment_commentCmt}>댓글 [개수] </li>
            </ul>
          </ul>
            
        </div>

        <div className={styles.userComment_container}>
          <ul className={styles.userComment_movie}>
            <ul className={styles.userComment_movieHeader}>
              <li>
                <img
                  className={styles.userComment_movieHeader_PFP}
                  src={img}
                  alt='User PFP'
                  />
              </li>
              <li className={styles.userComment_movieHeader_name}>User Name</li>
              <li className={styles.userComment_movieHeader_rating}>★ 3.5</li>
            </ul>
            <ul className={styles.userComment_movieFooter}>
                <li>
                  <img
                    className={styles.userComment_moviePoster}
                    src='https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg'
                    alt='Movie Poster'
                    />
                </li>
              <ul className={styles.userComment_commentContainer}>
                  <li className={styles.userComment_movieTitle}>엄청나게 긴 영화 제목입니다 극장판 짱구는 못말려: 수수께끼! 꽃피는 천하떡잎학교</li>
                  <li className={styles.userComment_commentContent}>엄청나게 긴 코멘트내용 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하 가나다라마바사 아자차카타파하</li>
              </ul>
            </ul>
            <ul className={styles.userComment_commentFooter}>
              <li className={styles.userComment_commentLikes}>좋아요 [개수] </li>
              <li className={styles.userComment_commentCmt}>댓글 [개수] </li>
            </ul>
          </ul>
            
        </div>


    </div>

    );

}

export default UserComment;