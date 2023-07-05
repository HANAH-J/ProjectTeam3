import React from 'react'
import styles from '../../../css/csMain/CsMain.module.css';
import CsFooter from '../../../components/Footer/CsFooter';
import CsHeader from '../../../components/Header/CsHeader';

function CsBoardDetail() {
    return (
        <div>
            <CsHeader />
            <div className={styles.CsBoardDetail_box_wrapper}>
                <div className={styles.CsBoardDetail_box}>
                    <div className={styles.CsBoardDetail_line}>
                        
                    </div>
                    <div className={styles.CsBoardDetail_qnaBox}>
                        <div className={styles.CsBoardDetail_qnaBox_title}>질문제목</div>
                        <div className={styles.CsBoardDetail_qnaBox_content}>질문내용</div>
                    </div>
                    <div className={styles.CsBoardDetail_answer}>
                    안녕하세요. 릴리뷰입니다.
 
 릴리뷰를 이용해 주셔서 감사합니다.
  
 답변
  
 항상 감사합니다.
 왓챠피디아 드림
                    </div>
                </div>
            </div>
            <CsFooter />
        </div>
    );
}


export default CsBoardDetail;