import React from 'react'
import styles from '../../../css/csMain/CsMain.module.css';
import CsFooter from '../../../components/Footer/CsFooter';
import CsHeader from '../../../components/Header/CsHeader';

function CsBoard() {
    return (
        <div>
            <CsHeader />
            <div className={styles.CsBoard_box_wrapper}>
                <div className={styles.CsBoard_line}>
                <div className={styles.CsBoard_box}>
                        <div className={styles.CsBoard_header1}>문의 내역</div>
                        <div className={styles.CsBoard_header2}>문의하신 내용은 문의센터에서 확인 후 영업일 기준 1~3일 이내에 답변 드리도록 하겠습니다.<br/>
                        * 운영 시간: 평일 10:00 ~ 18:00 (주말, 공휴일 제외)
                        </div>
                        <div className={styles.CsBoard_table_box}>
                            <table>
                            <thead>
                                <tr>
                                    <th>글번호</th>
                                    <th>제목</th>
                                    <th>작성일</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr>
                                        <td className={styles.CsBoard_table_box_title}>2</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className={styles.CsBoard_table_box_title}>1</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CsFooter />
        </div>
    );
}


export default CsBoard;