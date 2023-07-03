import styles from '../../css/details/Detail_num4.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CommentsCol from './detailnum4Col';

function Detailnum4() {
    return(
        <div className={styles.wrapper}>
            <Container className={styles.topHead}>
                <Col>
                    <h2>코멘트</h2><h3>3000+</h3>
                </Col>
            </Container>

            <Container className={styles.cont}>
                <Row className={styles.colby}>
                    <CommentsCol/>
                    <CommentsCol/>
                    <CommentsCol/>
                    <CommentsCol/>
                </Row>
                <Row>
                    <CommentsCol/>
                    <CommentsCol/>
                    <CommentsCol/>
                    <CommentsCol/>
                </Row>
            </Container>
        </div>
    );
}

export default Detailnum4;