import React, { useContext, useEffect, useState } from "react";
import Dot from "../components/Dot";
import styles from "../styles/Home.module.css";
import FilteredItem from "../components/FilteredItem";
import ProjectLists from "../components/ProjectLists";
import Slider from "../components/Slider";
import Stories from "../components/Stories";
import View from "../components/View";
import { UserInfoContext } from "../contexts/UserInfoProvider";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import OnLogModal from "../components/OnLogModal";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const { userInfo, userInfoSet } = useContext(UserInfoContext);
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();
  const room = "forum";

  const forumClick = () => {
    if (user) {
      const url = `https://www.app.vpspace.net/?email=${encodeURIComponent(
        user.email
      )}&&room=${encodeURIComponent(room)}`;

      window.location.href = url;
    }
  };

  const LogClickAlert = () => {
    alert("로그인을 해주세요!");
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

  // 로그인창 팝업 관리 state
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

  // max-width가 필요한 굿엔 maxWidth 클래스명을 적용해 주면 됨.
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }

  // 우측 상단의 모집중 필터 버튼.
  const [recruitmentBtnActive, setRecruitmentBtnActive] = useState(true);

  // 필터링된 아이템을 관리하는 state.
  const [filteredItems, setFilteredItems] = useState([]);

  // const navigate = useNavigate();

  // 기획/개발/디자인/기타 등,
  // 추후에 db에서 가져 옴. 현재는 임시로 설정해 둠.
  const [filter, setFilter] = useState([
    ["개발 기획", "서비스 기획", "프로덕트 기획", "영업 기획"],
    [
      "프론트엔드",
      "백엔드",
      "머신러닝",
      "AI 개발",
      "QA 엔진",
      "IOS 개발",
      "Android 개발",
    ],
    ["UX 디자인", "UI 디자인", "프로덕트 디자인", "편집 디자인"],
    ["일렉 기타", "어쿠스틱 기타", "클래식 기타"],
  ]);
  const [filterNum, setFilterNum] = useState(0);
  const handleFilterChange = (filterNumber) => {
    setFilterNum(filterNumber);
  };

  const deleteFilterItems = (text) => {
    setFilteredItems((arr) => arr.filter((data) => data !== text));
  };

  // 필터를 누르면
  // 1) 해당 필터가 이미 활성화(버튼의 색깔로 판단) => filteredItems에서 해당 필터 제거
  // 2) 해당 필터가 비활성화 => filteredItems에 해당 필터 추가
  function handleFilterClick(e) {
    if (e.target.style.backgroundColor === "rgb(112, 144, 176)") {
      deleteFilterItems(e.target.innerText);
    } else setFilteredItems((arr) => [...arr, e.target.innerText]);
  }
  // filteredItems가 변경되었을 때, 혹은 filterNum이 변경되어 보여지는 filter가 변경되었을 때
  // filter들의 색깔을 정해주기 위해 querySelector로 모두 가져온 후, filteredItems에 해당 필터가 존재한다면 버튼 색깔 활성화, 아니면 비활성화해 줌.
  useEffect(() => {
    const filters = document.querySelectorAll(".filters");
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      if (filteredItems.includes(filter.innerText)) {
        filter.style.backgroundColor = "rgba(112, 144, 176, 1)";
      } else {
        filter.style.backgroundColor = "rgba(112, 144, 176, 0.25)";
      }
    }
  }, [filteredItems, filterNum]);

  const handleButtonClick = () => {
    window.location.href = "/myprofile";
  };
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(true);
  };
  // let why = JSON.parse(localStorage.getItem("recoil-persist"));
  // let st = Object.values(why)[0];
  // let test = Object.values(st)[0];
  console.log(user);
  // const pattern = /(['"])(.*?)\1/g;
  // const matches = str.match(pattern);

  useEffect(() => {
    if (user) {
      //   if ( user.email === 'test') {
      //   setUser(null);
      //   window.localStorage.clear();
      // }
    }
    // if (user.email ===)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SignInModal
        open={signInModalOpen}
        close={closeSignInModal}
        openSignUpModal={openSignUpModal}
      ></SignInModal>
      <SignUpModal
        open={signUpModalOpen}
        close={closeSignUpModal}
      ></SignUpModal>
      <section>
        <div>
          <nav className={styles.navbar}>
            <span
              className={styles.navLink}
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "auto" });
              }}
            >
              Home
            </span>
            {user ? (
              <button
                className={styles.loginModal}
                onClick={() => {
                  onClickButton();
                }}
              >
                {isOpen && (
                  <OnLogModal
                    open={isOpen}
                    onClose={() => {
                      setIsOpen(false);
                    }}
                  />
                )}
                <img
                  src="/public_assets/profileImg.png"
                  width="44"
                  height="44"
                  alt="profile"
                />
                <img src="/public_assets/modal.png" alt="profile" />
              </button>
            ) : (
              <button className={styles.loginButton} onClick={openSignInModal}>
                <span>Login</span>
                <Dot />
              </button>
            )}

            {user ? (
              <button onClick={handleButtonClick} className={styles.navLink}>
                Profile
              </button>
            ) : (
              <button onClick={LogClickAlert}>Profile</button>
            )}
          </nav>

          <img
            src="/public_assets/darkmodeBg.png"
            alt="darkModeBg"
            className={styles.bg}
          />
        </div>

        {/* 이미지 크기 이슈 해결 후 추가 예정 */}
        <div className="relative">
          <img
            src="/public_assets/VP.png"
            alt="darkModeBg"
            className={styles.VP}
          />
        </div>

        <div className={styles.container}>
          <button onClick={forumClick}>
            <div className={styles.imageContainer}>
              <h1 className={styles.letsJoin}>Let's Join</h1>
              <img
                className={`${styles.image}`}
                // src="https://via.placeholder.com/783x600.jpg"
                src="/public_assets/todayHot.png"
                alt="예시 이미지"
              />
            </div>
          </button>
          <div className={styles.wrapper} onClick={handleClick}>
            <Dot />
            <p className={styles.tHot}>Office</p>
            <p className={styles.hotName}>대공간 포럼</p>
            <View />
            <hr />
          </div>

          <img
            src={`${process.env.PUBLIC_URL}/public_assets/vector.png`}
            className={styles.vector}
            alt="Views"
          />
        </div>
        <section className="maxWidth">
          <div className={styles.projectTitle}>
            <Dot />
            <h3>Map</h3>
          </div>
          <Slider />
        </section>
      </section>
      <section className="maxWidth">
        <div className={styles.projectTitle}>
          <Dot />
          {/* <h3 id="specificSection">Project</h3> */}
          <h3>Project</h3>
        </div>
        <div className={styles.navBar}>
          <div className={styles.menus}>
            <div
              className={`${styles.menu} ${filterNum === 0 && "text-white"}`}
              onClick={() => {
                handleFilterChange(0);
              }}
            >
              기획
            </div>
            <div
              className={`${styles.menu} ${filterNum === 1 && "text-white"}`}
              onClick={() => {
                handleFilterChange(1);
              }}
            >
              개발
            </div>
            <div
              className={`${styles.menu} ${filterNum === 2 && "text-white"}`}
              onClick={() => {
                handleFilterChange(2);
              }}
            >
              디자인
            </div>
            <div
              className={`${styles.menu} ${filterNum === 3 && "text-white"}`}
              onClick={() => {
                handleFilterChange(3);
              }}
            >
              기타
            </div>
          </div>
          <div className={styles.isRecruiting}>
            <div
              className={`${styles.toggleBtn} ${
                recruitmentBtnActive && styles.active
              }`}
              onClick={() => {
                setRecruitmentBtnActive(!recruitmentBtnActive);
              }}
            >
              <div
                className={`${styles.toggleDot} ${
                  recruitmentBtnActive && styles.active
                }`}
              ></div>
            </div>
            <div className={styles.mozipzoong}>모집중</div>
          </div>
        </div>

        {/* 필터 선택 탭 */}
        <div className={styles.filterBox}>
          <div className={styles.filterFlex}>
            {filter &&
              filter[filterNum].map((item) => (
                <div onClick={handleFilterClick} className="filters">
                  {item}
                </div>
              ))}
          </div>

          {/* 선택된 필터들 */}
          <div className={styles.filteredItems}>
            {filteredItems.length !== 0 && <img src="/Vector.png" alt="꼬깔" />}
            {filteredItems.map((filteredItem) => {
              return (
                <FilteredItem
                  filterName={filteredItem}
                  deleteFilterItems={deleteFilterItems}
                />
              );
            })}
          </div>
        </div>
        <ProjectLists recruitmentBtnActive={recruitmentBtnActive} />
      </section>
      <section className="mt-10 xl:mt-44 maxWidth">
        <div className={styles.projectTitle}>
          <Dot />
          <h3>Story</h3>
        </div>
        <Stories />
      </section>
      <Footer />
    </>
  );
}
