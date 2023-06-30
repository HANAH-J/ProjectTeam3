import React, { Component } from "react";
import "../../../css/profile/UserProfile2.css";

class UserProfile extends Component { 
//   constructor() { // this state의 유저 정보 초기화
//     this.state = {
//       name: "",
//       profileImg: "",
//       movies: [],
//     };
//   }

//   유저 정보 가져오는 메서드

  render() {
    return (
      <div className="UserProfile">
        <div className="myPageContainer">
          <div className="myPageBg">
            <div className="myPageBgShadow" />
          </div>
          <div className="sectionUser">
            <button className="profileBtn">
              <img alt="profile" src="../../images/userProfile/empty_user.svg" />
            </button>
            <ul>
              <li>
                <h1 className="name">{this.state.name}</h1>
              </li>
              <li>
                <div className="msg">프로필이 없습니다.</div>
              </li>
            </ul>
          </div>
          <div className="ratedMovie">
            <h2>
              <img alt="" src="../../images/userProfile/empty_user.svg" />
              평가한 영화
            </h2>
           {/* 영화 리스트 */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);