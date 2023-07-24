import React, { useState, useEffect } from 'react';
import styles from '../../css/users/Alert.module.css';

// 임시 비밀번호 발급 여부 알림 모달창
export default function ForgotPwAlert({resultMessage, setSignInModalState, setAlertModalState, setForgotPwModalState, alertHeight}) {
    const allmodalStateHandler = () => {
        setAlertModalState(false);
        setForgotPwModalState(false);
        setSignInModalState(false);
    }

    return (
        <div className={alertHeight === 130 ?  styles.forgotPw_alert2 : styles.forgotPw_alert}>
            <h2 className={styles.alert_h2}>알림</h2>
            <p className={styles.alert_p}>{resultMessage}</p>
            <hr className={styles.alert_hr}/>
            <button className={styles.alert_btn} onClick={allmodalStateHandler}>확인</button>
        </div>
    )
}