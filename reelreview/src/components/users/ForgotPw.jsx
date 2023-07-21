import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../css/users/ForgotPw.module.css';
import Alert from './Alert';

// 임시 비밀번호 발급 모달창
export default function ForgotPw({ setSignInModalState, setForgotPwModalState }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [alertModalState, setAlertModalState] = useState(false);
    let tempPsaswordResult = '';

    // 이메일 유효성 검사 로직
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

    // 이메일 유효성 검사 통과 시 패스 마크 출력
    useEffect(() => {
        const inputEmail = document.getElementById('forgotEmail');

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

    // '알림' 모달창 상태 변경 함수
    const alertOnOffModal = () => {
        setAlertModalState(!alertModalState);
    };

    // '알림' 모달창 배경색 and 스크롤 제어
    useEffect(() => {
        if (alertModalState) {
            document.body.style.overflow = 'hidden';
        }
    }, [alertModalState]);

    // 임시 비밀번호 발급 : UserController.java - emailCheck()
    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8085/api/auth/emailCheck', {
            userEmail: email,
        }).then((response) => {
            tempPsaswordResult = response;
            if (response.data === false) { // 임시 비밀번호 발급
                axios.post('http://localhost:8085/api/auth/resetPw/sendEmail', {
                    userEmail: email,
                }).then(() => {
                    setAlertModalState(true);
                })
            } else {
                alertOnOffModal(true);
            }
        }).catch(function (error) {
            console.log('React-SignUp-axios : userEmail 데이터 전송 실패');
        });
    };

    return (
        <div className={styles.user_forgotPw_modal}>
            <div className={styles.user_forgotPw_buttonClose} onClick={closeForgotPwModal}></div>
            <div className={styles.user_forgotPw_title}>임시 비밀번호 발급</div>
            <hr className={styles.user_forgotPw_hr}></hr>
            <div>
                <h2 className={styles.user_forgotPw_h2}>비밀번호를 잊으셨나요?</h2>
                <p className={styles.user_forgotPw_p}>가입했던 이메일을 적어주세요.</p>
                <p className={styles.user_forgotPw_p}>입력하신 이메일 주소로 임시 비밀번호를 보낼게요.</p>
            </div>
            <form onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    id="forgotEmail"
                    required
                    placeholder="이메일"
                    className={emailError ? `${styles.user_forgotPw_input} ${styles.user_forgotPw_inputError}` : styles.user_forgotPw_input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                {email ? (
                    <div className={styles.user_forgotPw_buttonX} onClick={handleClearEmail}></div>
                ) : (
                    <div></div>
                )}
                <br />
                {emailError && <p className={styles.user_forgotPw_error}>{emailError}</p>}
                <button type='submit' className={styles.user_forgotPw_btn}>이메일 보내기</button>
                {
                    tempPsaswordResult === false && <Alert resultMessage="임시 비밀번호 발급 이메일을 보냈어요." setSignInModalState={setSignInModalState} setForgotPwModalState={setForgotPwModalState} setAlertModalState={setAlertModalState}/>
                }
                {
                    tempPsaswordResult === true && <Alert resultMessage="가입되지 않은 이메일입니다." setSignInModalState={setSignInModalState} setForgotPwModalState={setForgotPwModalState} setAlertModalState={setAlertModalState}/>
                }
            </form>
            {alertModalState && <div className={styles.modalBackground} style={{ backgroundColor: "black" }} />}
        </div>
    )
}