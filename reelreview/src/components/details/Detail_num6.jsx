import styles from '../../css/details/Detail_num6.module.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import CollectionBoxes from './smallComponents/colBoxes';
import imgs from '../../img/Detail/poster.jpg';
import Num6_similar_col from './smallComponents/num6_similar_col';

function Detailnum6(){
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
        slidesToShow: 8,
        slidesToScroll: 8,
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
                    <h2>이 작품이 담긴 컬렉션</h2><h3>997</h3>
                </div>
            </div>
            <div className={styles.gallery} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                <Slider {...settings}>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>
                    <CollectionBoxes/>

                </Slider>
            </div>

            <div className={styles.topHead}>
                <div>
                    <h2>비슷한 작품</h2>
                </div>
            </div>
            <div className={styles.similar}>
                <div className={styles.similar_row}>
                    <Num6_similar_col/>
                    <Num6_similar_col/>
                    <Num6_similar_col/>
                    <Num6_similar_col/>
                    <Num6_similar_col/>
                    <Num6_similar_col/>
                </div>
            </div>
        </div>
    );
}



export default Detailnum6;