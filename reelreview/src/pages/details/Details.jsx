import { useLocation } from "react-router-dom";
import Detail_top from "../../components/details/Detail_top";
import Detail_num2 from "../../components/details/Detail_num2";
import Header from "../../components/Header/Header";
import styles from '../../css/details/Detail.module.css';


function Details() {
    const location = useLocation();
    const movieCd = location.state.movieCd;
    return(
    <div className={styles.Detail_box}>
        <Header/>   
        <Detail_top movieCd={movieCd.movieCd}/>
        <Detail_num2/>
    </div>
    );
}


export default Details;
