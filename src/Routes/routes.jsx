import LandingPage from "../pages/LandingPage/LandingPage";
import ChapterHomeLayout from "../pages/ChapterHome/ChapterHomeLayout"; // Renamed for clarity
import Content from "../components/Content/Content"; // Import your content component
import Overview from "../pages/Overview/Overview"; // Import your overview component

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/chapter-home",
    element: <ChapterHomeLayout />,
    children: [
      {
        index: true,
        element: <Content />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      // Add other chapter-home sub-routes here
    ]
  },
];

export default routes;