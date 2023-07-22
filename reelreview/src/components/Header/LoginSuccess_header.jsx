import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userPFP from '../../img/profile/userProfile/empty_user.svg';
import styles from '../../css/Header/LoginSuccess_header.module.css';
import axios from 'axios';

export default function LoginSuccess_header({ profileData, userData }) {
  const userCd = userData ? userData.userCd : null;

  const [movieList, setMovieList] = useState([]); 
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
  
    axios.post("http://localhost:8085/api/movieSearch", formData)
      .then((response) => {
        console.log(response.data);
        setMovieList(response.data);
        navigate('/searchSuccess', { state: { movieList: response.data, searchedName: name } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              <form onSubmit={handleSubmit}>
                <input type="text" name="title" onChange={handleChange} placeholder="영화를 검색해보세요." autoComplete="off" />
                <button type="submit"></button>
              </form>
            </div>
          </li>
          <Link to="/csMain" className={styles.csMainPage} style={{ textDecoration: 'none' }}>
            <li className={styles.nameLi}> 문의하기 </li>
          </Link>
          <Link to={{ pathname: '/userProfiles', search: `userCd=${userCd}` }} className={styles.userProfile_box}>
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