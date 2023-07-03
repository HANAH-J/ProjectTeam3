import React from 'react';
import styles from '../../../css/profile/MovieToWatch.module.css'
import Header from "../../../components/Header/Header";
import { Link } from 'react-router-dom';

function MovieToWatch() {
  console.log('보고싶어요');
  
  return (
    <div className={styles.movieToWatch_Wrapper}>
      <Header/>
      <div className={styles.movieToWatch_Header}>
        <Link to="../UserProfile"><div className={styles.movieToWatch_Header_Arrow}></div></Link>
        <div className={styles.movieToWatch_Wrapper_Title}> <h2>보고싶어요</h2> </div>
      </div>
    
      <div className={styles.movieToWatch_List}>
        {/* {this.state.movies.map((el) => { state movie map 가지고 와서 배열 길이에 따른 동적 요소 생성 
                return ( */}

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  <ul className={styles.movieToWatch_MovieList}>   {/* key={el.title} */}
                    <li> {/* onClick={() => this.goToContens(el.film_id)} */}
                      <img className={styles.movieToWatch_MoviePoster} alt="movie" src="https://img.cgv.co.kr/Movie/Thumbnail/Poster/000086/86305/86305_1000.jpg" /> {/* src={el.poster_url} 넣어주기 */}
                      <h4 className={styles.movieToWatch_MovieTitle}> Title </h4> {/* {el.title} 들어가야함 */}
                      <h5 className={styles.movieToWatch_Rating}>평균 ★ </h5> {/* {el.rating} 들어가야함 */}
                    </li>
                  </ul>

                  
                  {/* 담긴 작품이 없을 때 */}

{/* 
                  <div className={styles.movieToWatch_noContent}>
                    <span className={styles.movieToWatch_noContent_image}></span>
                    <div className={styles.movieToWatch_noContent_text}> 담긴 작품이 없어요. </div>
                  </div>
*/}


        {/*
                 );
        })} 
        */}
      </div>
        
    </div>
  );
}

export default MovieToWatch;