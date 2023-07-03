import React from 'react'
import styles from '../../../css/csMain/CsMain.module.css';
import CsFooter from '../../../components/Footer/CsFooter';
import CsHeader from '../../../components/Header/CsHeader';
import { BiChevronLeft } from "react-icons/bi";

function CsQna() {
    return (
        <div>
            <CsHeader />
            <div className={styles.CsQna_box_wrapper}>
                <div className={styles.CsQna_box_body}>
                    <div className={styles.CsQna_box_body_header}>
                        <div><a href="http://localhost:3000/csMain">릴리뷰 문의센터</a></div>
                        <div className={styles.CsQna_box_body_header_icon}><BiChevronLeft /></div>
                        <div>문의 하기</div>
                    </div>
                    <div className={styles.CsQna_box_box_body2}>
                        <div className={styles.CsQna_box_box_body2_header}>문의 등록</div>
                        <div className={styles.CsQna_box_box_body2_header_info}>문의하신 내용은 문의센터에서 확인 후 영업일 기준 1~3일 이내에 답변 드리도록 하겠습니다.<br/>
                        * 운영 시간: 평일 10:00 ~ 18:00 (주말, 공휴일 제외)
                        </div>
                        <div className={styles.CsQna_box_body3}>
                            <div>문의 내용</div>
                            <div className={styles.CsQna_box_body3_info}><textarea name="" id="" cols="80" rows="10" placeholder='문의 내용을 최대한 자세하게 작성해 주세요.
                            - 내용에 욕설이 포함되어 있는 경우 답변이 어려울 수 있는 점 양해 부탁드립니다. -'></textarea></div>
                        </div>
                        <div className={styles.CsQna_box_body4}>
                            <div>답변 등록 시 알림을 받으실 수 있는 이메일 주소를 알려주세요.</div>
                            <div className={styles.CsQna_box_body4_emailInfo}><textarea name="" id="" cols="80" rows="3" placeholder='선택 사항'></textarea></div>
                        </div>
                        <button className={styles.CsQna_button} type='submit'>제출</button>
                    </div>
                </div>
            </div>
            <CsFooter />
        </div>
    );
}


export default CsQna;