import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import LoginSuccess_header from "../../components/Header/LoginSuccess_header";
import Footer from "../../components/Footer/Footer";
import BoxOffice from "../../components/Main_Body/BoxOffice";
import Upcomming from "../../components/Main_Body/Upcomming"
import ActorMovie from '../../components/Main_Body/ActorMovie';
import DirectorMovie from '../../components/Main_Body/DirectorMovie';
import Genre from '../../components/Main_Body/Genre';
import styles from '../../css/main/Mainpage.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../stores/index.ts';
<<<<<<< Updated upstream

export default function MainPage() {

=======
export default function MainPage() {
>>>>>>> Stashed changes
  const [movieList, setMovieList] = useState([]);
  const [name, setName] = useState('');
  const [mainResponse, setMainResponse] = useState('');
  const [cookies] = useCookies(['token']);
  const { user } = useUserStore();
  const [userCd, setUserCd] = useState(null);
<<<<<<< Updated upstream

  const [userCd, setUserCd] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);

=======
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
>>>>>>> Stashed changes
  // JWT 토큰
  const getMain = async (token: string) => {
    const requestData = {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      }
    };
    await axios.get('http://localhost:8085/userProfiles', requestData)
    .then((response) => {
      const responseData = response.data;
            setUserCd(responseData.userDTO.userCd); //userCd값 설정 -> Modal에서 사용
            const userDTO = {
              userCd: responseData.userDTO.userCd,
              username: responseData.userDTO.username,
              userEmail: responseData.userDTO.userEmail,
              role: responseData.userDTO.role,
              provider: responseData.userDTO.provider,
              providerCd: responseData.userDTO.providerCd,
              createDate: responseData.userDTO.createDate
            };
            const profileDTO = {
              status: responseData.profileDTO.status,
              bgImage: responseData.profileDTO.bgImage,
              pfImage: responseData.profileDTO.pfImage
            };
            setUserData(userDTO);
            setProfileData(profileDTO);
            console.log(userDTO.username + ' is logged in');
    })
    .catch((error) => '');
  }
  useEffect(() => {
    const token = cookies.token;
    if (token) getMain(token);
    else setMainResponse('');
  }, [cookies.token]);
  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // 서버로 보낼 데이터 준비
    const formData = new FormData();
    formData.append('name', name);
    // 데이터 전송
    axios.post("http://localhost:8085/api/directorSearch", formData)
      .then((response) => {
        // 요청에 대한 성공 처리
        console.log(response.data);
        setMovieList(response.data);
        // 받은 데이터에 대한 추가 처리
      })
      .catch((error) => {
        // 요청에 대한 실패 처리
        console.error(error);
      });
  };
  const [movieListActor,setMovieListActor] = useState([]);
  const [name1, setName1] = useState('');
  const handleChange1 = (event) => {
    const { value } = event.target;
    setName1(value);
  };
  const handleSubmit1 = (event) => {
    event.preventDefault();
    // 서버로 보낼 데이터 준비
    const formData = new FormData();
    formData.append('name', name1);
    // 데이터 전송
    axios.post("http://localhost:8085/api/actorSearch", formData)
      .then((response) => {
        // 요청에 대한 성공 처리
        console.log(response.data);
        setMovieListActor(response.data);
        // 받은 데이터에 대한 추가 처리
      })
      .catch((error) => {
        // 요청에 대한 실패 처리
        console.error(error);
      });
  };
  const [movieListGenre,setMovieListGenre] = useState([]);
  const [name2, setName2] = useState('');
  const handleChange2 = (event) => {
    const { value } = event.target;
    setName2(value);
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    // 서버로 보낼 데이터 준비
    const formData = new FormData();
    formData.append('genre', name2);
    // 데이터 전송
    axios.post("http://localhost:8085/api/genreSearch", formData)
      .then((response) => {
        // 요청에 대한 성공 처리
        console.log(response.data);
        setMovieListGenre(response.data);
        // 받은 데이터에 대한 추가 처리
      })
      .catch((error) => {
        // 요청에 대한 실패 처리
        console.error(error);
      });
  };
  return (
    <div className={styles.MainPage_box}>
      {cookies.token ? <LoginSuccess_header profileData={profileData} userData={userData} /> : <Header />}
      <div className={styles.BoxOffice_box_wrapper}>
        <div className={styles.BoxOffice_box}>
          <div className={styles.BoxOffice_box_header}>
            <h3>박스오피스 순위</h3>
          </div>
          <div className={styles.BoxOffice_box_info}>
            <BoxOffice />
          </div>
        </div>
      </div>
      <div className={styles.Upcomming_box_wrapper}>
        <div className={styles.Upcomming_box}>
          <div className={styles.Upcomming_box_header}>
            <h3>개봉예정작</h3>
          </div>
          <div className={styles.Upcomming_box_info}>
            <Upcomming />
          </div>
        </div>
      </div>
      <div className={styles.DirectorMovie_box_wrapper}>
        <div className={styles.DirectorMovie_box}>
          <div className={styles.DirectorMovie_box_header}>
            <h3>이상용 감독 모음</h3>
          </div>
          <div className={styles.DirectorMovie_box_info}>
            <DirectorMovie movieList={movieList} />
          </div>
        </div>
      </div>
      <div className={styles.ActorMovie_box_wrapper}>
        <div className={styles.ActorMovie_box}>
          <div className={styles.ActorMovie_box_header}>
            <h3>Margot Robbie 모음</h3>
          </div>
          <div className={styles.ActorMovie_box_info}>
            <ActorMovie movieListActor={movieListActor} />
          </div>
        </div>
      </div>
      <div className={styles.Genre_box_wrapper}>
        <div className={styles.Genre_box}>
          <div className={styles.Genre_box_header}>
            <h3>요즘 핫한 애니메이션</h3>
          </div>
          <div className={styles.Genre_box_info}>
            <Genre movieListGenre={movieListGenre} />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}