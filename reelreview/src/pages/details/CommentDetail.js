import styles from '../../css/details/CommentDetail.module.css'
import Header from "../../components/Header/Header";
import {FaRegThumbsUp} from "react-icons/fa";
import {ImBubble, ImShare2} from "react-icons/im";
import {AiOutlineDown} from "react-icons/ai";
import {BsThreeDotsVertical} from "react-icons/bs";
import Footer from "../../components/Footer/Footer";
import React from "react";

export default function CommentDetail(){
    return(
        <div className={styles.movieCollection_Wrapper}>
            <Header/>
            <div className={styles.collection_container}>
                <section className={styles.collection_title_container}>
                    <div className={styles.commentTitle}>
                        <div className={styles.cmImgBox}>
                            <div className={styles.cmImg}>

                            </div>
                        </div>
                        <div className={styles.cmName}>강형구</div>
                    </div>
                    <div className={styles.collection_title}>
                        <h1>미션 임파서블: 데드 레코닝 PART ONE</h1>
                        <p>영화 · 2023</p>
                        <div className={styles.commentArea}>오ㅏ 정말 재밌네요 영화관가서 꼭 보시길!!! 너무 너무 재밌게 봣어요 </div>


                        <div className={styles.col_title_bot_small}>
                            <p>좋아요</p><span>500</span>
                            <p>댓글</p><span>400</span>
                        </div>
                        <div className={styles.col_title_button}>
                            <div className={styles.col_title_button_like}>
                                <FaRegThumbsUp className={styles.ThumbsUp}/>
                                <p>좋아요</p>
                            </div>
                            <div className={styles.col_title_button_comment}>
                                <ImBubble className={styles.ThumbsUp}/>
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
                    <div className={styles.ccImgBox}>
                        <div className={styles.ccimg}></div>
                    </div>
                    <div className={styles.ccDetail}>
                        <div className={styles.ccDetailTop}>
                            <div className={styles.ccName}>강형구</div>
                            <div className={styles.ccDate}>5년 전</div>
                        </div>
                        <div className={styles.ccDetailMiddle}>
                            레이드는 레알s급 입니다만..
                        </div>
                        <div className={styles.ccDetailBottom}>
                            <div className={styles.ccBottomLeft}>
                                <FaRegThumbsUp className={styles.ccLike}/>
                                4
                            </div>
                            <div className={styles.ccBottomRight}>
                                <BsThreeDotsVertical className={styles.dots}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.ccnewComment}>

                    <form>
                        <div className={styles.ccInput}>
                            <input type="text" placeholder="컬렉션에 댓글을 남겨보세요"/>
                        </div>
                        <div className={styles.ccButton}>
                            <button type='submit'className={styles.button}>
                                <ImBubble className={styles.bubble}/>
                                등록
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}