import React from 'react'
import { useLocation } from 'react-router-dom';
import LoginSuccess_header from '../../components/Header/LoginSuccess_header'
import Footer from '../../components/Footer/Footer'
import styles from '../../css/main/Mainpage.module.css'
import DirectorMovie from '../../components/Main_Body/DirectorMovie';

export default function SearchSuccess() {

  const location = useLocation();
  const movieList = location.state ? location.state.movieList : [];
  const searchedName = location.state ? location.state.searchedName : "";

    return (
        <div className={styles.SearchSuccess_wrapper}>
            <div>
                <LoginSuccess_header />
            </div>
            <div className={styles.SearchSuccess_result_boxing}>
                <div className={styles.SearchSuccess_result}>
                    <h3>"{searchedName}" 의 검색결과</h3>
                </div>
            </div>
            <div className={styles.SearchSuccess_result_box}>
                <DirectorMovie movieList={movieList}/>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}