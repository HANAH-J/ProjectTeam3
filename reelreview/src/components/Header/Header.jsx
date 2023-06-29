import React from "react";
import "../../css/Header/Nav.css";

export default function Header() {

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
                            <input type="serach" name="search" placeholder="영화를 검색해보세요."/>
                        </div>
                    </li>
                    <li className="askReel"> 문의하기 </li>
                    <li className="loginBtn"> 로그인 </li>
                    <li><button className="regBtn">회원가입</button></li>
                    {/* 로그인시 유저 프로필 이미지 출력 */}
                </ul>
            </div>
        </nav>

    );


}
