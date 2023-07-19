import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../../css/csMain/CsMain.module.css';
import CsFooter from '../../../components/Footer/CsFooter';
import CsHeader from '../../../components/Header/CsHeader';
import axios from 'axios';

function CsBoardDetail() {
  const { boardCd } = useParams();
  const [boardData, setBoardData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [boardCd]); // boardCd가 변경될 때마다 fetchData 호출

  const fetchData = () => {
    axios
      .get(`http://localhost:8085/api/board/boardList`, { params: { boardCd: boardCd } })
      .then((response) => {
        setBoardData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('데이터 전송 실패');
      });
  };

  return (
    <div>
      <CsHeader />
      <div className={styles.CsBoardDetail_box_wrapper}>
        <div className={styles.CsBoardDetail_box}>
          <div className={styles.CsBoardDetail_line}></div>
          {boardData && (
            <div className={styles.CsBoardDetail_qnaBox}>
              <div className={styles.CsBoardDetail_qnaBox_title}>{boardData.title}</div>
              <div className={styles.CsBoardDetail_qnaBox_content}>{boardData.content}</div>
              {boardData.filepath && <img src={boardData.filepath} alt="첨부 이미지" />}
              {boardData.boardCd && (
                <a href={`/board/delete?boardCd=${boardData.boardCd}`}>글삭제</a>
              )}
              {boardData.boardCd && (
                <a href={`/board/modify/${boardData.boardCd}`}>수정</a>
              )}
            </div>
          )}
          <div className={styles.CsBoardDetail_answer_bottom}>
            <form action="/board/addComment" method="post">
              {boardData && (
                <input type="hidden" name="boardCd" value={boardData.boardCd} />
              )}
              <textarea name="commentContent" placeholder="댓글을 입력하세요"></textarea>
              <button type="submit">댓글 남기기</button>
            </form>
          </div>
        </div>
      </div>
      <CsFooter />
    </div>
  );
}

export default CsBoardDetail;