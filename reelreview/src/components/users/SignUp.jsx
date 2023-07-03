import React, { useState, useEffect } from 'react';
import styles from '../../css/users/Sign.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';
import naver_icon from '../../img/users/naver_icon.png';
import kakao_icon from '../../img/users/kakao_icon.png';
import Terms from './Terms';

// 회원가입 모달창
function SignUp({setSignInModalState, setSignUpModalState }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [modalHeight, setModalHeight] = useState(500); // 초기 모달창 높이 : 500px
    const [termsModalState, setTermsModalState] = useState(false);

    // 약관동의 모달창 상태 변경 함수
    const termsOnOffModal = () => {
        setTermsModalState(!termsModalState);
    };

    useEffect(() => {
        if (name && !validateName(name)) {
            setNameError('정확하지 않은 이름입니다.');
        } else {
            setNameError('');
        }
    }, [name]);

    useEffect(() => {
        if (email && !validateEmail(email)) {
            setEmailError('정확하지 않은 이메일입니다.');
        } else {
            setEmailError('');
        }
    }, [email]);

    useEffect(() => {
        if (password && !validatePassword(password)) {
            setPasswordError('비밀번호는 영문, 숫자, 특수문자 중 2개 이상을 조합하여\n최소 10자리 이상이여야 합니다.');
        } else {
            setPasswordError('');
        }
    }, [password]);

    useEffect(() => {
        if (termsModalState) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }, [termsModalState]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // X버튼 클릭 시 초기화
    const handleClearName = () => {
        setName('');
    }
    const handleClearEmail = () => {
        setEmail('');
    }
    const handleClearPassword = () => {
        setPassword('');
    }

    const validateName = (name) => {
        // 이름(닉네임) 유효성 검사 로직
        // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글 (한글 초성 및 모음은 불가)
        return /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/.test(name);
    };

    const validateEmail = (email) => {
        // 이메일 유효성 검사 로직
        // 이메일 : ex) 'hana@gmail.com' 형식
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        // 비밀번호 유효성 검사 로직
        // 비밀번호 : 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 10자리 이상
        return /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/.test(password);
    };

    // 에러 메시지에 따른 모달창 높이 변경
    useEffect(() => {
        let errorHeight = 505;

        if (nameError && emailError && passwordError) {
            errorHeight = 610;  // 전체 에러 메시지 출력 시
        } else if ((nameError && passwordError) || (emailError && passwordError)) {
            errorHeight = 580;  // 이름, 이메일 + 비밀번호 에러 메시지 출력 시
        } else if (nameError && emailError) {
            errorHeight = 560;  // 이름 + 이메일 에러 메시지 출력 시
        } else if (nameError || emailError) {
            errorHeight = 535;  // 이름, 이메일 에러 메시지 출력 시
        } else if (passwordError) {
            errorHeight = 550;  // 비밀번호 에러 메시지 출력 시
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

    return (
        <div className={styles.user_login_modal} style={{height: `${modalHeight}px`}}>
            <form method='post'>
                <div><img src={reel_review_logo} className={styles.user_login_logo} alt='reel_review_logo'></img></div>
                <h2 className={styles.user_login_h2}>회원가입</h2>
                <input 
                    type='text' 
                    id='userName' 
                    required 
                    placeholder='이름' 
                    className={styles.user_login_input} 
                    value={name}
                    onChange={handleNameChange}/>
                <div className={styles.user_login_buttonX} onClick={handleClearName}></div>
                <div className={styles.user_login_buttonCheck}></div>
                <br />
                {nameError && <p className={styles.user_login_error}>{nameError}</p>}
                <input
                    type="text"
                    id="userEmail"
                    required
                    placeholder="이메일"
                    className={styles.user_login_input}
                    value={email}
                    onChange={handleEmailChange}/>
                <div className={styles.user_login_buttonX} onClick={handleClearEmail}></div>
                <br />
                {emailError && <p className={styles.user_login_error}>{emailError}</p>}
                <input
                    type="password"
                    id="userPassword"
                    required
                    placeholder="비밀번호"
                    className={styles.user_login_input}
                    value={password}
                    onChange={handlePasswordChange}/>
                <div className={styles.user_login_buttonX} onClick={handleClearPassword}></div>
                <br />
                {passwordError && <p className={styles.user_login_error}>{passwordError}</p>}
                <button id='button' type='button' className={styles.user_login_btn} onClick={termsOnOffModal}>회원가입</button>
                {
                    termsModalState ? <Terms setTermsModalState={setTermsModalState}/> : null
                }
            </form>
            <div>
                <span className={styles.user_login_helpMessage}>이미 가입하셨나요?
                    <span className={styles.user_login_signUp} onClick={() => {
                        setSignUpModalState(false);
                        setSignInModalState(true);}}>로그인
                    </span>
                </span>
            </div>
            <hr className={styles.user_login_hr_2}></hr>
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
        </div>
    )
}

export default SignUp;