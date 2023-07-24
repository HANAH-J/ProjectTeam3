import styles from '../../css/details/CommentDetail.module.css'
import Header from "../../components/Header/Header";
import {FaRegThumbsUp} from "react-icons/fa";
import {ImBubble, ImShare2} from "react-icons/im";
import {BsThreeDotsVertical} from "react-icons/bs";
import Footer from "../../components/Footer/Footer";
import React from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { useCookies } from 'react-cookie';

export default function CommentDetail(props){
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const comment = location.state.comment;
    // const userData = location.state.userData;
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const commentId = comment.commentId;
    const [commentGood,setCommentGood] = useState(comment.commentGood);
    const [loggedIn, setLoggedIn] = useState(false);
    const [cComment,setCcommentData] = useState([]);
    const [cCommentGood,setCCommentGood] = useState(cComment.cCommentGood);
    const commentGoodOneUp = () => {
        axios
          .post("http://localhost:8085/comment/commentGoodUp", {commentId : commentId})
          .then((response) => {
            // 서버로부터 좋아요 갯수를 증가시킨 데이터를 받아와서 comment 상태를 업데이트
            setCommentGood(commentGood+1);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const cCommentGoodOneUp = (cCommentId) => {
        console.log(cCommentId);
        axios
          .post("http://localhost:8085/comment/cCommentGoodUp", {cCommentId : cCommentId})
          .then((response) => {
            // 서버로부터 좋아요 갯수를 증가시킨 데이터를 받아와서 comment 상태를 업데이트
            setCCommentGood(cCommentGood+1);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      // 댓글 영역을 토글하는 함수
      const toggleComment = () => {
        setIsCommentOpen((prevIsCommentOpen) => !prevIsCommentOpen);
      };
      const [hovered, setHovered] = useState(false);
      const [showCommentForm, setShowCommentForm] = useState(false);
      const [commentValue, setCommentValue] = useState('');
      const handleCommentChange = (event) =>{
        setCommentValue(event.target.value);
      }
      const handleCommentSubmit = (event) => {
        event.preventDefault();
        hideModalHandler();
      };
      
      const hideModalHandler = () => {
        setIsCommentOpen(false);
      };

      const sendFormData = () => {
        setShowCommentForm(false);
        console.log(commentValue);
        const token = cookies.token;
        if (token) {
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                  withCredentials: true,
                },
              };
            setLoggedIn(true);
            const data = new URLSearchParams();
            data.append('cCommentContent', commentValue);
            data.append('commentId', comment.commentId);
            axios.post("http://localhost:8085/details/cCommentSave", data,config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setLoggedIn(false);
            console.log('not logged in');
            console.log('token' + token);
            alert('로그인을 해주세요.');
            // 로그인 콘솔 띄우기
        }
      };
      useEffect(()=>{
        axios.get("http://localhost:8085/details/getCcomment",{params:{commentId:commentId}})
        .then((response)=>{
            setCcommentData(response.data);
            console.log(cComment);
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        });
    },[]);

    return(
        <div className={styles.movieCollection_Wrapper}>
            <Header/>
            <div className={styles.collection_container}>
                <section className={styles.collection_title_container}>
                    <div className={styles.commentTitle}>
                        <div className={styles.cmImgBox}>
                            <div className={styles.cmImg}>
                                {comment.PFImage}
                            </div>
                        </div>
                        <div className={styles.cmName}>{comment.userName}</div>
                    </div>
                    <div className={styles.collection_title}>
                        <h1>
                            
                        </h1>
                        <div className={styles.commentArea}>{comment.commentContent}</div>


                        <div className={styles.col_title_bot_small}>
                            <p>좋아요</p><span>{commentGood}</span>
                            <p>댓글</p><span>{comment.cCommentcount}</span>
                        </div>
                        <div className={styles.col_title_button}>
                            <div className={styles.col_title_button_like} onClick={commentGoodOneUp}>
                                <FaRegThumbsUp className={styles.ThumbsUp}/>
                                <p>좋아요</p>
                            </div>
                            <div className={styles.col_title_button_comment} onClick={toggleComment}>
                                {/* 댓글 아이콘 클릭 시 댓글 영역 토글 */}
                                <ImBubble className={styles.ThumbsUp} />
                                <p>댓글</p>
                            </div>
                            <div className={styles.col_title_button_sns}>
                                <ImShare2 className={styles.ThumbsUp}/>
                                <p>공유</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <div className={styles.comments}>
                    <h1>댓글</h1>
                </div>
                <div className={styles.commentcommentBox}>
                    {cComment &&(
                        cComment.map((item,index)=>{
                            return(
                            <React.Fragment key={index}>
                            <div className={styles.ccImgBox}>
                              <div className={styles.ccimg}></div>
                            </div>
                            <div className={styles.ccDetail}>
                              <div className={styles.ccDetailTop}>
                                <div className={styles.ccName}>{item.userName}</div>
                                <div className={styles.ccDate}>5년 전</div>
                              </div>
                              <div className={styles.ccDetailMiddle}>
                                {item.cCommentContent}
                              </div>
                              <div className={styles.ccDetailBottom}>
                                <div className={styles.ccBottomLeft}>
                                  <FaRegThumbsUp className={styles.ccLike} />
                                  {item.cCommentId}
                                  {cCommentGood}
                                </div>
                                <div className={styles.ccBottomRight}>
                                  <BsThreeDotsVertical className={styles.dots} />
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        )})
                        
                    )}
                    
                </div>
            </div>
            <Footer></Footer>
            {isCommentOpen &&(
                     
                     <div className={styles.modalWrapper}>
                       <div className={styles.modal}>
                       <div onClick={hideModalHandler} className={styles.closeButton}>
                                 <AiOutlineClose/>
                       </div>
                         <div className={styles.modalContent}>
                           <form onSubmit={handleCommentSubmit}>
                             <textarea
                               value={commentValue}
                               onChange={handleCommentChange}
                               rows={4}
                               cols={50}
                             />
                             <div className={styles.submitButtonContainer}>
                               
                               <button type="submit" className={styles.submitButton} onClick={sendFormData}>
                                 작성하기
                               </button>
                             </div>
                           </form>
                         </div>
                       </div>
                     </div>
             )}
        </div>
    )
}