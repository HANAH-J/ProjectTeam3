import "../../css/details/Detail.css";


function Detail() {
    return(
        <div>
           <div id="nav"></div>
            <div id="detail_first">
                <div id="detail_movie_back">
                    
                    <div id="detail_movie_top">
                        <h1>엘리멘탈</h1>
                        <div id="detail_movie_top_inEn">
                            Elemental
                        </div>
                        <div id="openDate_genre_country">
                            <div id="openDate">2023</div>
                            <div id="genre">애니메이션/모험/판타지/SF/로맨스</div> 
                            <div id="country">미국</div> 
                        </div>
                        <div id="playTime_ageRating">
                            <div id="playTime">1시간 33분</div>
                            <div id="ageRating">전체</div> 
                        </div>
                        <div id="boxOfficeData">
                            <div id="timeSinceOpen">박스오피스 정보</div>
                            <div id="totalAudience">박스오피스 정보</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="detail_second">
                <div id="divForSubImg">
                    이미지들어가유
                </div>
                <div id="divForSecondTop">
                    <div id="divForStarRating">

                    </div>
                    <p>평가하기</p>
                    <div id="divForWTSComment">
                        <div id="Wts"></div>
                        <div id="Comment"></div>
                        <div id="more"></div>
                    </div>
                </div>
                <div id="divForMovieDetails">
                    <p>쏼랴쏼라쏼라쏼라</p>
                </div>
                <div id="divForSecondBottom">

                </div>
            </div>
        </div>
    )
}



export default Detail;