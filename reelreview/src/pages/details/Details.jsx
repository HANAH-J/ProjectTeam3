import { useLocation } from "react-router-dom";
import Detail_top from "../../components/details/Detail_top";
import Header from "../../components/Header/Header";

function Details() {
    const location = useLocation();
    const movieCd = location.state.movieCd;
    return(
    <div className="Detail_box">
        <Header/>   
        <Detail_top movieCd={movieCd.movieCd}/>
    </div>
    );
}


export default Details;
