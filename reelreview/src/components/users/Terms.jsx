import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../css/users/Terms.module.css';
import TermsContents1 from './TermsContents1';
import TermsContents2 from './TermsContents2';

export default function Terms() {
    
    const [checkItems, setCheckItems] = useState([]);
    const [submitButtonColor, setSubmitButtonColor] = useState('lightgray');
    const [termsCt1State, setTermsCt1State] = useState(false);
    const [termsCt2State, setTermsCt2State] = useState(false);

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
    const updateSubmitButtonColor = useCallback(() => {
        if (checkItems.length === 2) {
            setSubmitButtonColor('#ff2f6e'); // 모든 체크박스가 선택된 경우 버튼 색상 변경
        } else {
            setSubmitButtonColor('lightgray');
        }
    }, [checkItems]);

    // checkItems 상태가 변경될 때마다 '가입하기' 버튼 색상 변경
    useEffect(() => {
        updateSubmitButtonColor();
    }, [checkItems, updateSubmitButtonColor]);

    // 서비스 이용약관 모달창 상태 변경 함수
    const termsCt1OnOffModal = () => {
        setTermsCt1State(!termsCt1State);
    };

    // 개인정보 처리방침 모달창 상태 변경 함수
    const termsCt2OnOffModal = () => {
        setTermsCt2State(!termsCt2State);
    };

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
                <hr className={styles.user_terms_hr}></hr>
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
                        <span className={styles.user_terms_check_detail} onClick={termsCt1OnOffModal}>보기</span>
                        {
                            // 서비스 이용약관 출력
                            termsCt1State ? <TermsContents1 setTermsCt1State={setTermsCt1State}/> : null
                        }
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
                        <span className={styles.user_terms_check_detail} onClick={termsCt2OnOffModal}>보기</span>
                        {
                            // 개인정보 처리방침 출력
                            termsCt2State ? <TermsContents2 setTermsCt2State={setTermsCt2State}/> : null
                        }
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