import React from "react";
import "../../css/Header/Nav_Dark.css";

export default function Header_Dark() {

    return (

        <nav className="topNav_Dark">
            <div className="navWrapper_Dark">
                <ul className="leftNav_Dark">
                    <li className="logoSection_Dark">
                        로고들어가는곳
                    </li>
                </ul>

                <ul className="rightNav_Dark">
                    <li className="findMovies_Dark">
                        <div className="findWrapper_Dark">
                            <input type="search" name="search" placeholder="영화를 검색해보세요."/>
                        </div>
                    </li>
                    <li className="askReel_Dark"> 문의하기 </li>
                    <li className="loginBtn_Dark"> 로그인 </li>
                    <li><button className="regBtn_Dark">회원가입</button></li>
                    {/* 로그인시 유저 프로필 이미지 출력 */}
                </ul>
            </div>
        </nav>

    );


}
