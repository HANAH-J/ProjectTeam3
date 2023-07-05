import React, { useState, useEffect } from 'react';
import styles from '../../css/users/ForgotPw.module.css';

// 비밀번호 재설정 모달창
export default function ForgotPw({setForgotPwModalState}) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // 이메일 유효성 검사 로직
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

    // 이메일 유효성 검사 통과 시 패스 마크 출력
    useEffect(() => {
        const inputEmail = document.getElementById('userEmail');
        
        if (inputEmail) {
            if (validateEmail(email)) {
                inputEmail.classList.add(styles.user_forgotPw_inputPass);
            } else {
                inputEmail.classList.remove(styles.user_forgotPw_inputPass);
            }
        }
    }, [email]);

    // ⓧ버튼 클릭 시 작성 내용 비우기
    const handleClearEmail = () => {
        setEmail('');
    }

    // 모달창 외부 클릭 시 닫기
    useEffect(() => {
        document.addEventListener('mousedown', clickOutsideHandler);
        return () => {
          document.removeEventListener('mousedown', clickOutsideHandler);
        };
      });

      const clickOutsideHandler = (e) => {
        const modal = document.querySelector(`.${styles.user_forgotPw_modal}`);
        if (modal && !modal.contains(e.target)) {
          setForgotPwModalState(false);
        }
      };

      // X버튼 클릭 시 닫기
      const closeForgotPwModal = () => {
        setForgotPwModalState(false);
      };

    return (
        <div className={styles.user_forgotPw_modal}>
            <div className={styles.user_forgotPw_buttonClose} onClick={closeForgotPwModal}></div>
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
                    className={emailError ? `${styles.user_forgotPw_input} ${styles.user_forgotPw_inputError}` : styles.user_forgotPw_input}
                    value={email}
                    onChange={handleEmailChange} />
                <div className={styles.user_forgotPw_buttonX} onClick={handleClearEmail}></div>
                <br />
                {emailError && <p className={styles.user_forgotPw_error}>{emailError}</p>}
                <button id='button' type='button' className={styles.user_forgotPw_btn}>이메일 보내기</button>
            </form>
        </div>
    )
}