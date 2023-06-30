import React, { useEffect, useRef, forwardRef } from 'react';
import styles from '../../css/users/Sign.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';
import naver_icon from '../../img/users/naver_icon.png';
import kakao_icon from '../../img/users/kakao_icon.png';

// 회원가입 모달창 출력 페이지
function SignUp() {

    const modal = forwardRef((props, ref) => {
        // 모달창을 감싸는 역할
        let wrapperRef = useRef();

        useEffect(() => {
            document.addEventListener('mousedown', clickOutsideHandler);
            return() => {
                document.removeEventListener('mousedown', clickOutsideHandler);
            }
        })
        const clickOutsideHandler = (e) => {
            if(wrapperRef && !wrapperRef.current.contains(e.target)) {
                props.setSignUpModalState(false);
            }
        }
    });

    return (
        <div className={styles.user_login_modal}>
            <form method='post'>
                <div><img src={reel_review_logo} className={styles.user_login_logo}></img></div>
                <h2 className={styles.user_login_h2}>회원가입</h2>
                <input type='text' id='userId' required placeholder='이름' className={styles.user_login_input}/><br/>
                <input type='text' id='userId' required placeholder='이메일' className={styles.user_login_input}/><br/>
                <input type='password' id='userPassword' required placeholder='비밀번호' className={styles.user_login_input}/><br/>
                <input id='button' type='button' value='회원가입' className={styles.user_login_btn}/>
            </form>
            <div>
                <span className={styles.user_login_helpMessage}>이미 가입하셨나요? <span className={styles.user_login_signUp}>로그인</span></span>
            </div>
            <hr className={styles.user_login_hr_2}></hr>
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

export default SignUp;