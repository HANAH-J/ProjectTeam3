import styles from '../../css/details/Detail_num3.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';
import imgs from '../../img/Detail/people.jpg';




function Detailnum3(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.people}>

                <Container className={styles.topHead}>
                    <h2>출연/제작</h2>
                </Container>
                <Container className={styles.cont}>
                    <Row className={styles.people1}>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                    </Row>
                    <Row className={styles.people2}>
                    <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                    </Row>
                    <Row className={styles.people3}>
                    <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                        <Col className={styles.people1_1}>
                            <a href='#' className={styles.people_link}>
                                <div className={styles.people_img}>
                                    <Image src={imgs} className={styles.people_img_img} rounded/>
                                </div>
                                <div className={styles.people_details}>
                                    <h5>마동석</h5>
                                    <p>성우 | 버니 루멘</p>
                                </div>
                            </a>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        </div>
    );
}


export default Detailnum3;