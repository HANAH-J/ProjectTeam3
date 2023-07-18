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
                        <div className={styles.CsBoardDetail_qnaBox_writer}>게시글 작성자</div>
                        <div className={styles.CsBoardDetail_qnaBox_title}>게시글 제목</div>
                        <div className={styles.CsBoardDetail_qnaBox_content}>게시글 내용</div>
                    </div>
                    <div className={styles.CsBoardDetail_answer}>
                        <div className={styles.CsBoardDetail_answer_writer}>답변자</div>
                        <div className={styles.CsBoardDetail_answer_content}>답변내용</div>
                    </div>
                    <div className={styles.CsBoardDetail_answer_bottom}>
                    <form action="/board/addComment" method="post">
                        <input type="hidden" name="boardCd"/>
                        <div className={styles.CsBoardDetail_comment}>
                            <textarea name="commentContent" placeholder="답글을 입력하세요"></textarea>
                        </div>
                        <div className={styles.CsBoardDetail_comment_button}>
                            <button type="submit">답글 남기기</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <CsFooter />
        </div>
    );
}


export default CsBoardDetail;