import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../stores/index.ts';
import axios from 'axios';
import ForgotPw from './ForgotPw';
import styles from '../../css/users/Sign.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';
import kakao_icon from '../../img/users/kakao_icon.svg';
import google_icon from '../../img/users/google_icon.svg';
import facebook_icon from '../../img/users/facebok_icon.png';
import naver_icon from '../../img/users/naver_icon.png';

// 로그인 모달창
export default function SignIn({ setSignInModalState, setSignUpModalState }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [modalHeight, setModalHeight] = useState('');
    const [forgotPwModalState, setForgotPwModalState] = useState(false);
    const [cookies, setCookies] = useCookies();
    const { user, setUser } = useUserStore();

    // 이메일 유효성 검사 로직
    // 이메일 : ex) 'hana@gmail.com' 형식
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    // 에러 메시지에 따른 모달창 높이 변경
    useEffect(() => {
        let errorHeight = 460;
        if (emailError && passwordError) {
            errorHeight = 520;  // 전체 에러 메시지 출력 시
        } else if (emailError || passwordError) {
            errorHeight = 490;  // 이메일 or 비밀번호 에러 메시지 출력 시
        }
        setModalHeight(errorHeight);
    }, [emailError, passwordError]);

    // '임시 비밀번호 발급' 모달창 상태 변경 함수
    const forgotPwOnOffModal = () => {
        setForgotPwModalState(!forgotPwModalState);
    };

    // '임시 비밀번호 발급' 모달창 배경색 and 스크롤 제어
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

    // 로그인 : UserController.java - signIn()
    const onSubmitHandler = (e) => {
        // 버튼 누를 때마다 새로고침 되는 현상 제어
        e.preventDefault();

        const data = {
            userEmail: email,
            userPassword: password
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post('http://localhost:8085/api/auth/signIn', data, config)
            .then((response) => {
                const responseData = response.data;
                console.log(responseData);
                if (!responseData.result) {
                    console.log('로그인 실패');
                    return;
                }
                document.body.style.overflow = "auto";  // 스크롤 재활성화

                const { token, exprTime, user } = responseData.data;
                const expires = new Date();
                expires.setMilliseconds(expires.getMilliseconds() + exprTime);

                setCookies('token', token, { exprTime });
                setUser(user);
            }).catch((error) => {
                console.log('일반 로그인 요청 실패: ', error);
            })
    };

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
        <div className={styles.user_login_modal} style={{ height: `${modalHeight}px` }}>
            <form onSubmit={onSubmitHandler}>
                <div><img src={reel_review_logo} className={styles.user_login_logo} alt='reel_review_logo'></img></div>
                <h2 className={styles.user_login_h2}>로그인</h2>
                <input
                    type='text'
                    id='userEmail'
                    required
                    placeholder='이메일'
                    className={emailError ? `${styles.user_login_input} ${styles.user_sign_inputError}` : styles.user_login_input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                {email ? (
                    <div className={styles.user_login_buttonX} onClick={() => {setEmail('');}}></div>
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
                    onChange={(e) => setPassword(e.target.value)} />
                {password ? (
                    <div className={styles.user_login_buttonX} onClick={() => {setPassword('');}}></div>
                ) : (
                    <div></div>
                )}
                <br />
                {passwordError && <p className={styles.user_login_error}>{passwordError}</p>}
                <button id='button' className={styles.user_login_btn} onClick={onSubmitHandler}>로그인</button>
            </form>
            <div className={styles.user_sign_messageContainer}>
                <span className={styles.user_login_forgotPw} onClick={forgotPwOnOffModal}>비밀번호를 잊어버리셨나요?</span>
                {
                    forgotPwModalState ? <ForgotPw setSignInModalState={setSignInModalState} setForgotPwModalState={setForgotPwModalState} /> : null
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
            <ul>
                <li className={styles.signIn_kakao} onClick={() => oAuth2SignInHandler('kakao')}>
                    <img src={kakao_icon} className={styles.logo} alt='kakao_logo'></img>
                </li>
                <li className={styles.signIn_google} onClick={() => oAuth2SignInHandler('google')}>
                    <img src={google_icon} className={styles.logo} alt='google_logo'></img>
                </li>
                <li className={styles.signIn_facebook} onClick={() => oAuth2SignInHandler('facebook')}>
                    <img src={facebook_icon} className={styles.logo} alt='naver_logo'></img>
                </li>
                <li className={styles.signIn_naver} onClick={() => oAuth2SignInHandler('naver')}>
                    <img src={naver_icon} className={styles.logo} alt='naver_logo'></img>
                </li>
            </ul>
            {forgotPwModalState && <div className={styles.modalBackground_2} style={{ backgroundColor: "black" }} />}
        </div>
    )
}