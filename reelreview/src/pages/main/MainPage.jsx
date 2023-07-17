import React, { useState } from 'react'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BoxOffice from "../../components/Main_Body/BoxOffice";
import Upcomming from "../../components/Main_Body/Upcomming"
import ActorMovie from '../../components/Main_Body/ActorMovie';
import DirectorMovie from '../../components/Main_Body/DirectorMovie';
import Genre from '../../components/Main_Body/Genre';
import styles from '../../css/main/Mainpage.module.css';
import axios from 'axios';


export default function MainPage() {
  const [movieList, setMovieList] = useState([]); // 초기 상태값은 빈 배열로 설정합니다.
  const [name, setName] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 서버로 보낼 데이터 준비
    const formData = new FormData();
    formData.append('name', name);

    // 데이터 전송
    axios.post("http://localhost:8085/api/directorSearch", formData)
      .then((response) => {
        // 요청에 대한 성공 처리
        console.log(response.data);
        setMovieList(response.data);
        // 받은 데이터에 대한 추가 처리
      })
      .catch((error) => {
        // 요청에 대한 실패 처리
        console.error(error);
      });
  };


  return (

    <div className={styles.MainPage_box}>
      <Header />
      <div className={styles.BoxOffice_box_wrapper}>
        <div className={styles.BoxOffice_box}>
          <div className={styles.BoxOffice_box_header}>
            <h3>박스오피스 순위</h3>
          </div>
          <div className={styles.BoxOffice_box_info}>
            <BoxOffice />
          </div>
        </div>
      </div>
      <div className={styles.Upcomming_box_wrapper}>
        <div className={styles.Upcomming_box}>
          <div className={styles.Upcomming_box_header}>
            <h3>개봉예정작</h3>
          </div>
          <div className={styles.Upcomming_box_info}>
            <Upcomming />
          </div>
        </div>
      </div>
      <div className={styles.DirectorMovie_box_wrapper}>
        <div className={styles.DirectorMovie_box}>
          <div className={styles.DirectorMovie_box_header}>
            <h3>이상용 감독 모음</h3>
          </div>
          <div className={styles.DirectorMovie_box_info}>
            <form onSubmit={handleSubmit}>
              <input type="text" name='name' onChange={handleChange} />
              <button type='submit'>감독</button>
            </form>
            <DirectorMovie movieList={movieList}/>
          </div>
        </div>
      </div>
      <div className={styles.ActorMovie_box_wrapper}>
        <div className={styles.ActorMovie_box}>
          <div className={styles.ActorMovie_box_header}>
            <h3>Margot Robbie 모음</h3>
          </div>
          <div className={styles.ActorMovie_box_info}>
            <ActorMovie />
          </div>
        </div>
      </div>
      <div className={styles.Genre_box_wrapper}>
        <div className={styles.Genre_box}>
          <div className={styles.Genre_box_header}>
            <h3>요즘 핫한 애니메이션</h3>
          </div>
          <div className={styles.Genre_box_info}>
            <Genre />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}