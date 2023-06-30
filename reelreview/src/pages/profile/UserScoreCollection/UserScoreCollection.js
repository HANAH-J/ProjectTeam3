import React from 'react';
import "../../../css/profile/UserScoreCollection.css";

function UserScoreCollection() {
  console.log('유저 스코어 컬렉션');
  
  return (
    <div className="userScoreCollection_Wrapper">
      <div className="userScoreCollection_Header">
        <div className="userScoreCollection_Header_Arrow">ARROW</div>
      </div>
      <div className="userScoreCollection_Wrapper_Title">
        <h2>평가한 작품들</h2>
      </div>
      <div className="userScoreCollection_List">
        {/* {this.state.movies.map((el) => { state movie map 가지고 와서 배열 길이에 따른 동적 요소 생성 
                return ( */}
                  <ul className="userScoreCollection_MovieList">   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className="userScoreCollection_MoviePoster" alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className="userScoreCollection_MovieTitle"> Title </h4> {/* {el.title} 들어가야함 */}
                      <h6 className="userScoreCollection_Rating">평가함 ★ </h6> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className="userScoreCollection_MovieList">   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className="userScoreCollection_MoviePoster" alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className="userScoreCollection_MovieTitle"> Title </h4> {/* {el.title} 들어가야함 */}
                      <h6 className="userScoreCollection_Rating">평가함 ★ </h6> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  
                  <ul className="userScoreCollection_MovieList">   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className="userScoreCollection_MoviePoster" alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className="userScoreCollection_MovieTitle"> Title </h4> {/* {el.title} 들어가야함 */}
                      <h6 className="userScoreCollection_Rating">평가함 ★ </h6> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
        {/*
                 );
        })} 
        */}
      </div>
        
    </div>
  );
}

export default UserScoreCollection;