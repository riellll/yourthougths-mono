import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import App from "./App.tsx";
import NewPost from "./pages/newpost/page.tsx";
import Profile from "./pages/profile/page.tsx";
import Navbar from "./components/Navbar.tsx";
import Notification from "./pages/notification/page.tsx";
import Logout from "./pages/auth/logout/page.tsx";
import Login from "./pages/auth/login/page.tsx";
import Signup from "./pages/auth/signup/page.tsx";
import PostId from "./pages/post/postId/page.tsx";
import PageNotFound from "./PageNotFound.tsx";
import EditProfile from "./pages/profile/edit/page.tsx";


const Layout: React.FC<{ showNavbar: boolean; children: React.ReactNode }> = ({
  showNavbar,
  children,
}) => (
  <div className="bg-neutral-900 min-h-screen">
    {showNavbar && <Navbar />}
    <div className="px-20">{children}</div>
  </div>
);


const MainContent: React.FC = () => {
  return (
    <Layout showNavbar={true}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="newpost" element={<BorderedWrapper><NewPost /></BorderedWrapper>} />
        <Route path="post/:postId" element={<BorderedWrapper><PostId /></BorderedWrapper>} />
        <Route path="notification" element={<BorderedWrapper><Notification /></BorderedWrapper>} />
        <Route path="profile/:id" element={<BorderedWrapper><Profile /></BorderedWrapper>} />
        <Route path="profile/edit" element={<BorderedWrapper><EditProfile /></BorderedWrapper>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
};


const AuthContent: React.FC = () => {
  return (
    <Layout showNavbar={false}>
      <Routes>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/logout" element={<Logout />} />
        <Route path="auth/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
};


const BorderedWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border-x border-gray-600 md:mx-24 lg:mx-64 p-10">{children}</div>
);


const RootContent: React.FC = () => {
  const location = useLocation();
  const isAuth = location.pathname.startsWith("/auth");

  return isAuth ? <AuthContent /> : <MainContent />;
};


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RootContent />
    </BrowserRouter>
  </StrictMode>
);

export { AuthContent, MainContent, RootContent };
