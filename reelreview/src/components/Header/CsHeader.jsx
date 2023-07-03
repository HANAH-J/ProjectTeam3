import React, { useState } from "react";
import styles from '../../css/csMain/CsMain.module.css';
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import CsHeaderMenu from "./CsHeader_menu";

export default function CsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.CsMain_header}>
      <div className={styles.CsMain_header_logo_wrapper}>
        <Link to="/mainpage">
          <div className={styles.CsMain_header_logo} />
        </Link>
      </div>
      <div className={styles.CsMain_header_name}>로그인한 이름</div>
      <div className={styles.CsMain_header_menuBar}>
        <button onClick={handleClick}>
          <GiHamburgerMenu style={{ width: '100%', height: '100%' }} />
        </button>
      </div>
      {isMenuOpen && <CsHeaderMenu />}
    </div>
  );
}
