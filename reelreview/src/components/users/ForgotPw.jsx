import React, { useState, useEffect } from 'react';
import styles from './ForgotPw.module.css';

// 회원가입 모달창
function ForgotPw() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (email && !validateEmail(email)) {
            setEmailError('정확하지 않은 이메일입니다.');
        } else {
            setEmailError('');
        }
    }, [email]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email) => {
        // 이메일 유효성 검사 로직
        // 유효한 이메일일 때만 true
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className={styles.user_forgotPw_modal}>
            <div className={styles.user_forgotPw_buttonX}></div>
            <div className={styles.user_forgotPw_title}>비밀번호 재설정</div>
            <hr className={styles.user_forgotPw_hr}></hr>
            <div>
                <h2 className={styles.user_forgotPw_h2}>비밀번호를 잊으셨나요?</h2>
                <p className={styles.user_forgotPw_p}>가입했던 이메일을 적어주세요.</p>
                <p className={styles.user_forgotPw_p}>입력하신 이메일 주소로 비밀번호 변경 메일을 보낼게요.</p>
            </div>
            <form>
                <input
                    type="text"
                    id="userEmail"
                    required
                    placeholder="이메일"
                    className={styles.user_forgotPw_input}
                    value={email}
                    onChange={handleEmailChange}
                /><br />
                {emailError && <p className={styles.user_forgotPw_error}>{emailError}</p>}
                <button id='button' type='button' className={styles.user_forgotPw_btn}>이메일 보내기</button>
            </form>
        </div>
    )
}

export default ForgotPw;