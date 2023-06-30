import React, { useState } from 'react';
import styles from '../../css/users/SignIn.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';
import naver_icon from '../../img/users/naver_icon.png';
import kakao_icon from '../../img/users/kakao_icon.png';

// 로그인 모달창 출력 페이지
function SignIn() {

    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    };

    const handleLogin = () => {
        // 로그인 처리 로직 구현
        console.log('User ID:', userId);
        console.log('Password:', userPassword);
        // 실제 로그인을 처리하거나 API 요청을 보내는 로직을 구현
        // ex. axios를 사용하여 백엔드 API에 로그인 요청
        // 필요한 경우, 상태 업데이트 및 에러 처리 로직도 추가
    };

    return (
        <div className={styles.user_login_modal}>
            <form method='post'>
                <div><img src={reel_review_logo} className={styles.user_login_logo}></img></div>
                <h2 className={styles.user_login_h2}>로그인</h2>
                <input type='text' id='userId' required placeholder='이메일' className={styles.user_login_input}/><br/>
                <input type='password' id='userPassword' required placeholder='비밀번호' className={styles.user_login_input}/><br/>
                <input id='button' type='button' value='로그인' className={styles.user_login_btn}/>
            </form>
            <div>
                <span className={styles.user_login_forgotPw}>비밀번호를 잊어버리셨나요?</span>
                <span className={styles.user_login_helpMessage}>계정이 없으신가요? <span className={styles.user_login_signUp}>회원가입</span></span>
            </div>
            <hr className={styles.user_login_hr}></hr>
            <div>
                <div className={styles.user_login_naver}>
                    <img src={naver_icon} className={styles.user_login_naver_logo}></img>
                    <span className={styles.user_login_logo_btn}>네이버 아이디로 로그인</span>
                </div>
                <div className={styles.user_login_kakao}>
                    <img src={kakao_icon} className={styles.user_login_kakao_logo}></img>
                    <span className={styles.user_login_logo_btn}>카카오 아이디로 로그인</span>
                </div>
            </div>
        </div>
    )
}

export default SignIn;