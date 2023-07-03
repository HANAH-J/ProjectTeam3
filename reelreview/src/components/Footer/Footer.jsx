import React from 'react'
import "../../css/Footer/Footer.css";


export default function Footer() {
    return (
      <div className='footer-container'>
        <div className="footer-count">
          <span className="footer-span">
            지금까지 <strong>★ 694,499,906 개의 평가가</strong> 쌓였어요.
          </span>
        </div>
        <div className="footer-info">
          <div className="footer-info-left">
            <ul>
              <li className="footerText">
                서비스 이용약관&nbsp; |&nbsp; 개인정보 처리방침 &nbsp;|&nbsp; 회사 안내
              </li>
              <br/><br/>
              <li className="footerText">
                고객센터&nbsp; |&nbsp; cs@reelreview.co.kr, 02-515-9985
              </li>
              <br/>
              <li className="footerText">
                제휴 및 대외 협력 &nbsp;| &nbsp;https://reelreview.team/contact
              </li>
              <br/>
              <li className="footerText">
                주식회사 릴리뷰&nbsp; | &nbsp;서울특별시 서초구 강남대로 343 신덕빌딩 3층
              </li>
              <br/><br/>
              <li className="footerText">
                사업자 등록 번호 123-45-6789
              </li>
              <br/>
              <li className="footerText">
                © 2023 by <strong>Reel Review</strong>, Inc. All rights reserved.
              </li>
            </ul>
          </div>
          <div className="footer-sns">
            <a href="#" className='facebook_logo'></a>
            <a href="#" className='insta_logo'></a>
            <a href="#" className='twitter_logo'></a>
          </div>
        </div>
      </div>
    );
  }