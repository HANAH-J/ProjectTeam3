import React from 'react'
import LoginSuccess_header from "../../components/Header/LoginSuccess_header";
import Footer from "../../components/Footer/Footer";
import BoxOffice from "../../components/Main_Body/BoxOffice";
import { boxofficeList } from '../../api/Movies/BoxOffice';
import styles from '../../css/main/BoxOffice.module.css';


export default function MainPage(){

    return(

        <div className={styles.MainPage_box}>
            <LoginSuccess_header/>
            <h1>로그인성공 페이지</h1>
            <div className={styles.boxoffice_box}>
                <div className={styles.boxoffice_box_header}>
                    <h3>박스오피스 순위</h3>
                </div>
                <div className={styles.boxoffice_box_2}>
                {boxofficeList.results.map((item) => {
          return (
            <BoxOffice
              movieCd={item.id}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
              release_date={item.release_date}
              popularity={item.popularity}
            />
          );
        })}
        </div>
        </div>
          <Footer/>
        </div>
    )
}