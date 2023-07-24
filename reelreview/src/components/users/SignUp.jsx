import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Terms from './Terms';
import OAuth2 from './OAuth2.jsx';
import ForgotPwAlert from './ForgotPwAlert';
import styles from '../../css/users/Sign.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';

// 회원가입 모달창
export default function SignUp({ setSignInModalState, setSignUpModalState }) {
    
    // 이름, 이메일, 비밀번호 저장
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 이름, 이메일, 비밀번호 에러
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 회원가입 모달창 높이
    const [modalHeight, setModalHeight] = useState('');

    // 약관 동의 모달창 상태
    const [termsModalState, setTermsModalState] = useState(false);

    // 회원가입 완료 알림창
    const [signUpAlert, setSignUpAlert] = useState(false);

    // 이름, 이메일, 비밀번호 입력 필드 검사
    const isAllFieldsFilled = () => {
        return name.trim() !== '' && email.trim() !== '' && password.trim() !== '';
    };

    // 이름 유효성 검사 로직
    // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글 (한글 초성 및 모음은 불가)
    const validateName = (name) => {
        return /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/.test(name);
    };

    // 이름 에러 메시지 출력 여부
    useEffect(() => {
        if (name && !validateName(name)) {
            setNameError('정확하지 않은 이름입니다.');
        } else {
            setNameError('');
        }
    }, [name]);

    // 이메일 유효성 검사 로직
    // 이메일 : ex) 'hana@gmail.com' 형식
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // 이메일 에러 메시지 출력 여부
    useEffect(() => {

        // 이메일 중복 검사 로직
        let responseData = true;

        axios.post('http://localhost:8085/api/auth/emailCheck', {
            userEmail: email,
        })
            .then((response) => {
                responseData = response.data;
                if (email && !validateEmail(email)) {
                    setEmailError('정확하지 않은 이메일입니다.');
                } else if (responseData === false) {
                    setEmailError('이미 가입된 이메일입니다.');
                } else {
                    setEmailError('');
                }
            })
            .catch(function (error) {
                console.log('React-SignUp-axios : userEmail 데이터 전송 실패');
            });
    }, [email]);

    // 비밀번호 유효성 검사 로직
    // 비밀번호 : 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 10자리 이상
    const validatePassword = (password) => {
        return /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/.test(password);
    };

    // 비밀번호 에러 메시지 출력 여부
    useEffect(() => {
        if (password && !validatePassword(password)) {
            setPasswordError('비밀번호는 영문, 숫자, 특수문자 중 2개 이상을 조합하여\n최소 10자리 이상이여야 합니다.');
        } else {
            setPasswordError('');
        }
    }, [password]);

    // 이름, 이메일, 비밀번호 유효성 검사 통과 시 패스 마크 출력
    useEffect(() => {
        const inputName = document.getElementById('userName');
        const inputEmail = document.getElementById('userEmail');
        const inputPassword = document.getElementById('userPassword');

        if (inputName) {
            if (validateName(name)) {
                inputName.classList.add(styles.user_sign_inputPass);
            } else {
                inputName.classList.remove(styles.user_sign_inputPass);
            }
        }

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
    }, [name, email, password]);

    // 약관동의 모달창 상태 변경 함수
    const termsOnOffModal = () => {
        setTermsModalState(!termsModalState);
    };

    // 약관동의 모달창 배경색 and 스크롤 제어
    useEffect(() => {
        if (termsModalState) {
            document.body.style.overflow = 'hidden';
        }
    }, [termsModalState]);

    // 에러 메시지에 따른 모달창 높이 변경
    useEffect(() => {
        let errorHeight = 460;

        if (nameError && emailError && passwordError) {
            errorHeight = 570;  // 전체 에러 메시지 출력 시
        } else if ((nameError && passwordError) || (emailError && passwordError)) {
            errorHeight = 540;  // 이름 or 이메일 and 비밀번호 에러 메시지 출력 시
        } else if (nameError && emailError) {
            errorHeight = 520;  // 이름 and 이메일 에러 메시지 출력 시
        } else if (nameError || emailError) {
            errorHeight = 490;  // 이름 or 이메일 에러 메시지 출력 시
        } else if (passwordError) {
            errorHeight = 510;  // 비밀번호 에러 메시지 출력 시
        }
        setModalHeight(errorHeight);
    }, [nameError, emailError, passwordError]);

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
                setSignUpModalState(false);
                setSignInModalState(true);
            } else {
                setSignUpModalState(false);
            }
        }
    };

    // 회원가입 : UserController.java - signUp()
    const onSubmitHandler = (e) => {
        // 버튼 누를 때마다 새로고침 되는 현상 제어
        e.preventDefault();

        const data = {
            username: name,
            userEmail: email,
            userPassword: password
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post('http://localhost:8085/api/auth/signUp', data, config)
            .then(() => {
                console.log('회원가입 성공');
                setSignUpModalState(false);
                // alert('회원가입이 완료 되었습니다.');
                setSignUpAlert(true);
            }).catch((error) => {
                console.log('데이터 전송 실패 : ', error);
            })
    };

    return (
        <div className={styles.user_login_modal} style={{ height: `${modalHeight}px` }}>
            <form onSubmit={onSubmitHandler}>
                <div><img src={reel_review_logo} className={styles.user_login_logo} alt='reel_review_logo'></img></div>
                <h2 className={styles.user_login_h2}>회원가입</h2>
                <input
                    type='text'
                    id='userName'
                    required
                    placeholder='이름'
                    autoComplete='off'
                    className={nameError ? `${styles.user_login_input} ${styles.user_sign_inputError}` : styles.user_login_input}
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                {name ? (
                    <div className={styles.user_login_buttonX} onClick={() => { setName(''); }}></div>
                ) : (
                    <div></div>
                )}
                <div className={styles.user_login_buttonCheck}></div>
                <br />
                {nameError && <p className={styles.user_login_error}>{nameError}</p>}
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
                <button
                    id='button'
                    type='button'
                    className={styles.user_login_btn}
                    disabled={!isAllFieldsFilled()}
                    onClick={termsOnOffModal}>회원가입
                </button>
                {
                    termsModalState ? <Terms setSignUpAlert={setSignUpAlert} setTermsModalState={setTermsModalState} onSubmitHandler={onSubmitHandler} /> : null
                }
                {
                    signUpAlert ? <ForgotPwAlert resultMessage={"회원가입이 완료 되었습니다."} setTermsModalState={setTermsModalState} setSignUpModalState={setSignUpModalState} setSignUpAlert={setSignUpAlert}/> : null
                }
            </form>
            <div className={styles.user_sign_messageContainer}>
                <span className={styles.user_login_helpMessage}>이미 가입하셨나요?
                    <span className={styles.user_login_signUp} onClick={() => {
                        setSignUpModalState(false);
                        setSignInModalState(true);
                    }}>로그인
                    </span>
                </span>
            </div>
            <hr className={styles.user_login_hr_2}/>
            <OAuth2 signUpOAuth2={'signUpOAuth2'}/>
            {termsModalState && (<div className={styles.modalBackground_1} style={{ backgroundColor: "black" }} />)}
            {signUpAlert && (<div className={styles.modalBackground_1} style={{ backgroundColor: "black" }} />)}
        </div>
    )
}