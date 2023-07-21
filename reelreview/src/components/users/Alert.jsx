import React, { useState, useEffect } from 'react';
import styles from '../../css/users/Alert.module.css';

// 임시 비밀번호 발급 여부 알림 모달창
export default function Alert({resultMessage, setSignInModalState, setAlertModalState, setForgotPwModalState}) {
    const allmodalStateHandler = () => {
        setAlertModalState(false);
        setForgotPwModalState(false);
        setSignInModalState(false);
    }

    return (
        <div className={styles.user_alert_modal}>
            <h2 className={styles.user_alert_h2}>알림</h2>
            <p className={styles.user_alert_p}>{resultMessage}</p>
            <hr className={styles.user_alert_hr}/>
            <button className={styles.user_alert_btn} onClick={allmodalStateHandler}>확인</button>
        </div>
    )
}