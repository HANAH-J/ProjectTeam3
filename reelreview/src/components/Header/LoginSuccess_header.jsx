import React from "react";
import { Link } from "react-router-dom";
import userPFP from '../../img/profile/userProfile/empty_user.svg';
import styles from '../../css/Header/LoginSuccess_header.module.css';

export default function LoginSuccess_header({ profileData, userData }) {
    const userCd = userData ? userData.userCd : null;
    
    return (
      <nav className={styles.topNav}>
        <div className={styles.navWrapper}>
          <ul className={styles.leftNav}>
            <Link to="/mainpage">
              <li className={styles.logoSection} />
            </Link>
          </ul>
          <ul className={styles.rightNav}>
            <li className={styles.findMovies}>
              <div className={styles.findWrapper}>
                <input type="search" name="search" placeholder="영화를 검색해보세요." />
              </div>
            </li>
            <Link to="/csMain" className={styles.csMainPage} style={{ textDecoration: 'none' }}>
              <li className={styles.nameLi}> 문의하기 </li>
            </Link>
            <Link to="/userProfiles" className={styles.userProfile_box}>
              <li>
                {profileData && profileData.pfImage !== 'defaultPfImage' ? (
                  <img alt="profile" src={`http://localhost:8085/userProfiles/getProfilePicture?userCd=${userCd}`} className={styles.icon} />
                ) : (
                  <img alt="profile" src={userPFP} className={styles.icon} />
                )}
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }