import React, { useState, useEffect } from 'react';
import styles from '../../css/users/Sign.module.css';
import reel_review_logo from '../../img/users/Reel_Review_logo.png';
import naver_icon from '../../img/users/naver_icon.png';
import kakao_icon from '../../img/users/kakao_icon.png';

// 회원가입 모달창
function SignUp({setSignUpModalState }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [modalHeight, setModalHeight] = useState(500); // 초기 모달창 높이 : 500px

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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email) => {
        // 이메일 유효성 검사 로직
        // 유효한 이메일일 때만 true
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        // 비밀번호 유효성 검사 로직
        // 유효한 비밀번호일 때만 true
        return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/.test(password);
    };

    // 에러 메시지에 따른 모달창 높이 변경
    useEffect(() => {
        let errorHeight = 500;

        if (emailError && passwordError) {  // 이메일, 비밀번호 에러 메시지 출력 시
            errorHeight = 580;
        } else if (emailError) {            // 이메일 에러 메시지 출력 시
            errorHeight = 530;
        } else if (passwordError) {         // 비밀번호 에러 메시지 출력 시
            errorHeight = 550;
        }
        setModalHeight(errorHeight);
    }, [emailError, passwordError]);

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
          setSignUpModalState(false);
        }
      };

    return (
        <div className={styles.user_login_modal} style={{ height: `${modalHeight}px` }}>
            <form method='post'>
                <div><img src={reel_review_logo} className={styles.user_login_logo} alt='reel_review_logo'></img></div>
                <h2 className={styles.user_login_h2}>회원가입</h2>
                <input type='text' id='userId' required placeholder='이름' className={styles.user_login_input} /><br />
                <input
                    type="text"
                    id="userEmail"
                    required
                    placeholder="이메일"
                    className={styles.user_login_input}
                    value={email}
                    onChange={handleEmailChange}
                /><br />
                {emailError && <p className={styles.user_login_error}>{emailError}</p>}
                <input
                    type="password"
                    id="userPassword"
                    required
                    placeholder="비밀번호"
                    className={styles.user_login_input}
                    value={password}
                    onChange={handlePasswordChange}
                /><br />
                {passwordError && <p className={styles.user_login_error}>{passwordError}</p>}
                <button id='button' type='button' value='회원가입' className={styles.user_login_btn}>회원가입</button>
            </form>
            <div>
                <span className={styles.user_login_helpMessage}>이미 가입하셨나요? <span className={styles.user_login_signUp}>로그인</span></span>
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