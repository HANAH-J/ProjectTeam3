import React, { useState , useEffect} from "react";
import styles from '../../css/csMain/CsMain.module.css';
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import CsHeaderMenu from "./CsHeader_menu";
import { useCookies } from 'react-cookie';

export default function CsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [cookies] = useCookies(['token']);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // 쿠키에서 토큰 정보 가져오기
    const token = cookies.token;

    // 토큰이 있다면 토큰 안의 유저 이름을 가져와서 설정
    if (token) {
      const { username } = token;
      setUserName(username);
    } else {
      // 토큰이 없다면 기본적으로 표시할 이름 설정 (ex: '로그인한 이름 없음')
      setUserName('로그인한 이름 없음');
    }
  }, [cookies.token]);

  return (
    <div className={styles.CsMain_header}>
      <div className={styles.CsMain_header_logo_wrapper}>
        <Link to="/mainpage">
          <div className={styles.CsMain_header_logo} />
        </Link>
      </div>
      <div className={styles.CsMain_header_name}>{userName}</div>
      <div className={styles.CsMain_header_menuBar}>
        <button onClick={handleClick}>
          <GiHamburgerMenu style={{ width: '100%', height: '100%' }} />
        </button>
      </div>
      {isMenuOpen && <CsHeaderMenu />}
    </div>
  );
}
