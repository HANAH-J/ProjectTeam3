import React from 'react';
import styles from '../../../css/profile/UserScoreCollection.module.css'
import Header from "../../../components/Header/Header";
import { Link } from 'react-router-dom';


function UserScoreCollection() {
  console.log('유저 스코어 컬렉션');

  
  return (
    <div className={styles.userScoreCollection_Wrapper}>
      <Header/>
      <div className={styles.userScoreCollection_Header}>
        <Link to="../UserProfile"><div className={styles.userScoreCollection_Header_Arrow}></div></Link>
        <div className={styles.userScoreCollection_Wrapper_Title}> <h2>평가한 작품들</h2> </div>
      </div>
    
      <div className={styles.userScoreCollection_List}>
        {/* {this.state.movies.map((el) => { state movie map 가지고 와서 배열 길이에 따른 동적 요소 생성 
                return ( */}
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
                  <ul className={styles.userScoreCollection_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.userScoreCollection_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.userScoreCollection_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.userScoreCollection_Rating}>평가함 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>
        {/*
                 );
        })} 
        */}


                          {/* 담긴 작품이 없을 때 */}

{/* 
                  <div className={styles.userScoreCollection_noContent}>
                    <span className={styles.userScoreCollection_noContent_image}></span>
                    <div className={styles.userScoreCollection_noContent_text}> 담긴 작품이 없어요. </div>
                  </div>
*/}



      </div>
        
    </div>
  );
}

export default UserScoreCollection;