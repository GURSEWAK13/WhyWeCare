import { Navigate, useLocation } from "react-router-dom";
import Home from "../components/Home.jsx";
import EventsPage from "../components/Pages/Events/Events.jsx";
import { Layout } from "../Layout/Layout.jsx";
import Auth from "../components/Pages/Authantication/Auth.jsx";
import UserList from "../components/Pages/Users.jsx";
import DonationPage from "../components/Pages/Donate.jsx";
import DonationPageTemp from "../components/Pages/DonationPage.jsx";
import TermsAndConditions from "../components/Pages/TermsAndConditions.jsx";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwt");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export const routes = [
  {
    path: "/",
    element: <Layout />,  // This Layout will apply for routes other than /auth
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,  // No layout here for /auth
      },
      {
        path: "/events",
        element: (
          <ProtectedRoute>
            <EventsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <UserList/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/donate",
        element: (
          <ProtectedRoute>
            <DonationPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/termsAndConditions",
        element: (
          <ProtectedRoute>
            <TermsAndConditions/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/donationPage",
        element: (
          <ProtectedRoute>
            <DonationPageTemp/>
          </ProtectedRoute>
        ),
      },
    ],
  },
];
