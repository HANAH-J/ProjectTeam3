import React from 'react';
import styles from '../../css/users/Password.module.css';

// 비밀번호 변경 모달창
export default function SignUpAlert({  }) {

    return (
        <div className={styles.forgotPw_alert}>
            <h2 className={styles.alert_h2}>알림</h2>
            <p className={styles.alert_p}>{resultMessage}</p>
            <hr className={styles.alert_hr}/>
            <button className={styles.alert_btn} onClick={allmodalStateHandler}>확인</button>
        </div>
    )
}