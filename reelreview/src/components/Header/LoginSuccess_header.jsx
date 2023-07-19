import React from "react";
import { Link } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import styles from '../../css/Header/LoginSuccess_header.module.css';

export default function LoginSuccess_header() {

    return (
        <nav className={styles.topNav}>
            <div className={styles.navWrapper}>
                <ul className={styles.leftNav}>
                    <Link to="/mainpage"><li className={styles.logoSection} />
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
                        <li><GoPerson className={styles.icon}/></li>
                    </Link>
                </ul>
            </div>
        </nav>

    );
}