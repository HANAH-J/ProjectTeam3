import React, { useState, useEffect } from 'react';
import styles from '../../css/users/Alert.module.css';

// 임시 비밀번호 발급 여부 알림 모달창
export default function SignOutHeaderAlert({ closeSignOutAlert, signOutHandler }) {

    return (
        <div>
            <div className={styles.modalBackground2} style={{ backgroundColor: "black" }} />
            <div className={styles.signOut_alert}>
                <h2 className={styles.alert_h2}>알림</h2>
                <p className={styles.alert_p}>로그아웃 하시겠어요?</p>
                <hr className={styles.alert_hr} />
                <button className={styles.alert_dualBtn1} onClick={closeSignOutAlert}>취소</button>
                <button className={styles.alert_dualBtn2} onClick={signOutHandler}>확인</button>
            </div>
        </div>
    )
}