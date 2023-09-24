import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserInfoProvider from "./contexts/UserInfoProvider";
import Myprofile from "./pages/Myprofile";
import { RecoilRoot } from "recoil";
import ToDo from "./pages/ToDo";
import Board from "./components/Board";
import ProjectManagerTools from "./pages/ProjectManagerTools";
import Mycalendar from "./pages/Mycalendar";
import CreateProject from "./pages/CreateProject";
import GenMyprofile from "./pages/GenMyprofile";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Download from "./pages/Download";
import PostIt from "./components/StickerNote";
import StickerNote from "./components/StickerNote";
import ProjectListsPage from "./pages/ProjectListsPage";
import ProjectMain from "./components/ProjectMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserInfoProvider>
        <GoogleReCaptchaProvider reCaptchaKey="6LcqNDAmAAAAAKR81rlDOgBrUSXVBQAGLK8iI_Hr">
          <Home />
        </GoogleReCaptchaProvider>
      </UserInfoProvider>
    ),
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/myprofile",
    element: <Myprofile />,
  },
  {
    path: "/createproject",
    element: <CreateProject />,
  },
  {
    path: "/createmyprofile",
    element: <GenMyprofile />,
  },
  {
    path: "/projectlists",
    element: <ProjectListsPage />,
  },
  {
    path: "/projectmanagertools/:teamIndex",
    element: <ProjectManagerTools />,
    children: [
      {
        index: true,
        element: <Board />,
      },
      { path: "board", element: <Board /> },
      {
        path: "mycalendar",
        element: <Mycalendar />,
      },
      {
        path: "stickerNote",
        element: <StickerNote />,
      },
      {
        path: "main",
        element: <ProjectMain />,
      },
    ],
  },
  {
    path: "/download",
    element: <Download />,
  },
]);

function App() {
  window.baseURL = "https://app.vpspace.net/";

  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;
