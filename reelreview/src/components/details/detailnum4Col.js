import Col from 'react-bootstrap/Col';
import styles from '../../css/details/Detail_num4.module.css';
import { Image } from 'react-bootstrap';
import imgs from '../../img/Detail/people.jpg';
import { RiStarSFill } from "react-icons/ri";
import { FaThumbsUp } from "react-icons/fa";
import { ImBubble } from "react-icons/im";



function CommentsCol() {
    return(
        <Col>
            <div className={styles.card}>
                <div className={styles.cardTop}>
                    <div className={styles.cardTopInner}>
                        <div className={styles.cardTopLeft}>
                            <Image src={imgs} className={styles.cardImg} roundedCircle/>
                                <p>아이디?픞로필</p>
                        </div>
                        <div className={styles.cardTopRight}>
                            <div className={styles.cardStars}>
                                <RiStarSFill size={20} className={styles.stars}/>
                                <p>3.5</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cardMiddle}>
                    <div className={styles.comment}>
                        <p>
                            수채화 같기도 하면서 살아 숨쉬는 동화.
                            <br/><br/>
                            가슴 따뜻한 이야기, 완성도 높은 비주얼과 의미 있는 메시지, 남녀노소를 사로잡는 유머가 존재한다. 때문에 영화의 전반적인 분위기와 성격이 굉장히 차분하면서도 아기자기하며, 어린이의 눈높이에 맞춰져 있는 듯 하지만 분명한 건 이 작품 역시 어른들을 위한 동화라는 것.
                        </p>
                    </div>  
                </div>
                <div className={styles.cardBottom}>
                    <span><FaThumbsUp size={14}/></span>
                    <p>1654</p>
                    <span><ImBubble/></span>
                    <p>50</p>
                </div>
            </div>
        </Col>
    )
}

export default CommentsCol;