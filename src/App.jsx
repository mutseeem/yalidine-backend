// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routesConfig from './Routes/routes';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './Routes/ProtectedRoute';


function App() {
  const renderRoutes = (routesArray) => {
    return routesArray.map((route, index) => {
      // If a route is explicitly public, render it directly
      if (route.isPublic) {
        return (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          >
            {route.children && renderRoutes(route.children)}
          </Route>
        );
      }

      // If a route is protected, wrap its content with ProtectedRoute
      if (route.isProtected) {
        return (
          <Route
            key={index}
            path={route.path}
            // The `element` of the parent Route is the ProtectedRoute itself.
            // ProtectedRoute will render an <Outlet /> for its children.
            element={<ProtectedRoute allowedRoles={route.allowedRoles} />}
          >
            {/*
              Children of this Route are what ProtectedRoute's <Outlet /> will render.
              This is where the *actual component* for this path (e.g., ChapterHomeLayout)
              should be, AND its own children.

              We *do not* use 'index' here for the main element if it also has children
              that should be rendered via its own <Outlet>.
            */}
            <Route /* NO index={true} here */ element={route.element}>
              {/* Recursively render children of the route's element (e.g., ChapterHomeLayout's children) */}
              {route.children && route.children.map((childRoute, childIndex) => {
                // Handle nested child protection
                if (childRoute.isProtectedChild) {
                  return (
                    <Route
                      key={`${index}-${childIndex}`}
                      path={childRoute.path}
                      element={<ProtectedRoute allowedRoles={childRoute.allowedChildRoles} />}
                    >
                      {/* The component for the protected child route is its own index element */}
                      <Route index element={childRoute.element} />
                      {/* If a protected child also has children, they'd go here */}
                      {childRoute.children && renderRoutes(childRoute.children)}
                    </Route>
                  );
                }
                // Render regular children of the layout
                return (
                  <Route
                    key={`${index}-${childIndex}`}
                    path={childRoute.path}
                    element={childRoute.element}
                  >
                    {childRoute.children && renderRoutes(childRoute.children)}
                  </Route>
                );
              })}
            </Route>
          </Route>
        );
      }

      // Fallback for any other route definition
      return (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {renderRoutes(routesConfig)}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;