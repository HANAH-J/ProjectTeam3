import React, { useState, useEffect } from 'react';
import styles from '../../css/users/Sign.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';
import naver_icon from '../../img/users/naver_icon.png';
import kakao_icon from '../../img/users/kakao_icon.png';
import ForgotPw from './ForgotPw';

// 로그인 모달창
export default function SignIn({ setSignInModalState, setSignUpModalState }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [modalHeight, setModalHeight] = useState(500); // 초기 모달창 높이 : 500px
    const [forgotPwModalState, setForgotPwModalState] = useState(false);

    // 이메일 유효성 검사 로직
    // 이메일 : ex) 'hana@gmail.com' 형식
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // 실시간 이메일 입력 값
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // 이메일 에러 메시지 출력 여부
    useEffect(() => {
        if (email && !validateEmail(email)) {
            setEmailError('정확하지 않은 이메일입니다.');
        } else {
            setEmailError('');
        }
    }, [email]);

    // 비밀번호 유효성 검사 로직
    // 비밀번호 : 최소 6자리 이상
    const validatePassword = (password) => {
        return /^(?=.{6,})/.test(password);
    };

    // 실시간 비밀번호 입력 값
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // 비밀번호 에러 메시지 출력 여부
    useEffect(() => {
        if (password && !validatePassword(password)) {
            setPasswordError('비밀번호는 최소 6자리 이상이어야 합니다.');
        } else {
            setPasswordError('');
        }
    }, [password]);

    // 이메일, 비밀번호 유효성 검사 통과 시 패스 마크 출력
    useEffect(() => {
        const inputEmail = document.getElementById('userEmail');
        const inputPassword = document.getElementById('userPassword');
        
        if (inputEmail) {
            if (validateEmail(email)) {
                inputEmail.classList.add(styles.user_sign_inputPass);
            } else {
                inputEmail.classList.remove(styles.user_sign_inputPass);
            }
        }

        if (inputPassword) {
            if (validatePassword(password)) {
                inputPassword.classList.add(styles.user_sign_inputPass);
            } else {
                inputPassword.classList.remove(styles.user_sign_inputPass);
            }
        }
    }, [email, password]);

    // ⓧ버튼 클릭 시 작성 내용 비우기
    const handleClearEmail = () => {
        setEmail('');
    }
    const handleClearPassword = () => {
        setPassword('');
    }

    // 에러 메시지에 따른 모달창 높이 변경
    useEffect(() => {
        let errorHeight = 510;
        if (emailError && passwordError) {
            errorHeight = 570;  // 전체 에러 메시지 출력 시
        } else if (emailError || passwordError) {
            errorHeight = 540;  // 이메일 or 비밀번호 에러 메시지 출력 시
        }
        setModalHeight(errorHeight);
    }, [emailError, passwordError]);

    // '비밀번호 재설정' 모달창 상태 변경 함수
    const forgotPwOnOffModal = () => {
        setForgotPwModalState(!forgotPwModalState);
    };

    // '비밀번호 재설정' 모달창 배경색 and 스크롤 제어
    useEffect(() => {
        if (forgotPwModalState) {
            document.body.style.overflow = 'hidden';
        }
    }, [forgotPwModalState]);

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
            setSignInModalState(false);
        }
    };

    return (
        <div className={styles.user_login_modal} style={{ height: `${modalHeight}px` }}>
            <form method='post'>
                <div><img src={reel_review_logo} className={styles.user_login_logo} alt='reel_review_logo'></img></div>
                <h2 className={styles.user_login_h2}>로그인</h2>
                <input
                    type='text'
                    id='userEmail'
                    required
                    placeholder='이메일'
                    className={emailError ? `${styles.user_login_input} ${styles.user_sign_inputError}` : styles.user_login_input}
                    value={email}
                    onChange={handleEmailChange} />
                {email ? (
                    <div className={styles.user_login_buttonX} onClick={handleClearEmail}></div>
                ) : (
                    <div></div>
                )}
                <br />
                {emailError && <p className={styles.user_login_error}>{emailError}</p>}
                <input
                    type='password'
                    id='userPassword'
                    required
                    placeholder='비밀번호'
                    className={passwordError ? `${styles.user_login_input} ${styles.user_sign_inputError}` : styles.user_login_input}
                    value={password}
                    onChange={handlePasswordChange} />
                {password ? (
                    <div className={styles.user_login_buttonX} onClick={handleClearPassword}></div>
                ) : (
                    <div></div>
                )}
                <br />
                {passwordError && <p className={styles.user_login_error}>{passwordError}</p>}
                <button id='button' type='button' className={styles.user_login_btn}>로그인</button>
            </form>
            <div className={styles.user_sign_messageContainer}>
                <span className={styles.user_login_forgotPw} onClick={forgotPwOnOffModal}>비밀번호를 잊어버리셨나요?</span>
                {
                    forgotPwModalState ? <ForgotPw setForgotPwModalState={setForgotPwModalState} /> : null
                }
                <span className={styles.user_login_helpMessage}>계정이 없으신가요?
                    <span className={styles.user_login_signUp} onClick={() => {
                        setSignInModalState(false);
                        setSignUpModalState(true);
                    }}>회원가입
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
            {forgotPwModalState && <div className={styles.modalBackground_2} style={{ backgroundColor: "black" }} />}
        </div>
    )
}