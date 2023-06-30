import React, { useState } from "react";
import "../../css/Header/Nav.css";
import "../../css/users/Sign.module.css";
import SignIn from "../../components/users/SignIn";
import SignUp from "../../components/users/SignUp";

export default function Header() {

    // 로그인 모달창 초기화면 노출 여부 : false
    const [signInModalState, setSignInModalState] = useState(false);

    // 회원가입 모달창 초기화면 노출 여부 : false
    const [signUpModalState, setSignUpModalState] = useState(false);

    // 로그인 모달창 상태 변경 함수
    function signInOnOffModal() {
        if (signInModalState === true) {
            setSignInModalState(false);
        } else {
            setSignInModalState(true);
        }
    }

    // 회원가입 모달창 상태 변경 함수
    function signUpOnOffModal() {
        if (signUpModalState === true) {
            setSignUpModalState(false);
        } else {
            setSignUpModalState(true);
        }
    }

    return (

        <nav className="topNav">
            <div className="navWrapper">
                <ul className="leftNav">
                    <li className="logoSection">
                        로고들어가는곳
                    </li>
                </ul>

                <ul className="rightNav">
                    <li className="findMovies">
                        <div className="findWrapper">
                            <input type="search" name="search" placeholder="영화를 검색해보세요." />
                        </div>
                    </li>
                    <li className="askReel"> 문의하기 </li>
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
        </nav>

    );

}