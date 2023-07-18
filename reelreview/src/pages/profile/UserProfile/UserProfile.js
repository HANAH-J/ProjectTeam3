import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '../../../css/profile/UserProfile.module.css'
import PFPModal from "../Modal/PFPModal";
import Header from "../../../components/Header/Header";
import LoginSuccess_header from "../../../components/Header/LoginSuccess_header";
import Footer from "../../../components/Footer/Footer";
import userPFP from '../../../img/profile/userProfile/empty_user.svg';
import userPFPHover from '../../../img/profile/userProfile/userGear2.png'
import rateImg from "../../../img/profile/userProfile/rate.svg";
import { useUserStore } from "../../../stores/index.ts";
import axios from "axios";
import { useCookies } from 'react-cookie';



function UserProfile() {
    //유저 고유번호 userCd
    //유저 이름 name
    //유저 이메일 email
    //유저 비밀번호 password
    //유저 배경사진 bg_image
    //유저 프로필사진 pf_image
    //유저 상태메시지 status

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const responsive = {    //캐러셀 반응형 코드
        superLargeDesktop: {breakpoint: { max: 4000, min: 3000 }, items: 5},
        desktop: {breakpoint: { max: 3000, min: 1024 }, items: 3},
        tablet: {breakpoint: { max: 1024, min: 464 }, items: 2},
        mobile: {breakpoint: { max: 464, min: 0 },items: 1}
      };

      const openPFPModal = () => {
          setOpenModal(true);
      }

      const userScoreCollection = () => {
        /* if(userObj !== null) */
        navigate('/UserScoreCollection');
      }

      const userMovieToWatch = () => {
        navigate('/MovieToWatch');
      }

      const movieCollection = () => {
        navigate('/MovieCollection');
      }

      const goToMovie = (e) => {
        console.log('goToMovies');
      }

      const userComment = () => {
        navigate('/userComment');
      }

      const { user, removeUser } = useUserStore();


      const [userData, setUserData] = useState({});
      const [profileData, setProfileData] = useState({});
      
      const [cookies, setCookie, removeCookie] = useCookies(['token']);


      useEffect(() => {

        console.log('useEffect is running')
        const token = cookies.token;
        console.log(token);

        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    withCredentials: true,
                },
                
            };

            axios.get('http://localhost:8085/userProfiles', config)
            .then(response => {
                const userDTO = {
                    userCd: response.data.userCd,
                    username: response.data.username,
                    userEmail: response.data.userEmail,
                    userPassword: response.data.userPassword,
                    role: response.data.role,
                    provider: response.data.provider,
                    providerCd: response.data.providerCd,
                    createDate: response.data.createDate
                };
                // const profileDTO = {
                //     profileDetailNum: response.data.profileDetailNum,
                //     userCd: response.data.userCd,
                //     status: response.data.status,
                //     bgImage: response.data.bgImage,
                //     pfImage: response.data.pfImage
                // };
                setUserData(userDTO);
                //setProfileData(profileDTO);
            })
            .catch(error => {
                console.error('Error fetcihng data:', error);
            });
        }
    }, [cookies.token]);


      

    return (


    <div className={styles.UserProfile}>
        {user ? (<LoginSuccess_header/>) : (<Header/>)}
        <div className={styles.profileContainer}>

            <div className={styles.profileBg}>
                <div className={styles.profileShadow} />
            </div>
            
            <div className={styles.userInfo}>
                <button className={styles.profilePic} onClick={openPFPModal}> 
                    <img alt="profile" src={userPFP} />
                    <img alt="profile" src={userPFPHover} className={styles.profilePicHover} />
                </button>
                <ul>
                    <li>
                        <h2 className={styles.name}> NAME : {userData.username} </h2>
                    </li>
                    <li>
                        <div className={styles.msg}> status </div>
                    </li>
                </ul>

                    <div className={styles.movieListText}>
                        <div className={styles.topHR}> <hr className={styles.userProfile_HR} /> </div>
                        <h4>
                        <img alt="" src= {rateImg}/>
                        [NAME]님이 평가한 영화 (n개)
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
                        [NAME]님의 컬렉션
                        </h4>
                        <div className={styles.bottomHR}> <hr className={styles.userProfile_HR}/> </div>
                </div>

                <div className={styles.userComment} onClick={userComment}>
                        <h4>코멘트</h4>
                </div>

           </div>
        </div>

        {openModal === true ? <PFPModal setOpenModal={setOpenModal} removeUser={removeUser}/> : null}
        
        <div className={styles.PFPFooter}>
            <Footer/>
        </div>
        
  </div>
);

}

export default UserProfile;