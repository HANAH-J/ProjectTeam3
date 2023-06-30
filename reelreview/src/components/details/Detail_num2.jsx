import styles from '../../css/details/Detail_num2.module.css';




function Detail_num2() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.smallSizeWrapper}>
                <div className={styles.top}>
                    <div className={styles.topLeftImg}></div>
                    <div className={styles.topRightData}>
                        <div className={styles.topRightData_top}>
                            <div className={styles.topRightData_top_left}>
                                <div className={styles.topRightData_top_left_stars}></div>
                                평가하기 별
                            </div>
                            <div className={styles.topRightData_top_middle}>평균 별점 3.9</div>
                            <div className={styles.topRightData_top_right}>
                                <div className={styles.topRightData_top_right_wantToSee}>보고싶어요</div>
                                <div className={styles.topRightData_top_right_comment}>커멘트</div>
                                <div className={styles.topRightData_top_right_watching}>보는중</div>
                                <div className={styles.topRightData_top_right_more}>더보기</div>
                            </div>
                        </div>
                        <div className={styles.topRightData_bottom}> 
                            <p>
                            디즈니·픽사의 놀라운 상상력! 
                            올여름, 세상이 살아 숨 쉰다 

                            불, 물, 공기, 흙 4개의 원소들이 살고 있는 ‘엘리멘트 시티’. 재치 있고 불처럼 열정 넘치는 ‘앰버'는 어느 날 우연히 유쾌하고 감성적이며 물 흐르듯 사는 '웨이드'를 만나 특별한 우정을 쌓으며, 지금껏 믿어온 모든 것들이 흔들리는 새로운 경험을 하게 되는데...

                            제 76회 칸 영화제 폐막작 선정!
                            
                            6월 14일 극장 대개봉,
                            웰컴 투 ‘엘리멘트 시티’!
                            
                            </p>
                        </div>
                    </div>

                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottom_left}>
                        <div className={styles.bottom_left_top}></div>
                        <div className={styles.bottom_left_bottom}></div>
                    </div>
                    <div className={styles.bottom_right}></div>
                </div>
            </div>
        </div>
    );
}

export default Detail_num2;