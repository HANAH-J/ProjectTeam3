import React, { useState, useEffect } from 'react';
import styles from './Terms.module.css';

function Terms() {
    
    // 체크박스 useState
    const [checkItems, setCheckItems] = useState([]);

    // 가입하기 버튼 useState
    const [submitButtonColor, setSubmitButtonColor] = useState('lightgray');

    // '전체 약관 동의' 체크 시 전체 약관 체크 함수
    const allCheckHandler = (isChecked) => {
        if (isChecked) {
            setCheckItems(['check_1', 'check_2']);
        } else {
            setCheckItems([]);
        }
    };

    // 선택 체크 함수
    const specificCheckHandler = (event) => {
        const checkboxId = event.target.id;
        const isChecked = event.target.checked;

        if (isChecked) {
            setCheckItems((prevCheckItems) => [...prevCheckItems, checkboxId]);
        } else {
            setCheckItems((prevCheckItems) => prevCheckItems.filter((id) => id !== checkboxId));
        }
    };

    // 가입하기 버튼 색상 변경 함수
    const updateSubmitButtonColor = () => {
        if (checkItems.length === 2) {
            setSubmitButtonColor('#ff2f6e'); // 모든 체크박스가 선택된 경우 버튼 색상을 빨간색으로 변경
        } else {
            setSubmitButtonColor('lightgray'); // 하나 이상의 체크박스가 선택되지 않은 경우 버튼 색상을 검은색으로 변경
        }
    };

    // checkItems 상태가 변경될 때마다 '가입하기' 버튼 색상 변경
    useEffect(() => {
        updateSubmitButtonColor();
    }, [checkItems]);

    return(

        <div className={styles.user_terms_modal}>
            <div className={styles.user_terms_modal_color}>
                <span className={styles.user_terms_message}>약관에 동의하시면<br></br>가입이 완료됩니다.</span>
            </div>
            <ul>
                {/* 전체 약관 동의 체크박스 */}
                <li className={styles.user_terms_check_all}>
                    <label className={styles.user_terms_all}>
                        <input type='checkbox' id='check_all' className={styles.user_terms_all_check}
                        onChange={(e) => allCheckHandler(e.target.checked)}
                        checked={checkItems.length === 2}/>
                        <label htmlFor='check_all'></label>
                        <span className={styles.user_terms_text}>전체 약관 동의</span>
                    </label>
                </li>
                {/* 서비스 이용약관 체크박스 */}
                <li className={styles.user_terms_check}>
                    <label className={styles.user_terms_specific}>
                    <input
                            type='checkbox'
                            id='check_1'
                            className={styles.user_terms_specific_check}
                            onChange={specificCheckHandler}
                            checked={checkItems.includes('check_1')}
                        />
                        <label htmlFor='check_1'></label>
                        <span className={styles.user_terms_text}>서비스 이용약관</span>
                        <span className={styles.user_terms_check_detail}>보기</span>
                    </label>
                </li>
                {/* 개인정보 처리방침 체크박스 */}
                <li className={styles.user_terms_check}>
                    <label className={styles.user_terms_specific}>
                    <input
                            type='checkbox'
                            id='check_2'
                            className={styles.user_terms_specific_check}
                            onChange={specificCheckHandler}
                            checked={checkItems.includes('check_2')}
                        />
                        <label htmlFor='check_2'></label>
                        <span className={styles.user_terms_text}>개인정보 처리방침</span>
                        <span className={styles.user_terms_check_detail}>보기</span>
                    </label>
                </li>
            </ul>
            {/* 가입하기 버튼 */}
            <div>
                <button className={styles.user_terms_btn} style={{ color: submitButtonColor }}>
                    가입하기
                </button>
            </div>
        </div>
    )
}

export default Terms;