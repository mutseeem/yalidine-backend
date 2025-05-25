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
    // This defines the main branch for all "chapters" related pages.
    // ChapterHomeLayout acts as the container/layout for all its children.
    // The protection for this route means that anyone accessing any child path
    // under /chapters will first go through this protection.
    path: "chapters", // Base path for all chapter-related content
    element: <ChapterHomeLayout />, // This is the layout that renders the sidebar
    isProtected: true,
    // This allows VIEWER, ADMIN, and GUEST to enter the /chapters layout context.
    // Specific pages *within* this layout will have their own, potentially stricter, role checks.
    allowedRoles: ['viewer', 'admin', 'guest'], // Broad access to the layout wrapper

    children: [
      {
        // /chapters/overview
        // This route is now a child of 'chapters'.
        // Its protection will be handled by a nested ProtectedRoute.
        path: "overview",
        element: <Overview />,
        // NEW: Nested protection for Overview (Admin only)
        // This will create a <ProtectedRoute> INSIDE the <ChapterHomeLayout>
        // for this specific child route.
        isProtectedChild: true, // Custom flag to indicate it's a child that needs protection
        allowedChildRoles: ['admin'], // Only admin for overview
      },
      {
        // /chapters/chapter-page-Insert
        // This route is also now a child of 'chapters'.
        path: "chapter-page-Insert",
        element: <ChapterPageInsert />,
        // NEW: Nested protection for Insert page (Admin only)
        isProtectedChild: true,
        allowedChildRoles: ['admin'], // Only admin for insert
      },
      {
        // /chapters/:chapterId
        // This route is also now a child of 'chapters'.
        // It uses the default broad access of its parent layout.
        path: ":chapterId",
        element: <ChapterPage />,
        // No specific `isProtectedChild` needed here if it inherits parent roles.
        // If it needed *stricter* rules than `viewer/admin/guest` (e.g. only 'admin'),
        // you'd add `isProtectedChild` and `allowedChildRoles` here too.
      },
    ],
  },
  // REMOVED the separate top-level definitions for:
  // "chapters/overview"
  // "chapters/chapter-page-Insert"
  // "chapters/:chapterId"
  // They are now children of the "chapters" route.
];

export default routes;