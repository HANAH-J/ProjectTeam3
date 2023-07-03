import React, { useState, useEffect } from "react";
import "../../css/Header/Nav.css";
import styles from "../../css/users/Sign.module.css";
import SignIn from "../../components/users/SignIn";
import SignUp from "../../components/users/SignUp";
import { Link } from "react-router-dom";

export default function Header() {

    // 로그인, 회원가입, 약관 동의 모달창 초기화면 출력 여부 : false
    const [signInModalState, setSignInModalState] = useState(false);
    const [signUpModalState, setSignUpModalState] = useState(false);
    const [termsModalState, setTermsModalState] = useState(false);

    // 로그인 모달창 상태 변경 함수
    const signInOnOffModal = () => {
        setSignInModalState(!signInModalState);
    };

    // 회원가입 모달창 상태 변경 함수
    const signUpOnOffModal = () => {
        setSignUpModalState(!signUpModalState);
    };

    // 약관동의 모달창 상태 변경 함수
    const termsOnOffModal = () => {
        setTermsModalState(!termsModalState);
    };

    useEffect(() => {
        if (signInModalState || signUpModalState || termsModalState) {
          document.body.style.overflow = "hidden";  // 스크롤 비활성화
          document.body.style.position = "fixed";   // 위치 고정
        } else {
          document.body.style.overflow = "auto";    // 스크롤 활성화
          document.body.style.position = "static";  // 위치 원래대로
        }
      }, [signInModalState, signUpModalState, termsModalState]);

    return (

        <nav className="topNav">
            <div className="navWrapper">
                <ul className="leftNav">
                    <Link to="/mainpage"><li className="logoSection" /></Link>
                </ul>

                <ul className="rightNav">
                    <li className="findMovies">
                        <div className="findWrapper">
                            <input type="search" name="search" placeholder="영화를 검색해보세요." />
                        </div>
                    </li>
                    <Link to="/csMain" className="askReel_box">
                        <li className="askReel"> 문의하기 </li>
                    </Link>
                    <li className="signInBtn" onClick={signInOnOffModal}>로그인</li>
                    {
                        // 로그인 모달창 화면 출력 여부 삼항연산
                        signInModalState ? <SignIn setSignInModalState={setSignInModalState} /> : null
                    }
                    <li><button className="signUpBtn" onClick={signUpOnOffModal}>회원가입</button></li>
                    {
                        /* 로그인시 유저 프로필 이미지 출력 */
                        // 회원가입 모달창 화면 출력 여부 삼항연산
                        signUpModalState ? <SignUp setSignUpModalState={setSignUpModalState} /> : null
                    }
                </ul>
            </div>

            {signInModalState && (
                <div className={styles.modalBackground} style={{ backgroundColor: "black" }}>
                </div>
            )}
            {signUpModalState && (
                <div className={styles.modalBackground} style={{ backgroundColor: "black" }}>
                </div>
            )}
            {termsModalState && (
                <div className={styles.modalBackground} style={{ backgroundColor: "black" }}>
                </div>
            )}
        </nav>

    );

}