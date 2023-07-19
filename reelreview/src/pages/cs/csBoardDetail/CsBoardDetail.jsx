import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../../css/csMain/CsMain.module.css';
import CsFooter from '../../../components/Footer/CsFooter';
import CsHeader from '../../../components/Header/CsHeader';
import axios from 'axios';

function CsBoardDetail() {

  function getFileNameFromPath(filepath) {
    const parts = filepath.split('/');
    return parts[parts.length - 1];
  }

  const { boardCd } = useParams();
  const [boardData, setBoardData] = useState(null);
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState([]); 
  const [commentValue, setCommentValue] = useState([]); 

  const onSubmitHandler = (e) => {  // 댓글 정보 저장하기
    e.preventDefault();

    const data = new FormData();
    data.append('commentValue', commentValue);
    data.append('boardcd',boardCd);

    axios
      .post('http://localhost:8085/api/board/addComment', data)
      .then((response) => {
        console.log('댓글 데이터 전송 성공');
        // 전송 성공 시, 받아온 댓글 데이터를 상태에 저장
        navigate('/csBoardDetail/' + boardCd);
      })
      .catch((error) => {
        console.log('React-axios: 데이터 전송 실패');
      });
  };

  useEffect(() => {
    fetchData();
  }, [boardCd]);

  const fetchData = () => {   // 게시글 정보 가져오기
    axios
      .get(`http://localhost:8085/api/board/boardList`, { params: { boardCd: boardCd } })
      .then((response) => { 
        setBoardData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('데이터 가져오기 실패');
      });

      axios
      .get(`http://localhost:8085/api/board/commentList`, { params: { boardCd: boardCd } })
      .then((response) => {
        setCommentContent(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('댓글 데이터 가져오기 실패');
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
              <div className={styles.CsBoardDetail_qnaBox_bottom}>
                <div className={styles.CsBoardDetail_qnaBox_img}>
                  {boardData.filepath && (
                    <a href={boardData.filepath} target="_blank" rel="noopener noreferrer">
                      첨부 파일 : {getFileNameFromPath(boardData.filepath)}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          {Array.isArray(commentContent) && commentContent.length > 0 ? (
            <div className={styles.CsBoardDetail_commentBox}>
              {/* Loop through the comments and display each comment */}
              {commentContent.map((comment) => (
                <div key={comment.id}>{comment.commentContent}</div>
              ))}
            </div>
          ) : (
            <div className={styles.CsBoardDetail_commentRequest}>
              {/* Show a message when there are no comments */}
              {commentContent.length === 0 && <div>No comments yet.</div>}
            </div>
          )}
          <div className={styles.CsBoardDetail_answer_bottom}>
            {/* Show the textarea for adding comments only when there are no comments */}
            {Array.isArray(commentContent) && (
              <form onSubmit={onSubmitHandler}>
                {boardData && <input type="hidden" name="boardCd" value={boardData.boardCd} />}
                <textarea
                  name="commentValue"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="댓글을 입력하세요"
                ></textarea>
                <button type="submit">댓글 작성</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <CsFooter />
    </div>
  );
}

export default CsBoardDetail;
