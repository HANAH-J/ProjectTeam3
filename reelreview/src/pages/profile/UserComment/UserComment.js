import React, { useState, useEffect }  from "react";
import styles from '../../../css/profile/UserComment.module.css';
import LoginSuccess_header from "../../../components/Header/LoginSuccess_header";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCookies } from 'react-cookie';
import userPFP from '../../../img/profile/userProfile/empty_user.svg';

function UserComment() {
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [ratings, setRatings] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userCd, setUserCd] = useState(null);
  //const [currentMovieRate, setCurrentMovieRate] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const goToMovie = (movieDetails) => {
    console.log(movieDetails);
    navigate('/details',{state:{"item":movieDetails}})
  };

  useEffect(() => {
    const token = cookies.token;

    if (token) {
      setLoggedIn(true);
      fetchUserData(token); 
      console.log(token);
      
    } else {
      setLoggedIn(false);
      console.log('not logged in');
      console.log('token' + token);
      //alert('로그인을 해주세요.'); 
      //navigate('/'); // 토큰이 없을 경우 메인으로 리디렉션
    }
  }, [cookies.token]);

  const fetchUserData = (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
    };

    axios.get('http://localhost:8085/userComment', config)
      .then(response => {
        const responseData = response.data;
        const userDTO = {
          userCd: responseData.userDTO.userCd,
          username: responseData.userDTO.username,
        };

        const profileDTO = {
              pfImage: responseData.profileDTO.pfImage
        };

        const comments = responseData.comments;
        const movieDetails = responseData.movieDetailsList;
        const ratings = responseData.ratings;

        setUserData(userDTO);
        setProfileData(profileDTO);
        setUserCd(responseData.userDTO.userCd);
        setComments(comments);
        setMovieDetails(movieDetails);
        setRatings(ratings);

        // comments.map((comments, index) => {
        //   const currentMovieId = movieDetails[index].movieId;
        //   const matchingRating = ratings.find((ratings) => ratings.movieId === currentMovieId );
        //   const rate = matchingRating ? matchingRating.rate : 0;
        //   setCurrentMovieRate(rate);
        // })

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      console.log(comments);
      console.log(comments.cCommentcount);
  }


    
  


    
    return(

      <div className={styles.userComment}>
        <LoginSuccess_header profileData={profileData} userData={userData} />
        <div className={styles.userComment_PageHeader}>
          <Link to="/userProfiles"><div className={styles.userComment_Header_Arrow}></div></Link>
          <div className={styles.userComment_Title}> <h2> {userData.username} 님의 코멘트</h2> </div>
        </div>

        {comments.length === 0 ? (
          <div className={styles.userScoreCollection_noContent}>
            <p style={{ textAlign:'center', marginTop:'50px' }}>남긴 코멘트가 없어요.</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div className={styles.userComment_container}>
              <ul className={styles.userComment_movie}>
                <ul className={styles.userComment_movieHeader}>
                  <li>
                  {profileData.pfImage === 'defaultPfImage' ? (
                          <img alt="profile" src={userPFP} className={styles.userComment_movieHeader_PFP}/>
                        ) : (
                          <img alt="profile" className={styles.userComment_movieHeader_PFP} src={`http://localhost:8085/userProfiles/getProfilePicture?userCd=${userCd}`} />
                  )}
                  </li>
                  <li className={styles.userComment_movieHeader_name}> {userData.username} </li>
                  {/* <li className={styles.userComment_movieHeader_rating}>★  </li> */}
                </ul>
                <ul className={styles.userComment_movieFooter}>
                    <li>
                      <img
                        className={styles.userComment_moviePoster}
                        src={IMG_BASE_URL + movieDetails[index].poster_path}
                        alt='Movie Poster'
                        onClick={() => goToMovie(movieDetails[index])}
                        />
                    </li>
                  <ul className={styles.userComment_commentContainer}>
                      <li className={styles.userComment_movieTitle} onClick={() => goToMovie(movieDetails[index])}> {movieDetails[index].title} </li>
                      <li className={styles.userComment_commentContent}>
                        {comment.commentContent}
                      </li>
                  </ul>
                </ul>
                <ul className={styles.userComment_commentFooter}>
                  <li className={styles.userComment_commentLikes}>좋아요 {comment.commentGood} </li>
                  <li className={styles.userComment_commentCmt}>댓글 {comment.cCommentcount} </li>
                  <li className={styles.userComment_commentCmt}>작성 날짜 {comment.commentDate} </li>
                </ul>
              </ul>
            
        </div>
          ))
        )}

        {/* <div className={styles.userComment_container}>
          <ul className={styles.userComment_movie}>
            <ul className={styles.userComment_movieHeader}>
              <li>
                <img
                  className={styles.userComment_movieHeader_PFP}
                  src={img}
                  alt='User PFP'
                  />
              </li>
              <li className={styles.userComment_movieHeader_name}> {userData.username} </li>
              <li className={styles.userComment_movieHeader_rating}>★ </li>
            </ul>
            <ul className={styles.userComment_movieFooter}>
                <li>
                  <img
                    className={styles.userComment_moviePoster}
                    src={IMG_BASE_URL + movieDetails[index].poster_path}
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
            
        </div> */}
{/* 
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
            
        </div> */}


    </div>

    );

}

export default UserComment;