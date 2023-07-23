import styles from '../../css/details/Detail_num2.module.css';
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import poster from '../../img/Detail/poster.jpg'
import Charts from './smallComponents/charts';
import { AiOutlinePlus,AiFillEye,AiOutlineLine } from "react-icons/ai";
import { BiSolidPencil,BiDotsHorizontalRounded } from "react-icons/bi";
import axios from 'axios';
import { useCookies } from 'react-cookie';
const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/";

function Detailnum2(props){
    const [rate, setRating] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [loggedIn, setLoggedIn] = useState(false);
    const movie = props.item;
    const [wantTo , setWantTo] = useState(false);
    const [hovered, setHovered] = useState(false);
    useEffect(()=>{
        //유저데이터에 rating 이랑 wanttosee랑 comment가 필요
    });

    // 보고싶어요 클릭시 서버로 보고싶어요 데이터 보내서 정보저장
    const wantToSee = (wantTo) => () => {
        setWantTo(true); //유저데이터에 데이터가 넘어오면 필요없는 라인
        const token = cookies.token;
        setRating(rate);
        console.log(wantTo);
        if (token) {
            if(wantTo){
                const config = {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      withCredentials: true,
                    },
                  };
                setLoggedIn(true);
                const data = new URLSearchParams();
                data.append('movieId', movie.movieId);
                axios.post("http://localhost:8085/details/wantToSee", data,config)
                    .then((response) => {
                        console.log(response.data);
                        setWantTo(true);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
            }else{
                const config = {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      withCredentials: true,
                    },
                  };
                setLoggedIn(true);
                const data = new URLSearchParams();
                data.append('movieId', movie.movieId);
                axios.post("http://localhost:8085/details/wantToSeeOut", data,config)
                    .then((response) => {
                        console.log(response.data);
                        setWantTo(false);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
            }
            
        } else {
            setLoggedIn(false);
            console.log('not logged in');
            console.log('token' + token);
            alert('로그인을 해주세요.');
            // 로그인 콘솔 띄우기
        }
    }





    //레이팅 클릭시 서버로 데이터 보내서 정보 저장
    const handleRating = (rate) => {
        const token = cookies.token;
        setRating(rate);
        if (token) {
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                  withCredentials: true,
                },
              };
            setLoggedIn(true);
            console.log(token);
            console.log(rate);
            const data = new URLSearchParams();
            // data.append('token', token);
            data.append('rate', rate);
            data.append('movieId', movie.movieId);
            // data.append('config',config)
            axios.post("http://localhost:8085/details/setRating", data,config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setLoggedIn(false);
            console.log('not logged in');
            console.log('token' + token);
            alert('로그인을 해주세요.');
            // 로그인 콘솔 띄우기
        }
    }
    const tooltipArray = ["0.5","1","1.5","2","2.5","3","3.5","4","4.5","5"];
    const onPointerMove = (value) => console.log(value, rate)
    // userCd

    //상세보기 영화 내용 요약본 글 줄맞춤
    const addLineBreaks = (text) => {
        const sentences = text.split('.');
        let result = [];
    
        sentences.forEach((sentence) => {
          const words = sentence.trim().split(/\s+/);
          let currentLine = "";
    
          words.forEach((word) => {
            if (currentLine.length + word.length + 1 <= 75) {
              currentLine += (currentLine.length > 0 ? " " : "") + word;
            } else {
              result.push(currentLine.trim());
              currentLine = word;
            }
          });
    
          if (currentLine !== "") {
            result.push(currentLine.trim());
          }
        });
    
        return result.map((sentence, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {index > 0 && <br />}
            {sentence}
          </React.Fragment>
        ));
      };

    return(
        
        <div className={styles.wrapper}>
            <div className={styles.smallSizeWrapper}>
                <div className={styles.leftSide}>
                    <div className={styles.leftTop}>
                        <div className={styles.image}>
                            <img src={IMG_BASE_URL+props.item.poster_path} alt="poster" />
                        </div>
                    </div>
                    <div className={styles.leftBottom}>
                        <div className={styles.leftBottomTypo}>
                            <p>별점 그래프</p>
                            <span>평균 ★{props.item.vote_average}</span><div className={styles.numPeople}>({props.item.vote_count}명)</div>
                        </div>
                        <div className={styles.leftBottom_chart}>
                            <Charts></Charts>
                        </div>
                        <div className={styles.leftBottom_chartNum}>
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>    
                            <p>4</p>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.rightData}>
                        <div className={styles.right_top}>
                            <div className={styles.right_top_left}>
                                <div className={styles.right_top_left_stars}>
                                    <div className={styles.rating_result}>
                                      <Rating onClick={handleRating} transition size={50} allowFraction tooltipArray={tooltipArray} onPointerMove={onPointerMove}/>
                                      
                                    </div>
                                </div>
                                <p>평가하기</p>
                            </div>
                            <div className={styles.right_top_middle}>
                                <div className={styles.right_top_middle_avg}>
                                    {props.item.vote_average}
                                </div>
                                <div className={styles.right_top_middle_avg_typo}>
                                    평균 별점 ({props.item.vote_count}명)
                                </div>
                                
                            </div>
                            <div className={styles.right_top_right}>
                                {wantTo?(
                                    <>
                                    <div
              className={`${styles.right_top_right_wantToSee} ${hovered ? styles.wantToSee_icon_hovered : ''}`}
              onClick={wantToSee(wantTo)}
              onMouseEnter={() => setHovered(true)} // 마우스가 컴포넌트에 진입 시 hovered 상태로 설정
              onMouseLeave={() => setHovered(false)} // 마우스가 컴포넌트에서 나갈 시 hovered 상태 해제
            >
                                    <div className={styles.wantToSee_icon}>
                                        <AiOutlineLine size={40} strokeWidth={20}/>
                                    </div>
                                    <p>보고싶어요</p>
                                </div>
                                    </>
                                ):(<>
                                    <div
              className={`${styles.right_top_right_wantToSee} ${hovered ? styles.wantToSee_icon_hovered : ''}`}
              onClick={wantToSee(wantTo)}
              onMouseEnter={() => setHovered(true)} // 마우스가 컴포넌트에 진입 시 hovered 상태로 설정
              onMouseLeave={() => setHovered(false)} // 마우스가 컴포넌트에서 나갈 시 hovered 상태 해제
            >
                                    <div className={styles.wantToSee_icon}>
                                        <AiOutlinePlus size={40} strokeWidth={20}/>
                                    </div>
                                    <p>보고싶어요</p>
                                </div>
                                   </>
                                )}
                                <div className={styles.right_top_right_comment}>
                                    <div className={styles.wantToSee_icon}>
                                        <BiSolidPencil size={40} strokeWidth={0}/>
                                    </div>
                                    <p>커멘트</p>
                                </div>
                                <div className={styles.right_top_right_watching}>
                                    <div className={styles.wantToSee_icon}>
                                        <AiFillEye size={40} />
                                    </div>
                                    <p>보는중</p>
                                </div>
                                <div className={styles.right_top_right_more}>
                                    <div className={styles.wantToSee_icon}>
                                        <BiDotsHorizontalRounded size={40}/>
                                    </div>
                                    <p>더보기</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.right_bottom}> 
                            <p>{addLineBreaks(props.item.overview)}</p>
                        </div>
                        <div className={styles.right_bottom_ad}></div>
                    </div>
                    </div>
                
            </div>
        </div>
    );
}

export default Detailnum2;