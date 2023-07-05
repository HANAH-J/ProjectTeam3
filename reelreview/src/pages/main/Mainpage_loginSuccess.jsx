import React from 'react'
import LoginSuccess_header from "../../components/Header/LoginSuccess_header";
import Footer from "../../components/Footer/Footer";
import styles from '../../css/main/Mainpage.module.css';


export default function MainPage() {

  return (

    <div className={styles.MainPage_box}>
      <LoginSuccess_header />
      <h1>로그인성공 페이지</h1>
      <div className={styles.boxoffice_box}>

      </div>
      <Footer />
    </div>
  )
}