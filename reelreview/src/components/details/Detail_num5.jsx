import styles from '../../css/details/Detail_num5.module.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imgs from '../../img/Detail/slide.jpg';
import { useState } from 'react';

function Detailnum5(){
    const [isOver,setIsOver] = useState(false);

    
    const mouseOver = () => {
        setIsOver(true);
    }
    const mouseOut = () => {
        setIsOver(false);
    }


     function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: isOver? "block" : "block" , borderRadius: "50%", transform: "scale(1.5)", right: '25px',zIndex:"9999",top:"132px"}}
                onClick={onClick} 
            >
            </div>
        );
    }
    
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: isOver ? "block":"none", borderRadius: "50%", transform: "scale(1.5)", left: '25px',zIndex:"9999",top:"132px"}}
                onClick={onClick}
            >
            </div>
        );
    }

    const settings = {
        dots : false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
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
    return(
        <div className={styles.wrapper}>
            <div className={styles.topHead}>
                <div>
                    <h2>갤러리</h2>
                </div>
            </div>
            <div className={styles.gallery} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                <Slider {...settings}>
                    <div className={styles.imgBox}>
                        <img src={imgs}></img>
                    </div>
                    <div className={styles.imgBox}>
                        <img src={imgs}></img>
                    </div>
                    <div className={styles.imgBox}>
                      <img src={imgs}></img>
                    </div>
                    <div className={styles.imgBox}>
                        <img src={imgs}></img>
                    </div>
                    <div className={styles.imgBox}>
                        <img src={imgs}></img>
                    </div>
                    <div className={styles.imgBox}>
                        <img src={imgs}></img>
                    </div>
                    <div className={styles.imgBox}>
                        <img src={imgs}></img>
                    </div>
                    <div className={styles.imgBox}>
                        <img src={imgs}></img>
                    </div>
                    <div className={styles.imgBox}>
                        <img src={imgs}></img>
                    </div>
                </Slider>
            </div>

            <div className={styles.topHead}>
                <div>
                    <h2>동영상</h2>
                </div>
            </div>
            <div className={styles.gallery} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                <Slider {...settings}>
                    <div className={styles.movieBox}>
                        <a href='#'>
                        <div className={styles.thumbNail}>
                            <div className={styles.playBtn}></div>
                        </div>
                        <p>영상 설명</p>
                        </a>
                    </div><div className={styles.movieBox}>
                        <a href='#'>
                        <div className={styles.thumbNail}>
                            <div className={styles.playBtn}></div>
                        </div>
                        <p>영상 설명</p>
                        </a>
                    </div><div className={styles.movieBox}>
                        <a href='#'>
                        <div className={styles.thumbNail}>
                            <div className={styles.playBtn}></div>
                        </div>
                        <p>영상 설명</p>
                        </a>
                    </div>
                </Slider>
            </div>
        </div>
    );
}



export default Detailnum5;