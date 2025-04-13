// Routes/Routes.jsx
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
    element: <ChapterHomeLayout />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      // Change this to match your data structure
      {
        path: ":reference",  // Changed from :chapterId to :reference
        element: <ChapterPage />,
        children: [
          {
            index: true,
            element: <LandingPage />, // You might want to change this to a chapter-specific component
          },
        ],
      },
    ],
  },
];

export default routes;