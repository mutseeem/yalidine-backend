// src/Routes/routes.jsx
import LandingPage from "../pages/LandingPage/LandingPage";
import ChapterHomeLayout from "../pages/ChapterHome/ChapterHomeLayout"; // The layout that contains Sidebar/NavBar
import ChapterPage from "../pages/ChapterPage/ChapterPage";
import Overview from "../pages/Overview/Overview";
import ChapterPageInsert from "../pages/ChapterPage/ChapterPageInsert";
import LoginPage from '../pages/Login/LoginPage';
import SignUpPage from '../pages/Login/SignUpPage';
import UnauthorizedPage from '../pages/UnauthorizedPage/UnauthorizedPage';

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    isPublic: true,
  },
  {
    path: "/login",
    element: <LoginPage />,
    isPublic: true,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    isPublic: true,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
    isPublic: true,
  },
  {
   
    path: "chapters", 
    element: <ChapterHomeLayout />, 
    isProtected: true,
    allowedRoles: ['viewer', 'admin', 'guest'], 

    children: [
      {
        path: "overview",
        element: <Overview />,
        isProtectedChild: true, 
        allowedChildRoles: ['admin'], 
      },
      {

        path: "chapter-page-Insert",
        element: <ChapterPageInsert />,
        isProtectedChild: true,
        allowedChildRoles: ['admin'], 
      },
      {
        path: ":chapterId",
        element: <ChapterPage />,

      },
    ],
  },
];

export default routes;