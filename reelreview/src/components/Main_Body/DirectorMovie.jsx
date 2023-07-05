import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../css/main/Mainpage.module.css';
import { directormovieList } from '../../api/Movies/DirectorMovie'; 

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
            style={{ ...style, display: "block", background: "#ddd", borderRadius: "50%", color: "white", transform: "scale(1.5)" }}
            onClick={onClick}
        >
            <i className="fa fa-angle-left" style={{ color: "black" }}></i>
        </div>
    );
}

export default function DirectorMovie() {

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

    return (
        <Slider {...settings}>
            {directormovieList.peopleInfoResult.peopleInfo.filmos.map((item) => (
                <div className={styles.DirectorMovie_mainBox}>
                    <div className={styles.DirectorMovie_poster}>
                        <img src={item.moviePoster} alt="poster" />
                    </div>
                    <div className={styles.DirectorMovie_poster_title}>
                        <h3>{item.movieNm}</h3>
                    </div>
                    
                </div>
            ))}
        </Slider>
    )
}