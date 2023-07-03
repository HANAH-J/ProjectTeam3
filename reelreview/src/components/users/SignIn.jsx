import React, { useState, useEffect } from 'react';
import styles from '../../css/users/Sign.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';
import naver_icon from '../../img/users/naver_icon.png';
import kakao_icon from '../../img/users/kakao_icon.png';
import ForgotPw from './ForgotPw';

// 로그인 모달창
function SignIn({setSignInModalState, setSignUpModalState}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [modalHeight, setModalHeight] = useState(500); // 초기 모달창 높이 : 500px
    const [forgotPwModalState, setForgotPwModalState] = useState(false);

    // 비밀번호 재설정 모달창 상태 변경 함수
    const forgotPwOnOffModal = () => {
        setForgotPwModalState(!forgotPwModalState);
    };

    useEffect(() => {
        if (email && !validateEmail(email)) {
            setEmailError('정확하지 않은 이메일입니다.');
        } else {
            setEmailError('');
        }
    }, [email]);

    useEffect(() => {
        if (forgotPwModalState) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }, [forgotPwModalState]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // X버튼 클릭 시 초기화
    const handleClearEmail = () => {
        setEmail('');
    }
    const handleClearPassword = () => {
        setPassword('');
    }

    const validateEmail = (email) => {
        // 이메일 유효성 검사 로직
        // 이메일 : ex) 'hana@gmail.com' 형식
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        let errorHeight = 510;
        if (emailError) {
            errorHeight = 540;  // 이메일 에러 메시지 출력 시
        }
        setModalHeight(errorHeight);
    }, [emailError]);

    // 모달창 외부 클릭 시 닫기
    useEffect(() => {
        document.addEventListener('mousedown', clickOutsideHandler);
        return () => {
          document.removeEventListener('mousedown', clickOutsideHandler);
        };
      });

      const clickOutsideHandler = (e) => {
        const modal = document.querySelector(`.${styles.user_login_modal}`);
        if (modal && !modal.contains(e.target)) {
          if (e.target.classList.contains(styles.user_login_signUp)) {
            setSignInModalState(false);
            setSignUpModalState(true);
          } else {
            setSignInModalState(false);
          }
        }
      };

    return (
        <div className={styles.user_login_modal} style={{height: `${modalHeight}px`}}>
            <form method='post'>
                <div><img src={reel_review_logo} className={styles.user_login_logo} alt='reel_review_logo'></img></div>
                <h2 className={styles.user_login_h2}>로그인</h2>
                <input 
                    type='text' 
                    id='userEmail' 
                    required 
                    placeholder='이메일' 
                    className={styles.user_login_input}
                    value={email}
                    onChange={handleEmailChange}/>
                <div className={styles.user_login_buttonX} onClick={handleClearEmail}></div>
                <br/>
                {emailError && <p className={styles.user_login_error}>{emailError}</p>}
                <input 
                    type='password' 
                    id='userPassword' 
                    required 
                    placeholder='비밀번호' 
                    className={styles.user_login_input}
                    value={password}
                    onChange={handlePasswordChange}/>
                <div className={styles.user_login_buttonX} onClick={handleClearPassword}></div>
                <br/>
                <button id='button' type='button' className={styles.user_login_btn}>로그인</button>
            </form>
            <div>
                <span className={styles.user_login_forgotPw} onClick={forgotPwOnOffModal}>비밀번호를 잊어버리셨나요?</span>
                {
                    forgotPwModalState ? <ForgotPw setForgotPwModalState={setForgotPwModalState}/> : null
                }
                <span className={styles.user_login_helpMessage}>계정이 없으신가요?
                    <span className={styles.user_login_signUp} onClick={() => {
                        setSignInModalState(false);
                        setSignUpModalState(true);}}>회원가입
                    </span>
                </span>
            </div>
            <hr className={styles.user_login_hr}></hr>
            <div>
                <div className={styles.user_login_naver}>
                    <img src={naver_icon} className={styles.user_login_naver_logo} alt='naver_logo'></img>
                    <span className={styles.user_login_logo_btn}>네이버 아이디로 로그인</span>
                </div>
                <div className={styles.user_login_kakao}>
                    <img src={kakao_icon} className={styles.user_login_kakao_logo} alt='kakao_logo'></img>
                    <span className={styles.user_login_logo_btn}>카카오 아이디로 로그인</span>
                </div>
            </div>
            {forgotPwModalState && (
                <div className={styles.modalBackground_2} style={{ backgroundColor: "black" }}>
                </div>
            )}
        </div>
    )
}

export default SignIn;