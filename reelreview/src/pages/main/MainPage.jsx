import React from 'react'
import styles from '../../css/main/Mainpage.module.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BoxOffice from "../../components/Main_Body/BoxOffice";
<<<<<<< Updated upstream
import Upcomming from "../../components/Main_Body/Upcomming";
import { boxofficeList } from '../../api/Movies/BoxOffice';
import styles from '../../css/main/BoxOffice.module.css';
=======
import Upcomming from "../../components/Main_Body/Upcomming"
import ActorMovie from '../../components/Main_Body/ActorMovie';
import DirectorMovie from '../../components/Main_Body/DirectorMovie';
import Genre from '../../components/Main_Body/Genre';
>>>>>>> Stashed changes

export default function MainPage() {

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
            <DirectorMovie />
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