import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../stores/index.ts';
import axios from 'axios';
import ForgotPw from './ForgotPw';
import ForgotPwAlert from './ForgotPwAlert.jsx';
import OAuth2 from './OAuth2.jsx';
import styles from '../../css/users/Sign.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';

// 로그인 모달창
export default function SignIn({ setSignInModalState, setSignUpModalState }) {

    // 이메일, 비밀번호 저장
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 이메일, 비밀번호 에러
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 로그인 모달창 높이
    const [modalHeight, setModalHeight] = useState('');

    // 임시 비밀번호 발급 모달창 상태
    const [forgotPwModalState, setForgotPwModalState] = useState(false);
    const [cookies, setCookies] = useCookies();
    const { user, setUser } = useUserStore();

    // 로그인 실패 알림창
    const [noExistEmailAlert, setNoExistEmailAlert] = useState(false);
    const [wrongPasswordAlert, setWrongPasswordAlert] = useState(false);

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
            setPasswordError('비밀번호는 최소 10자리 이상이어야 합니다.');
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
        if (modal && !modal.contains(e.target) && !forgotPwModalState) {
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
                if (!responseData.result) {
                    if (responseData.message === 'noExistEmail') {
                        console.log('로그인 실패 : 존재하지 않는 이메일');
                        setNoExistEmailAlert(true);
                    } else if (responseData.message === 'wrongPassword') {
                        console.log('로그인 실패 : 잘못된 비밀번호');
                        setWrongPasswordAlert(true);
                    }
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
                    autoComplete='off'
                    className={emailError ? `${styles.user_login_input} ${styles.user_sign_inputError}` : styles.user_login_input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                {email ? (
                    <div className={styles.user_login_buttonX} onClick={() => { setEmail(''); }}></div>
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
                    <div className={styles.user_login_buttonX} onClick={() => { setPassword(''); }}></div>
                ) : (
                    <div></div>
                )}
                <br />
                {passwordError && <p className={styles.user_login_error}>{passwordError}</p>}
                <button id='button' className={styles.user_login_btn} onClick={onSubmitHandler}>로그인</button>
                {
                    noExistEmailAlert ? <ForgotPwAlert resultMessage={'가입되지 않은 이메일입니다.'} setNoExistEmailAlert={setNoExistEmailAlert}/> : null
                }
                {
                    wrongPasswordAlert ? <ForgotPwAlert resultMessage={'비밀번호가 일치하지 않습니다.'} setWrongPasswordAlert={setWrongPasswordAlert}/> : null
                }
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
            <hr className={styles.user_login_hr} />
            <OAuth2 />
            {forgotPwModalState && <div className={styles.modalBackground_2} style={{ backgroundColor: 'black' }} />}
        </div>
    )
}