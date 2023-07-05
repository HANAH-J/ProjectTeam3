import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '../../../css/profile/UserProfile.module.css'
import PFPModal from "../Modal/PFPModal";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import img from '../../../img/profile/userProfile/empty_user.svg';
import img2 from "../../../img/profile/userProfile/rate.svg";


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

    const responsive = {    //캐러셀
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
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

    return (


    <div className={styles.UserProfile}>
        <Header/>
        <div className={styles.profileContainer}>

            <div className={styles.profileBg}>
                <div className={styles.profileShadow} />
            </div>
            
            <div className={styles.userInfo}>
                <button className={styles.profilePic} onClick={openPFPModal}> 
                    <img alt="profile" src= {img}/>
                </button>
                <ul>
                    <li>
                        <h2 className={styles.name}>NAME</h2>
                    </li>
                    <li>
                        <div className={styles.msg}>프로필이 없습니다.</div>
                    </li>
                </ul>

                    <div className={styles.movieListText}>
                        <div className={styles.topHR}> <hr /> </div>
                        <h4>
                        <img alt="" src= {img2}/>
                        [NAME]님이 평가한 영화
                        </h4>
                        <div className={styles.bottomHR}> <hr /> </div>
                    </div>

                <div className={styles.movieList}>
                    {/* <h3>영화 리스트 출력</h3> */}
                    <Carousel responsive={responsive}>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h4> [영화제목] </h4>
                            <h5> 평가함 ★ [점수] </h5>
                        </div>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h4> [영화제목] </h4>
                            <h5> 평가함 ★ [점수] </h5>
                        </div>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h4> [영화제목] </h4>
                            <h5> 평가함 ★ [점수] </h5>
                        </div>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h4> [영화제목] </h4>
                            <h5> 평가함 ★ [점수] </h5>
                        </div>
                        <div className={styles.card}> 
                            <img className={styles.movieListPoster} src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h4> [영화제목] </h4>
                            <h5> 평가함 ★ [점수] </h5>
                        </div>
                    </Carousel>
                    <div className={styles.movieListMore} onClick={userScoreCollection}> 
                        <p>더보기</p>
                    </div>
                </div>

                <div className={styles.movieToWatch} onClick={userMovieToWatch}>
                        <div className={styles.topHR}> <hr /> </div>
                        <h4>
                        보고싶어요
                        </h4>
                        <div className={styles.bottomHR}> <hr /> </div>
                </div>

                <div className={styles.movieCollection} onClick={movieCollection}>
                        <h4>
                        [NAME]님의 컬렉션
                        </h4>
                        <div className={styles.bottomHR}> <hr /> </div>
                </div>

           </div>
        </div>

        {openModal === true ? <PFPModal setOpenModal={setOpenModal} /> : null}
        
        <div className={styles.PFPFooter}>
            <Footer/>
        </div>
        
  </div>
);

}

export default UserProfile;