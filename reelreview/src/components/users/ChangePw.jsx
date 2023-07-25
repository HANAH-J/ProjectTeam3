import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ForgotPwAlert from './ForgotPwAlert';
import styles from '../../css/users/Password.module.css';

// 비밀번호 변경 모달창
export default function ChangePw({ userEmail, setShowChangePasswordModal, signOutHandler }) {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [modalHeight, setModalHeight] = useState('');
    const [viewPassword, setViewPassword] = useState(false);
    const [changePasswordAlert, setChangePasswordAlert] = useState(false);

    // 비밀번호 유효성 검사 로직
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

    // 비밀번호 에러 메시지 출력 시 모달창 높이 변경
    useEffect(() => {
        let errorHeight = 270;

        if (passwordError) {
            errorHeight = 310;
        }
        setModalHeight(errorHeight);
    }, [passwordError]);

    // 비밀번호 보기 설정
    const viewPasswordHandler = () => {
        if (viewPassword) {
            setViewPassword(false)
        } else {
            setViewPassword(true)
        }
    }

    // 모달창 외부 클릭 시 닫기
    useEffect(() => {
        document.addEventListener('mousedown', clickOutsideHandler);
        return () => {
            document.removeEventListener('mousedown', clickOutsideHandler);
        };
    });

    const clickOutsideHandler = (e) => {
        const modal = document.querySelector(`.${styles.changePw_modal}`);
        if (modal && !modal.contains(e.target)) {
            setShowChangePasswordModal(false);
        }
    };

    // 비밀번호 변경 : UserController.java - changePw()
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(userEmail);

        axios.post('http://localhost:8085/api/auth/changePw', {
            userEmail: userEmail,
            userPassword: password
        }).then((response) => {
            if (response.data === true) {
                console.log("비밀번호 변경 성공");
                setChangePasswordAlert(true);
            } else {
                console.log("비밀번호 변경 실패");
            }
        }).catch((error) => {
            console.log('데이터 전송 실패', error);
        });
    };

    return (
        <div>
            <div className={styles.modalBackground} style={{ backgroundColor: "black" }} />
            <form onSubmit={onSubmitHandler} className={styles.changePw_modal} style={{ height: `${modalHeight}px` }}>
                <h2 className={styles.changePw_title}>비밀번호 변경</h2>
                <p className={styles.changePw_p}>
                    {`회원님의 비밀번호를 다시 설정해주세요.
                    앞으로 이 비밀번호로 접속하시면 됩니다.`}
                </p>
                <div className={styles.changePw_div}>
                    <input
                        type={viewPassword ? "text" : "password"}
                        id="changePw"
                        required
                        placeholder="영문, 숫자, 특문 중 2개 조합 10자 이상"
                        className={passwordError ? `${styles.changePw_input} ${styles.changePw_inputError}` : styles.changePw_input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    {password ? (
                        <div className={styles.changePw_buttonX} onClick={() => { setPassword(''); }}></div>
                    ) : (
                        <div></div>
                    )}
                    <div className={viewPassword ? styles.viewPasswordTrue : styles.viewPasswordFalse}
                        onClick={viewPasswordHandler}></div>
                </div>
                {passwordError && <p className={styles.changePw_error}>{passwordError}</p>}
                <button type='submit' className={styles.changePw_btn}>확인</button>
            </form>
            {changePasswordAlert ? <ForgotPwAlert resultMessage={'비밀번호가 변경되었습니다.'} setChangePasswordAlert={setChangePasswordAlert} signOutHandler={signOutHandler}/> : null}
        </div>
    )
}