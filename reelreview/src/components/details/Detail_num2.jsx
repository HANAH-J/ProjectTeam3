import styles from '../../css/details/Detail_num2.module.css';
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import poster from '../../img/Detail/poster.jpg'
import Charts from './smallComponents/charts';
import { AiOutlinePlus,AiFillEye } from "react-icons/ai";
import { BiSolidPencil,BiDotsHorizontalRounded } from "react-icons/bi";


function Detailnum2(){
    const [, setRating] = useState(0);
    const handleRating = (rate) => setRating(rate);
    const tooltipArray = ["0.5","1","1.5","2","2.5","3","3.5","4","4.5","5"];
    const onPointerMove = (value, index) => console.log(value, index)
    
    

    return(
        
        <div className={styles.wrapper}>
            <div className={styles.smallSizeWrapper}>
                <div className={styles.left}>
                    <div className={styles.leftTop}>
                        <div className={styles.image}>
                            <img src={poster} alt="poster" />
                        </div>
                    </div>
                    <div className={styles.leftBottom}>
                        <div className={styles.leftBottomTypo}>
                            <p>별점 그래프</p>
                            <span>평균 ★3.9</span><div className={styles.numPeople}>(2만명)</div>
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
                <div className={styles.right}>
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
                                    3.9
                                </div>
                                <div className={styles.right_top_middle_avg_typo}>
                                    평균 별점 (2만명)
                                </div>
                                
                            </div>
                            <div className={styles.right_top_right}>
                                <div className={styles.right_top_right_wantToSee}>
                                    <div className={styles.wantToSee_icon}>
                                        <AiOutlinePlus size={40} strokeWidth={20}/>
                                    </div>
                                    <p>보고싶어요</p>
                                </div>
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
                            <p>
                            디즈니·픽사의 놀라운 상상력!<br/>
                            올여름, 세상이 살아 숨 쉰다<br/>
                            <br/>
                            불, 물, 공기, 흙 4개의 원소들이 살고 있는 ‘엘리멘트 시티’. 재치 있고 불처럼 열정 넘치는 ‘앰버'는 어느 날 우연히 유쾌하고 감성적이며 물 흐르듯 사는 '웨이드'를 만나 특별한 우정을 쌓으며, 지금껏 믿어온 모든 것들이 흔들리는 새로운 경험을 하게 되는데...
                            <br/><br/>
                            제 76회 칸 영화제 폐막작 선정!<br/>
                            <br/>
                            6월 14일 극장 대개봉,<br/>
                            웰컴 투 ‘엘리멘트 시티’!<br/>
                            </p>
                        </div>
                        <div className={styles.right_bottom_ad}></div>
                    </div>
                    </div>
                
            </div>
        </div>
    );
}

export default Detailnum2;