import React from 'react';
import "../../css/Main_BoxOffice/BoxOffice.css";
import { Link } from 'react-router-dom';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

export default function BoxOffice({movieCd,title, poster_path, vote_average, release_date, popularity }) {
    return (
        
        <div className='boxoffice_container'>
            <div className="boxoffice_box_poster">
                <Link to={'/details/'+movieCd} state={{movieCd:movieCd}}><img src={IMG_BASE_URL + poster_path} alt="영화포스터" /></Link>
                <div className="boxoffice_box_info">
                    <div className='boxoffice_box_info_detail'>{title}</div>
                    <div className='boxoffice_box_info_detail'>개봉일 : {release_date}</div>
                    <div className='boxoffice_box_info_detail'>평점 : {vote_average}</div>
                    <div className='boxoffice_box_info_detail'>인기 : {popularity}</div>
                </div>
            </div>
        </div>
    );
}


