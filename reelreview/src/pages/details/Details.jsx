import { useLocation } from "react-router-dom";
import Detailtop from "../../components/details/Detail_top";
import Detailnum2 from "../../components/details/Detail_num2";
import Header from "../../components/Header/Header";
import styles from '../../css/details/Detail.module.css';
import Detailnum3 from "../../components/details/Detail_num3";
import Detailnum4 from "../../components/details/Detail_num4";
import Detailnum5 from "../../components/details/Detail_num5";
import Detailnum6 from "../../components/details/Detail_num6";
import Footer from "../../components/Footer/Footer";

function Details() {
    const location = useLocation();
    // const movieCd = location.state.movieCd;
    return(
    <div className={styles.Detail_box}>
        <Header/>   
        {/* movieCd={movieCd.movieCd} */}
        <Detailtop/>  
        <Detailnum2/>
        <Detailnum3/>
        <Detailnum4/>
        <Detailnum5/>
        <Detailnum6/>
        <Footer></Footer>
    </div>
    );
}


export default Details;
