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
    
    const location = useLocation();
    const {item} = location.state;
    let [movieImages, setMovieImages] = useState([]);
    useEffect(()=>{
        const movieId = item.movieId;
        console.log(movieId);
    axios.get("http://localhost:8085/api/getMovieImages",{params:{movieId:movieId}}).then((response)=>
    {
      setMovieImages(response.data);
      console.log(response.data);
    }).catch((error)=>{console.log(error)})
    },[]);

    

    return(
    <div className={styles.Detail_box}>
        <Header/>   
        <Detailtop item ={item} movieImages={movieImages}/>  
        <Detailnum2 item ={item}/>
        <Detailnum3 item ={item}/>
        <Detailnum4 item ={item}/>
        <Detailnum5 item ={item}/>
        <Detailnum6 item ={item}/>
        <Footer></Footer>
    </div>
    );
}


export default Details;
