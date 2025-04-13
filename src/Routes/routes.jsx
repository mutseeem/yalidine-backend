// Routes/Routes.jsx
import LandingPage from "../pages/LandingPage/LandingPage";
import ChapterHomeLayout from "../pages/ChapterHome/ChapterHomeLayout";
import ChapterPage from "../pages/ChapterPage/ChapterPage";
import Overview from "../pages/Overview/Overview";
import Content from "../components/Content/Content";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "chapters",
    element: <ChapterHomeLayout />,
    children: [
      // Overview at top level (not nested under chapterId)
      {
        path: "overview",
        element: <Overview />,
      },
      // Dynamic chapter route with its own children
      {
        path: ":chapterId",
        element: <ChapterPage />,
        children: [
          {
            index: true,
            element: <Content />,
          },
          // Add chapter-specific sub-routes here
          // Example:
          // {
          //   path: "details",
          //   element: <ChapterDetails />,
          // }
        ],
      },
    ],
  },
];

export default routes;