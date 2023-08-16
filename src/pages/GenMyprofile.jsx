import React, { useState, useEffect } from "react";
import styles2 from "../styles/GenMyprofile.module.css";
import styles from "../styles/modules/CreateProject.module.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import OnLogModal from "../components/OnLogModal";
import Dot from "../components/Dot";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import { useNavigate } from "react-router-dom";
import {
  getUserInfo,
  putUserCareer,
  putUserIntroduction,
  putUserInterest,
  getUserInterested,
  putUserImg,
} from "../APIs/userinfo";
import Nav from "../components/Nav";
import ImageSelector from "../components/ImgSelectModal";

export default function CreateProject() {
  const requestURL = `${window.baseURL}`;

  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [addinter, setAddInter] = useState([]);
  const [interestIndex, setInterestIndex] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIdx = userLogin.user_index;

  const [selectedValue, setSelectedValue] = useState(); //경력 선택 값
  const [text, setText] = useState(); //자기소개
  const [job, setJob] = useState([]); //직무 선택 값 불러오기
  const [skill, setSkill] = useState([]); //스킬 선택 값 불러오기
  const [userProfileIdx, setUserProfileIdx] = useState();

  let [array, setArray] = useState([]);

  const [selectedOption1, setSelectedOption1] = useState(0);

  const [selectedIndex1, setSelectedIndex1] = useState(""); // 선택한 옵션의 index 값을 저장할 상태 변수

  const [plans, setPlans] = useState([]);

  const selectedValue1 = plans[selectedOption1];

  useEffect(() => {
    getUserInfo(userIdx)
    .then(function (res) {
      const myArray = Object.values(res.data);
      setUsers(myArray[0]);
      setUserProfileIdx(myArray[0].user_img_index);

      console.log(job);

        setLoading(false);

        console.log(job);

        setSelectedValue(myArray[3]);
        setText(myArray[2]);
        // const interestArray = userData.map((item) => item.fields); // 관심분야만 따로 배열로 빼두기
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const rerendering = () => {
    getUserInfo(userIdx)
      .then(function (res) {
        const myArray = Object.values(res.data);
        setUsers(myArray[0]);
        setUserProfileIdx(myArray[0].user_img_index);
        putUserImg(userIdx, userProfileIdx);
        console.log(job);

// useEffect(()=>{
//   setPlans(res.data[0].fields);

// })
const rerendering = () => {
  getUserInfo(userIdx)
    .then(function (res) {
      const myArray = Object.values(res.data);
      setUsers(myArray[0]);
      setUserProfileIdx(myArray[0].user_img_index);
      putUserImg(userIdx,userProfileIdx);
      console.log(job);
        setLoading(false);

        console.log(job);

        setSelectedValue(myArray[3]);
        setText(myArray[2]);
        // const interestArray = userData.map((item) => item.fields); // 관심분야만 따로 배열로 빼두기
        const interestArray = userData.fields;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOption1Change = (event) => {
    setSelectedOption1(event.target.value);
    console.log(event.target.value);
    const selectedIndex = event.target.value; // 선택한 옵션의 index 값
    setSelectedIndex1(selectedIndex);
    let num = parseInt(selectedIndex); // 정수로 변환
    // postData(num);
    let len = job.length;
    console.log(job.length);
    if (len < 6) {
      dbJob(num);

      getUserInfo(userIdx)
        .then(function (res) {
          const myArray = Object.values(res.data);
          setJob(res.data[0].fields); // 관심분야 따로 job 배열에 담기
          setLoading(false);
          console.log(job);
        })
        .catch(function (error) {
          console.log(error);
        });

      getUserInfo(userIdx)
        .then(function (res) {
          const myArray = Object.values(res.data);
          setJob(myArray[0].fields); // 관심분야 따로 job 배열에 담기
          setLoading(false);
          console.log(job);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("관심 분야는 최대 6개까지 선택 가능합니다!");
    }
  };

  const navigate = useNavigate();

  const onClickButton = () => {
    setIsOpen(true);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // 선택한 값을 상태 변수에 저장
    const career = event.target.value;
    dbCareer(career);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    const txt = event.target.value;
    dbIntro(txt);
  };

  useEffect(() => {
    getUserInterested()
      .then((response) => {
        // 요청이 성공한 경우
        setPlans(response.data[0].fields);
        console.log(data);

      })
      .catch((error) => {
        // 요청이 실패한 경우
        console.error(error);
      });
  }, []);

  // const getInterests = async() => { //전체 관심분야, 직무 받아오기
  const handleDelete = (index) => {
    //직무 삭제하기
    const updatedItems = [...job];
    updatedItems.splice(index, 1);
    setJob(updatedItems);
  };

  const blockScroll = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "16px";
    document.body.style.backgroundColor = "white";
  };

  const freeScroll = () => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0px";

    // 다크모드와 화이트모드 다르게 설정 필요
    document.body.style.backgroundColor = "#111111";
  };

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const openSignInModal = () => {
    setSignInModalOpen(true);
    blockScroll();
  };
  const closeSignInModal = () => {
    setSignInModalOpen(false);
    freeScroll();
  };

  // 회원가입창 팝업 관리 state
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
    blockScroll();
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
    freeScroll();
  };
  const handleButtonClick = () => {
    window.location.href = "/myprofile";
  };

  const userIndex = userData[0];

  const profileSave = () => {
    window.location.href = "/";
  };

  for (let i = 0; i < interests.length; i++) {
    if (interests[i].title === selectedValue1) {
      let interIndex = interests[i].index;
    }
  }

  //직무 db 저장
  const dbJob = (jobIndex) => {
    putUserInterest(userIdx, jobIndex)
      .then(function () {
        console.log("직무 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //경력 저장
  const dbCareer = (career) => {
    putUserCareer(userIdx, career)
      .then(function () {
        console.log("경력 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //자기소개 저장
  const dbIntro = (intro) => {
    putUserIntroduction(userIdx, intro)
      .then(function () {
        console.log("자기소개 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleImageChange = (userIdx, userProfileIdx) => {
    putUserImg(userIdx, userProfileIdx)
      .then(function () {
        console.log("유저 프로필 이미지 저장 성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    handleImageChange(userIdx, userProfileIdx);
    setUserProfileIdx(userProfileIdx);
    // putUserImg(userIndex,userImg);
    console.log("userProfileIdx가 변경되었습니다:", userProfileIdx);
  }, [userProfileIdx]); // userProfileIdx가 변경될 때만 useEffect 내부 코드 실행

  const load = {
    color: "white",
  };

  const jobBox = {
    display: "flex",
    flexDirection: "row",
    gap: "3px",
  };

  const option = {
    width: "300px",
    fontSize: "18px",
    borderRadius: "20px",
    padding: "10px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
  };
  const option2 = {
    width: "600px",
    height: "200px",
    fontSize: "18px",
    borderRadius: "20px",
    padding: "10px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
  };

  const option3 = {
    display: "flex",
    width: "150px",
    flexDirection: "row",
    gap: "20px",
  };

  const option4 = {
    display: "flex",
    height: "30px",
    flexDirection: "row",
    gap: "20px",
  };
  const jobselect = {
    color: "white",
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  };
  const txts = {
    color: "white",
  };

  const profileImgCss = {
    width: "300px",
    height: "300px",
    borderRadius: "30px",
    objectFit: "cover", // 이미지를 너비와 높이에 맞게 크롭하여 채우기
  };
  return (
    <>
      <Nav />
      <img src="/public_assets/VP.png" alt="darkModeBg" className={styles.VP} />
      <section className={styles.paddingSection}>
        <h1 className={styles.title}>{userData.user_name} 님 안녕하세요!</h1>

        <div className={styles.profileImg}>
          <span className={styles2.wrapper}>
            <img
              style={profileImgCss}
              src={`/public_assets/profileImg/profileImg_${userProfileIdx}.png`}
            />
            <span onClick={rerendering}>
              <ImageSelector />
            </span>
            {/* <p className={styles2.imgtxt} onClick={handleImageChange}>
              이미지 교체하기
            </p> */}
          </span>
        </div>

        <div className={styles2.name}>
          <div className={styles2.careearSelectWrapper}>
            <span className={styles2.middleFont}>경력</span>
            <div className={styles2.n}></div>
            <select
              style={option}
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">선택하세요</option>
              {/* 1부터 10까지의 선택지 생성 */}
              {Array.from({ length: 10 }, (_, index) => (
                <option style={option} key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            {/* <p>선택한 값: {selectedValue.result}</p> */}
          </div>
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>자기소개</span>
          <div className={styles2.n}></div>
          <textarea style={option2} value={text} onChange={handleTextChange} />
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>관심 분야</span>
          {loading ? (
            <div style={jobselect}>
              <p style={load}>Loading...</p>
            </div>
          ) : (
            <div style={jobselect}>
              {job &&
                job.map((item, index) => (
                  <div key={index} style={jobBox}>
                    <span>{item}</span>
                    <button onClick={() => handleDelete(index)}>X</button>
                  </div>
                ))}
            </div>
          )}
          <div className={styles2.n}></div>
          <div style={option4}>
            <select
              style={option3}
              value={selectedOption1}
              onChange={handleOption1Change}
            >
              {plans.map((option, index) => (
                <option key={index} value={option.field_index}>
                  {option.field_title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex w-full justify-center gap-8">
          <button onClick={profileSave} className={styles.changeBtn}>
            수정반영
          </button>
        </div>
      </section>
    </>
  );
}
