import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '../../../css/profile/UserProfile.module.css'
import PFPModal from "../Modal/PFPModal";
import LoginSuccess_header from "../../../components/Header/LoginSuccess_header";
import Footer from "../../../components/Footer/Footer";
import userPFP from '../../../img/profile/userProfile/empty_user.svg';
import userPFPHover from '../../../img/profile/userProfile/userGear2.png'
import rateImg from "../../../img/profile/userProfile/rate.svg";
import { useUserStore } from "../../../stores/index.ts";
import axios from "axios";
import { useCookies } from 'react-cookie';
import base64 from 'base-64';


function UserProfile() {

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const responsive = {    //캐러셀 반응형 코드
        superLargeDesktop: {breakpoint: { max: 4000, min: 3000 }, items: 5},
        desktop: {breakpoint: { max: 3000, min: 1024 }, items: 3},
        tablet: {breakpoint: { max: 1024, min: 464 }, items: 2},
        mobile: {breakpoint: { max: 464, min: 0 },items: 1}
      };

      const openPFPModal = () => { setOpenModal(true); }
      const userScoreCollection = () => { navigate('/UserScoreCollection'); }
      const userMovieToWatch = () => { navigate('/MovieToWatch'); }
      const movieCollection = () => { navigate('/MovieCollection'); }
      const goToMovie = (e) => { console.log('goToMovies'); }
      const userComment = () => { navigate('/userComment'); }

      const { user, removeUser } = useUserStore();
      const [loggedIn, setLoggedIn] = useState(false);

      const [userData, setUserData] = useState({});
      const [profileData, setProfileData] = useState({});
      const [userCd, setUserCd] = useState(null);
      const [profileImage, setProfileImage] = useState(null);
      
      const [cookies, setCookie, removeCookie] = useCookies(['token']);

      useEffect(() => {
        // 여기에서 사용자의 로그인 상태를 확인하는 로직을 구현한다.
        // 예를 들어, 로그인된 사용자 정보가 존재하는지, 토큰이 유효한지 등을 확인
        const token = cookies.token;
    
        if (token) {
          setLoggedIn(true);
          fetchUserData(token); // 토큰이 유효하다면 사용자 데이터를 가져오는 함수 호출
          console.log(token);
        } else {
          setLoggedIn(false);
        }
      }, [cookies.token]);
    
      const fetchUserData = (token) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        };
    
        axios.get('http://localhost:8085/userProfiles', config)
          .then(response => {

            const responseData = response.data;
            setUserCd(responseData.userDTO.userCd); //userCd값 설정 -> Modal에서 사용
            setProfileImage(responseData.profileDTO.pfImage);

            const userDTO = {
              userCd: responseData.userDTO.userCd,
              username: responseData.userDTO.username,
              userEmail: responseData.userDTO.userEmail,
              role: responseData.userDTO.role,
              //provider: responseData.userDTO.provider,
              //providerCd: responseData.userDTO.providerCd,
              //createDate: responseData.userDTO.createDate
            };

            const profileDTO = {
              status: responseData.profileDTO.status,
              bgImage: responseData.profileDTO.bgImage,
              pfImage: responseData.profileDTO.pfImage
            };

            setUserData(userDTO);
            setProfileData(profileDTO);
            console.log(userDTO.username + ' is logged in');
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }


      

    return (

    <div className={styles.UserProfile}>
        <LoginSuccess_header profileData={profileData} userData={userData} />
        <div className={styles.profileContainer}>

            {profileData.bgImage === 'defaultBgImage' ? (
              <div className={styles.profileBg}>
                <div className={styles.profileShadow} />
              </div>
            ) : (
              <div className={styles.profileBg} 
              style={{ backgroundImage: `url(http://localhost:8085/userProfiles/getBackgroundImage?userCd=${userCd})`,
                       backgroundSize: '100%',
                       backgroundRepeat: 'no-repeat' }}>
                <div className={styles.profileShadow} />
              </div>
            )}
            
            <div className={styles.userInfo}>
                <button className={styles.profilePic} onClick={openPFPModal}> 

                    {profileData.pfImage === 'defaultPfImage' ? (
                      <img alt="profile" src={userPFP} />
                    ) : (
                      <img alt="profile" src={`http://localhost:8085/userProfiles/getProfilePicture?userCd=${userCd}`} />
                    )}
                    <img alt="profile" src={userPFPHover} className={styles.profilePicHover} />

                </button>
                <ul>
                    <li>
                        <h2 className={styles.name}> {userData.username} </h2>
                    </li> 
                    <li>
                        <div className={styles.msg}> {profileData.status} </div>
                    </li>
                </ul>

                    <div className={styles.movieListText}>
                        <div className={styles.topHR}> <hr className={styles.userProfile_HR} /> </div>
                        <h4>
                        <img alt="" src= {rateImg}/>
                        {userData.username} 님이 평가한 영화
                        </h4>
                        <div className={styles.bottomHR}> <hr className={styles.userProfile_HR}/> </div>
                    </div>

                <div className={styles.movieList}>
                    <Carousel responsive={responsive}>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" onClick={goToMovie}/>
                            <h4 onClick={goToMovie} className={styles.movieListTitle}> [엄~~~~~~청나게긴영화제목] </h4>
                            <h5 onClick={goToMovie}> 평가함 ★ [점수] </h5>
                        </div>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" onClick={goToMovie}/>
                            <h4 onClick={goToMovie} className={styles.movieListTitle}> [영화제목] </h4>
                            <h5 onClick={goToMovie}> 평가함 ★ [점수] </h5>
                        </div>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" onClick={goToMovie}/>
                            <h4 onClick={goToMovie} className={styles.movieListTitle}> [영화제목] </h4>
                            <h5 onClick={goToMovie}> 평가함 ★ [점수] </h5>
                        </div>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" onClick={goToMovie}/>
                            <h4 onClick={goToMovie} className={styles.movieListTitle}> [영화제목] </h4>
                            <h5 onClick={goToMovie}> 평가함 ★ [점수] </h5>
                        </div>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" onClick={goToMovie}/>
                            <h4 onClick={goToMovie} className={styles.movieListTitle}> [영화제목] </h4>
                            <h5 onClick={goToMovie}> 평가함 ★ [점수] </h5>
                        </div>
                    </Carousel>
                    <div className={styles.movieListMore} onClick={userScoreCollection}> 
                        <p>더보기</p>
                    </div>
                </div>

                <div className={styles.movieToWatch} onClick={userMovieToWatch}>
                        <div className={styles.topHR}> <hr className={styles.userProfile_HR}/> </div>
                        <h4>
                        보고싶어요
                        </h4>
                        <div className={styles.bottomHR}> <hr className={styles.userProfile_HR}/> </div>
                </div>

                <div className={styles.movieCollection} onClick={movieCollection}>
                        <h4>
                        {userData.username} 님의 컬렉션
                        </h4>
                        <div className={styles.bottomHR}> <hr className={styles.userProfile_HR}/> </div>
                </div>

                <div className={styles.userComment} onClick={userComment}>
                        <h4>코멘트</h4>
                </div>

           </div>
        </div>

        {openModal === true ? <PFPModal setOpenModal={setOpenModal} userCd={userCd} removeUser={removeUser}/> : null}
        
        <div className={styles.PFPFooter}>
            <Footer/>
        </div>
        
  </div>
);

}

export default UserProfile;