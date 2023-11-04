export const lightTheme = {
  home: {
    mainTextColor: "#000",
    hazyTextColor: "#7C7C7C",
    accentColor: "rgb(12, 110, 237)",
    disabledBtnBgColor: "rgba(112, 144, 176, 0.25)",
    borderColor: "#B3B3B3",
    contentTextColor: "#949494",
    footerTextColor: "#7090B0",
    bannerBg: "#F2F3F4",
    buttonText: "#FFF",
    storyBg: "#FFF",
    footerBg: "#F4F6F8",
    modalBg: "#FFF",
    modalHover: "rgba(244, 246, 248, 0.70)",
  },
  projectManager: {
    projectSide: "",
    projectBg: "",
    projectRoutingBox: "#181a1c",
    background: "#000",
    progress: "black",
  },
  createProject: {
    inputBg: "#F1F3F7",
    bg: "#FFF",
    textColor: "#000",
    border: "#7C7C7C",
    createBtn: "#0C6EED",
    cancelBtn: "#6D758F",
    btnText: "#FFF",
  },
  board: {
    whenModalBg: "rgba(105, 105, 105, 0.8)",
    modalBg: "rgb(50,50,50)",
    inputTextColor: "rgba(255, 255, 255, 0.5)",
  },
  profile: {
    mainTextColor: "black",
  },
  management: {
    border: "#7C7C7C",
    textColor: "#FFF",
    accentColor: "#0C6EED",
    inputColor: "#323232",
    cancelBtn: "#9B9B9B",
  },
  nav: {
    navBg: "#FFF",
  },
};

export const darkTheme = {
  home: {
    mainTextColor: "#FFF",

    // 하단은 현재 라이트 모드. 다크로 이후에 전환되어야 함.
    hazyTextColor: "#7C7C7C",
    accentColor: "rgb(12, 110, 237)",
    disabledBtnBgColor: "rgba(112, 144, 176, 0.25)",
    borderColor: "#B3B3B3",
    contentTextColor: "#949494",
    footerTextColor: "#c9c9c9",
    bannerBg: "#F2F3F4",
    buttonText: "#FFF",
    storyBg: "rgba(255, 255, 255, 0.2)",
    footerBg: "#1c1d1e",
    modalBg: "#FFF",
    modalHover: "rgba(244, 246, 248, 0.70)",
  },

  projectManager: {
    projectSide: "#2D2D2D",
    projectBg: "",
    projectRoutingBox: "#181a1c",
    background: "#1c1d1e",
    progress: "black",
  },
  createProject: {
    inputBg: "#FFF",
    bg: "#1C1D1E",
    textColor: "#FFFFFF",
    border: "#7C7C7C",
    createBtn: "#0C6EED",
    cancelBtn: "#6D758F",
    btnText: "#FFF",
  },
  profile: {
    mainTextColor: "white",
  },
  board: {
    whenModalBg: "rgba(105, 105, 105, 0.8)",
    modalBg: "rgb(50,50,50)",
    inputTextColor: "rgba(255, 255, 255, 0.5)",
  },
  management: {
    border: "#7C7C7C",
    textColor: "#FFF",
    accentColor: "#0C6EED",
    inputColor: "#323232",
    cancelBtn: "#9B9B9B",
  },
};

export const theme = {
  lightTheme,
  darkTheme,
};
