//Routes/Routes.jsx
import LandingPage from "../pages/LandingPage/LandingPage";
import ChapterHomeLayout from "../pages/ChapterHome/ChapterHomeLayout";
import ChapterPage from "../pages/ChapterPage/ChapterPage"; 
import Overview from "../pages/Overview/Overview";
import ChapterPageInsert from "../pages/ChapterPage/ChapterPageInsert";


const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "chapters",
    element: <ChapterHomeLayout />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "chapter-page-Insert", //
        element: <ChapterPageInsert />,
      },
      {
        path: ":chapterId", 
        element: <ChapterPage />,
 
      },
    ],
  },
];

export default routes;