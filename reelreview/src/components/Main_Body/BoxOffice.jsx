import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../css/main/Mainpage.module.css';
import { boxofficeList } from '../../api/Movies/BoxOffice';
import { useNavigate } from 'react-router-dom';
import Details from '../../pages/details/Details';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#ddd", borderRadius: "50%", color: "white", transform: "scale(1.5)" }}
      onClick={onClick}
    >
      <i className="fa fa-angle-right" style={{ color: "black" }}></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#ddd", borderRadius: "50%", color: "white", transform: "scale(1.5)"}}
      onClick={onClick}
    >
      <i className="fa fa-angle-left" style={{ color: "black" }}></i>
    </div>
  );
}

export default function BoxOffice() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const index = 0;

  const navigate = useNavigate();

  const onClickDetailPage = () =>{
    navigate('Details')
  }

  return (
    <Slider {...settings}>
      {boxofficeList.results.map((item, index) => (
        <div className={styles.BoxOffice_mainBox}>
          <div className={styles.BoxOffice_poster} onClick={onClickDetailPage}>
            <span className={styles.BoxOffice_number}>{index + 1}</span>
            <img src={IMG_BASE_URL + item.poster_path} alt="poster" />
          </div>
          <div className={styles.BoxOffice_poster_title}>
            <h3>{item.title}</h3>
          </div>
          <div className={styles.BoxOffice_bottom}>
            <h3>평점 : {item.vote_average}</h3>
            <h3>인기점수 : {item.popularity}</h3>
          </div>
        </div>
      ))}
    </Slider>
  );
}
