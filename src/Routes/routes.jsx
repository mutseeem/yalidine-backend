//Routes/Routes.jsx
import LandingPage from "../pages/LandingPage/LandingPage";
import ChapterHomeLayout from "../pages/ChapterHome/ChapterHomeLayout";
import ChapterPage from "../pages/ChapterPage/ChapterPage";
import Overview from "../pages/Overview/Overview";


const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "chapters",
    element: <ChapterHomeLayout />, // needs to be fixed after this 
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: ":chapterId",
        element: <ChapterPage />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
        ],
      },
    ],
  },
];

export default routes;