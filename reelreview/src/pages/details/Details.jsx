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
import { useEffect,useState } from "react";
import axios from "axios";


function Details() {
    let [movieData, setMovieData] = useState(null);
    const location = useLocation();
    const {item} = location.state;
    console.log(item);
    useEffect(()=>{
        const movieId = item.movieId;
        console.log(movieId);
        axios.get("http://localhost:8085/api/getMovieFulldata",{params:{movieId:movieId}}).then((response)=>
        {
            setMovieData(response.data);
            console.log(movieData);
        }).catch((error)=>{console.log(error)})
    },[item.movieId]);
    

    return(
    
    <div className={styles.Detail_box}>
        <Header/>   
        {movieData?(<>
        <Detailtop item ={item} movieData={movieData}/>  
        <Detailnum2 item ={item} movieData={movieData}/>
        <Detailnum3 item ={item} movieData={movieData}/>
        <Detailnum4 item ={item} movieData={movieData}/>
        <Detailnum5 item ={item} movieData={movieData}/>
        <Detailnum6 item ={item} movieData={movieData}/>
        </>):(<></>)}
        <Footer></Footer>
    </div>
   
    );
}


export default Details;
