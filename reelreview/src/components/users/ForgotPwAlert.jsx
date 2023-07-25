import React from 'react';
import styles from '../../css/users/Alert.module.css';

// 임시 비밀번호 발급 여부 알림 모달창
export default function ForgotPwAlert({ signOutHandler, setChangePasswordAlert, setTempPasswordResult, setWrongPasswordAlert, setNoExistEmailAlert, setSignUpAlert, setSignUpModalState, resultMessage, alertHeight, setAlertModalState }) {

    const confirmHandler = () => {
        if (typeof setSignUpAlert === 'function') {
            setSignUpAlert(false); // 
            setSignUpModalState(false);
        } else if (typeof setNoExistEmailAlert === 'function') {
            setNoExistEmailAlert(false);
        } else if (typeof setWrongPasswordAlert === 'function') {
            setWrongPasswordAlert(false);
        } else if (typeof setAlertModalState === 'function') { // 확인키 안됨
            setAlertModalState(false);
            setTempPasswordResult('');
        } else if (typeof setChangePasswordAlert === 'function') { // 확인키 안됨
            setChangePasswordAlert(false);
            signOutHandler();
        }
    };

    return (
        <div className={alertHeight === 130 ? styles.forgotPw_alert2 : styles.forgotPw_alert}>
            <h2 className={styles.alert_h2}>알림</h2>
            <p className={styles.alert_p}>{resultMessage}</p>
            <hr className={styles.alert_hr} />
            <button className={styles.alert_btn} onClick={confirmHandler}>확인</button>
        </div>
    )
}