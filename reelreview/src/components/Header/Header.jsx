import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/Header/Nav.css";
import styles from '../../css/users/Sign.module.css';
import SignIn from "../../components/users/SignIn";
import SignUp from "../../components/users/SignUp";


export default function Header() {

    // // 로그인, 회원가입 모달창 초기화면 출력 여부 : false
    // const [signInModalState, setSignInModalState] = useState(false);
    // const [signUpModalState, setSignUpModalState] = useState(false);

    // // 로그인, 로그아웃 모달창 상태 변경 함수
    // function signInOnOffModal() {
    //     setSignInModalState(prevState => !prevState);
    // }
    // function signUpOnOffModal() {
    //     setSignUpModalState(prevState => !prevState);
    // }

    // useEffect(() => {
    //     const handleScroll = () => {
    //       const body = document.body;
    //       if (signInModalState || signUpModalState) {
    //         body.style.overflow = "hidden";
    //         body.style.position = "fixed";  // 모달이 열려 있을 때 스크롤 고정
    //       } else {
    //         body.style.overflow = "auto";
    //         body.style.position = "static"; // 모달이 닫혔을 때 스크롤 복원
    //       }
    //     };

    //     handleScroll(); // 페이지 로드 시 스크롤 상태 초기화
    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //       window.removeEventListener("scroll", handleScroll);
    //     };
    //   }, [signInModalState, signUpModalState]);

    //   // 변경 전(0704)
    //   // 로그인, 회원가입 모달창 초기화면 출력 여부 : false
    //     const [signInModalState, setSignInModalState] = useState(false);
    //     const [signUpModalState, setSignUpModalState] = useState(false);

    //     // 로그인 모달창 상태 변경 함수
    //     function signInOnOffModal() {
    //         if (signInModalState === true) {
    //             setSignInModalState(false);
    //         } else {
    //             setSignInModalState(true);
    //         }
    //     }

    //     // 회원가입 모달창 상태 변경 함수
    //     function signUpOnOffModal() {
    //         if (signUpModalState === true) {
    //             setSignUpModalState(false);
    //         } else {
    //             setSignUpModalState(true);
    //         }
    //     }

    // 변경 전(0703)
    // 로그인, 회원가입, 약관 동의 모달창 초기화면 출력 여부 : false
    const [signInModalState, setSignInModalState] = useState(false);
    const [signUpModalState, setSignUpModalState] = useState(false);

    // 로그인, 회원가입 모달창 상태 변경 함수
    const signInOnOffModal = () => {
        setSignInModalState(!signInModalState);
    };
    const signUpOnOffModal = () => {
        setSignUpModalState(!signUpModalState);
    };

    useEffect(() => {
        if (signInModalState || signUpModalState) {
            document.body.style.overflow = "hidden";  // 스크롤 비활성화
        } else {
            document.body.style.overflow = "auto";    // 스크롤 활성화
        }
    }, [signInModalState, signUpModalState]);

    return (

        <nav className="topNav">
            <div className="navWrapper">
                <ul className="leftNav">
                    <Link to="/mainpage"><li className="logoSection" /></Link>
                </ul>

                <ul className="rightNav">
                    <li className="findMovies">
                        <div className="findWrapper">
                            <div className="findWrapper">
                                <input type="search" name="search" placeholder="영화를 검색해보세요." />
                            </div>
                        </div>
                    </li>
                    <Link to="/csMain" className="askReel_box">
                        <li className="askReel"> 문의하기 </li>
                    </Link>
                    <li className="signInBtn" onClick={signInOnOffModal}>로그인</li>
                    {
                        // 로그인 모달창 화면 출력 여부
                        signInModalState ? <SignIn setSignInModalState={setSignInModalState} setSignUpModalState={setSignUpModalState}/> : null
                    }
                    <li><button className="signUpBtn" onClick={signUpOnOffModal}>회원가입</button></li>
                    {
                        /* 로그인시 유저 프로필 이미지 출력 */
                        // 회원가입 모달창 화면 출력 여부
                        signUpModalState ? <SignUp setSignInModalState={setSignInModalState} setSignUpModalState={setSignUpModalState}/> : null
                    }
                </ul>
            </div>
            {signInModalState && <div className={styles.modalBackground_1} style={{ backgroundColor: "black" }} />}
            {signUpModalState && <div className={styles.modalBackground_1} style={{ backgroundColor: "black" }} />}
        </nav>

    );

}