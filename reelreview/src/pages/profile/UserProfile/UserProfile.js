import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../../css/profile/UserProfile2.css";
import PFPModal from "../Modal/PFPModal";
import img from '../../../img/profile/userProfile/empty_user.svg';
import img2 from "../../../img/profile/userProfile/rate.svg";

function UserProfile() {

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

    <div className="UserProfile">
        <div className="profileContainer">

            <div className="profileBg">
                <div className="profileShadow" />
            </div>
            
            <div className="userInfo">
                <button className="profilePic" onClick={openPFPModal}> 
                    <img alt="profile" src= {img}/>
                </button>
                <ul>
                    <li>
                        <h2 className="name">NAME</h2>
                    </li>
                    <li>
                        <div className="msg">프로필이 없습니다.</div>
                    </li>
                </ul>

                    <div className="movieListText">
                        <div className="topHR"> <hr /> </div>
                        <h4>
                        <img alt="" src= {img2}/>
                        [NAME]님이 평가한 영화
                        </h4>
                        <div className="bottomHR"> <hr /> </div>
                    </div>

                <div className="movieList">
                    {/* <h3>영화 리스트 출력</h3> */}
                    <Carousel responsive={responsive}>
                        <div className="card"> 
                            <img className="movieListPoster" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h5> [영화제목] </h5>
                            <h6> 평가함 ★ [점수] </h6>
                        </div>
                        <div className="card"> 
                            <img className="movieListPoster" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h5> [영화제목] </h5>
                            <h6> 평가함 ★ [점수] </h6>
                        </div>
                        <div className="card"> 
                            <img className="movieListPoster" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h5> [영화제목] </h5>
                            <h6> 평가함 ★ [점수] </h6>
                        </div>
                        <div className="card"> 
                            <img className="movieListPoster" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h5> [영화제목] </h5>
                            <h6> 평가함 ★ [점수] </h6>
                        </div>
                        <div className="card"> 
                            <img className="movieListPoster" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" alt="Movie" />
                            <h5> [영화제목] </h5>
                            <h6> 평가함 ★ [점수] </h6>
                        </div>
                    </Carousel>
                    <div className="movieListMore" onClick={userScoreCollection}> 
                        <p>더보기</p>
                    </div>
                </div>

                <div className="movieToWatch" onClick={userMovieToWatch}>
                        <div className="topHR"> <hr /> </div>
                        <h4>
                        보고싶어요
                        </h4>
                        <div className="bottomHR"> <hr /> </div>
                </div>

                <div className="movieCollection" onClick={movieCollection}>
                        <h4>
                        [NAME]님의 컬렉션
                        </h4>
                        <div className="bottomHR"> <hr /> </div>
                </div>

           </div>
        </div>

        {openModal === true ? <PFPModal setOpenModal={setOpenModal} /> : null}

  </div>
);

}

export default UserProfile;