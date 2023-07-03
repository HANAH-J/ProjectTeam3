import { useLocation } from "react-router-dom";
import Detailtop from "../../components/details/Detail_top";
import Detailnum2 from "../../components/details/Detail_num2";
import Header from "../../components/Header/Header";
import styles from '../../css/details/Detail.module.css';
import Detailnum3 from "../../components/details/Detail_num3";
import Detailnum4 from "../../components/details/Detail_num4";

function Details() {
    const location = useLocation();
    const movieCd = location.state.movieCd;
    return(
    <div className={styles.Detail_box}>
        <Header/>   
        <Detailtop movieCd={movieCd.movieCd}/>
        <Detailnum2/>
        <Detailnum3/>
        <Detailnum4/>
    </div>
    );
}


export default Details;
