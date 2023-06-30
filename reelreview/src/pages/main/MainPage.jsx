import React from 'react'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BoxOffice from "../../components/Main_Body/BoxOffice";
import { boxofficeList } from '../../api/Movies/BoxOffice';
import "../../css/Main_BoxOffice/BoxOffice.css";

export default function MainPage(){

    return(

        <div className='MainPage_box'>
            <Header/>
            <div className="boxoffice_box">
                <div className="boxoffice_box_header">
                    <h3>박스오피스 순위</h3>
                </div>
                <div className="boxoffice_box_2">
                {boxofficeList.results.map((item) => {
          return (
            <BoxOffice
              movieCd={item.id}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
              release_date={item.release_date}
              popularity={item.popularity}
            />
          );
        })}
        </div>
        </div>
          <Footer/>
        </div>
    )
}