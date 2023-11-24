import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '../styles/Myprofile.module.css';
import Gdot from '../components/Gdot';
import StarRating from '../components/StarRating';

import { useRecoilState } from 'recoil';
import { userState } from '../recoil';
import user from '../db/user.json';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BiRightArrowCircle } from 'react-icons/bi';
import Footer from '../components/Footer';
import ModifyProject from '../components/ModifyProject';

import { getTeamIndex, getUserInfo } from '../APIs/userinfo';
import { getTeamInfoByIndex } from '../APIs/team';

import { ThemeModeContext } from '../contexts/ThemeProvider';
import { theme } from '../theme/theme';

import Nav from '../components/Nav';
import ProjectBox from '../components/ProjectBox';

export default function Profile() {
   useEffect(() => {
      document.documentElement.classList.add('profileOnly');
      return () => {
         document.documentElement.classList.remove('profileOnly');
      };
   }, []);

   const [userData, setUsers] = useState([]);
   const [userLogin, setUserLogin] = useRecoilState(userState);
   const [teamLength, setTeamLength] = useState(0);
   const [responseArray, setResponseArray] = useState([]);
   const navigate = useNavigate();
   const userIndex = userLogin.user_index;
   console.log(userIndex);

   const [skill, setSkill] = useState([]); //스킬 선택 값 불러오기

   let [pagenation, setPagenation] = useState([]);

   // 팀 인덱스들을 담은 배열. 안에 객체 형태로 {team_index : 팀 인덱스 번호}가 존재한다.
   const [team, setTeam] = useState([]);

   // 현재 해당 유저가 진행하는 프로젝트 정보를 담은 배열.
   const [array, setArray] = useState([]);

   // 위의 array 배열에 중복 문제가 발생해, 중복 문제를 제거한 배열.
   const [filteredArray, setFilteredArray] = useState([]);
   console.log(filteredArray);
   // 원래는 field에 단순히 필드 정보만 있었는데, field_index가 추가된 object 형태가 되어 오류가 발생했었음.
   const [field, setField] = useState([]); //관심분야 선택 값 불러오기

   const [job, setJob] = useState();

   const [skills, setSkills] = useState([]); //스킬 선택 값 불러오기
   const [userProfileIdx, setUserProfileIdx] = useState();

   const requestURL = `${window.baseURL}`;

   const logout = () => {
      // window.localStorage.clear();
      window.localStorage.removeItem('recoil-persist');

      setUserLogin(null);
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'auto' });
   };

   useEffect(() => {
      getUserInfo(userIndex)
         .then(function (res) {
            setUsers(res.data[0]);
            setField(res.data[0].team_index);
            setUserProfileIdx(res.data[0].user_img_index);
            setSkills(res.data[0].fields);
            setJob(res.data[0].user_job);
            console.log(res.data);
         })
         .catch(function (error) {
            console.log('데이터가 없어서 그래요!!' + error);
         });
   }, []);
   const [teamDetail, setTeamDetail] = useState();

   // 팀 인덱스들 배열로 가져오는 함수.
   const getTeamIndices = async () => {
      try {
         const res = await getTeamIndex(userIndex);
         setTeam(res.data);
         console.log(res);
      } catch (error) {
         console.log(error);
      }
   };

   const fetchData = async () => {
      for (let i = 0; i < team.length; i++) {
         // 팀인덱스 가져오는건 잘 됨
         try {
            const response = await getTeamInfoByIndex(team[i].team_index);
            setArray((cur) => {
               return [...cur, response.data];
            });
            console.log(response.data);
            console.log(array);
         } catch (error) {
            console.error(error);
         }
      }
   };

   useEffect(() => {
      getTeamIndices();
      console.log('속한 팀 인덱스 받아오기');
   }, []);

   useEffect(() => {
      if (team.length !== 0) {
         fetchData();
      }
   }, [team]);

   // 중복문제 제거 배열 설정.
   useEffect(() => {
      console.log(filteredArray);
      console.log(array);

      setFilteredArray(
         array.filter((team, idx) => {
            return idx === array.findIndex((obj) => obj.teamInfo.team_index === team.teamInfo.team_index);
         })
      );
      console.log(filteredArray);
   }, [array]);

   const [expanded, setExpanded] = useState(false);

   const toggleExpansion = () => {
      setExpanded(!expanded);
   };

   const introEx = ['안녕하세요! 저는 김서연입니다. 저와 함께 프로젝트 할 멋진 팀을 기다려요! 챗 주세요^^ '];

   const { themeMode, toggleTheme } = useContext(ThemeModeContext);
   const [tm, setTm] = useState(theme.lightTheme.profile);
   // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
   useEffect(() => {
      if (themeMode === 'light') setTm(theme.lightTheme.profile);
      else setTm(theme.darkTheme.profile);
   }, [themeMode]);

   const careerInfo = [
      {
         career: 'LF 몰 Champion BPU 사업부 소속 디자이너',
         date: '2023. 07 ~ 현재',
         status: '재직중',
      },
      {
         career: 'ABCDEFGH 디자인 팀 인턴',
         date: '2022. 12 ~ 2023. 06',
         status: '6개월',
      },
      {
         career: 'Abcdefg 디자인 팀 웹디자이너',
         date: '2021. 03 ~ 2022. 03',
         status: '1년 1개월',
      },
   ];

   const parts2 = {
      marginRight: '5px',
      width: 'fit-content',
      paddingLeft: '10px',
      paddingRight: '10px',
      height: '19px',
      backgroundColor: '#7090B0',
      borderRadius: '60px',
      color: 'white',
      fontSize: '11px',
      textAlign: 'center',
      paddingTop: '2px',
   };

   const part2Wrap = {
      display: 'inlineBlock',
      marginLeft: '30px',
      marginTop: '20px',
   };

   const lit = {};

   const dot3 = {
      display: 'inline-block',
      marginTop: '5px',
      marginRight: '16px',
      backgroundColor: '#E1ECF6',
      borderRadius: '100px',
      width: '13.34px',
      height: '13.34px',
      display: 'inline-block',
   };

   return (
      <section className={styles.contain}>
         <Nav />

         <div className={styles.wrap}>
            <button
               className={styles.profileManageBtn}
               onClick={() => {
                  navigate('/createmyprofile');
                  window.scrollTo({ top: 0, behavior: 'auto' });
               }}
            >
               프로필 수정
            </button>
            <div className={styles.profileTop}>
               <div className={styles.profileInfo}>
                  <img
                     src={`/public_assets/profileImg/profileImg_${userProfileIdx ? userProfileIdx : 1}.png`}
                     className={styles.profileImage}
                     alt="profile"
                  />

                  <div className={styles.nameContainer}>
                     <p className={styles.name} style={{ color: tm.mainTextColor }}>
                        {userData.user_name}
                     </p>
                     <div className={styles.texts}>
                        {userData.user_introduction === null ? (
                           <p className={styles.limit}>자기소개를 입력해보아요!</p>
                        ) : (
                           <p className={styles.limit}>{userData.user_introduction}</p>
                        )}
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.grayLine}></div>

            <div className={styles.introductionWrap}>
               {introEx &&
                  introEx.map((intro, index) => {
                     return (
                        <div key={index} className={styles.introduction}>
                           <p className={styles.intro} style={{ color: tm.mainTextColor }}>
                              {' '}
                              나는 이런 인재입니다! 👉🏻
                           </p>
                           <p className={styles.introData} style={{ color: tm.subTextColor }}>
                              {intro}
                           </p>
                        </div>
                     );
                  })}
            </div>
            <div className={styles.grayLine}></div>

            <div className={styles.careerInfoWrap}>
               <p className={styles.careerText} style={{ color: tm.mainTextColor }}>
                  경력사항 🏢
               </p>
               <div className={styles.careerCol}>
                  {careerInfo.map((career, index) => {
                     return (
                        <div
                           key={index}
                           className={styles.careerBox}
                           style={{ background: tm.txtBoxBackground, boxShadow: tm.boxShadow }}
                        >
                           <p className={styles.careerData} style={{ color: tm.mainTextColor }}>
                              {career.career}
                           </p>
                           <div className={styles.careerBoxInner}>
                              <p className={styles.careerDate}>{career.date}</p>
                              <p
                                 className={`${
                                    career.status === '재직중' ? styles.careerStatusTrue : styles.careerStatus
                                 }`}
                              >
                                 {career.status}
                              </p>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>

            <div className={styles.grayLine}></div>

            <div className={styles.careerInfoWrap}>
               <p className={styles.careerText} style={{ color: tm.mainTextColor }}>
                  {' '}
                  사용스킬 ⚒️
               </p>
               <div className={styles.skillRow}>
                  {skills &&
                     skills.map((skill, index) => {
                        return (
                           <img
                              key={index}
                              src={`${process.env.PUBLIC_URL}/public_assets/skills/skill_img_${skill.field_index}.svg`}
                              width="40px"
                              height="40px"
                              className={styles.skillImg}
                              alt={`${skill.field_title} skill`}
                           />
                        );
                     })}
               </div>
            </div>

            <div className={styles.grayLine}></div>

            <div className={styles.careerInfoWrap}>
               <p className={styles.careerText} style={{ color: tm.mainTextColor }}>
                  {' '}
                  프로젝트 ⚙️
               </p>
               <div className={styles.skillRow}>
                  {filteredArray.length !== 0 ? (
                     filteredArray.map((teamDetail, index) => {
                        return (
                           <ProjectBox
                              projectName={teamDetail.teamInfo.team_project_name}
                              isRecruiting={teamDetail.teamInfo.team_recruting}
                              views={teamDetail.teamInfo.team_views}
                              introduction={teamDetail.teamInfo.team_introduction}
                              teamIndex={teamDetail.teamInfo.team_index}
                              numOfMembers={teamDetail.numOfPeople.team_cnt}
                              skills={teamDetail.teamInfo.team_skills}
                              categories={teamDetail.teamInfo.team_category}
                              jobs={teamDetail.teamInfo.team_jobs}
                           />
                        );
                     })
                  ) : (
                     // <div></div>
                     <div className={styles.projectBox}>
                        <a href="/createproject">
                           <div className={styles.emptyProject}>
                              진행중인 프로젝트가 없어요. 프로젝트를 시작해 보아요!
                           </div>
                        </a>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <Footer />
      </section>
   );
}
