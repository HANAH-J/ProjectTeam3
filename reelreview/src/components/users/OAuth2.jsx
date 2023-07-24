import React from 'react';
import styles from '../../css/users/Sign.module.css';
import kakao_icon from '../../img/users/kakao_icon.svg';
import google_icon from '../../img/users/google_icon.svg';
import facebook_icon from '../../img/users/facebok_icon.png';
import naver_icon from '../../img/users/naver_icon.png';

// 소셜 로그인, 회원가입 컴포넌트
export default function OAuth2({ signUpOAuth2 }) {

    // 소셜 로그인
    const oAuth2SignInHandler = (provider) => {
        if (provider === 'kakao') {
            window.location.href = 'http://localhost:8085/oauth2/authorization/kakao';
        } else if (provider === 'google') {
            window.location.href = 'http://localhost:8085/oauth2/authorization/google';
        } else if (provider === 'facebook') {
            window.location.href = 'http://localhost:8085/oauth2/authorization/facebook';
        } else if (provider === 'naver') {
            window.location.href = 'http://localhost:8085/oauth2/authorization/naver';
        }
    };

    return (
        <ul>
            <li className={signUpOAuth2 === 'signUpOAuth2' ? styles.signUp_kakao : styles.signIn_kakao} onClick={() => oAuth2SignInHandler('kakao')}>
                <img src={kakao_icon} className={styles.logo} alt='kakao_logo'></img>
            </li>
            <li className={signUpOAuth2 === 'signUpOAuth2' ? styles.signUp_google : styles.signIn_google} onClick={() => oAuth2SignInHandler('google')}>
                <img src={google_icon} className={styles.logo} alt='google_logo'></img>
            </li>
            <li className={signUpOAuth2 === 'signUpOAuth2' ? styles.signUp_facebook : styles.signIn_facebook} onClick={() => oAuth2SignInHandler('facebook')}>
                <img src={facebook_icon} className={styles.logo} alt='naver_logo'></img>
            </li>
            <li className={signUpOAuth2 === 'signUpOAuth2' ? styles.signUp_naver : styles.signIn_naver} onClick={() => oAuth2SignInHandler('naver')}>
                <img src={naver_icon} className={styles.logo} alt='naver_logo'></img>
            </li>
        </ul>
    )
}