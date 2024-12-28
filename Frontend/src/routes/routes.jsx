import Home from "../Components/Home/Home.jsx";
import SignInPage from "../Components/SignInPage/SignInPage.jsx";
import RegisterPage from "../Components/register/register.jsx";
import EventsPage from "../Components/Events/Events.jsx";
import ServicesPage from "../Components/Services/Services.jsx";
import { Layout } from "../Layout/Layout.jsx";
import AddEventPage from "../Components/Events/AddEvent.jsx";
import VerifyOTP from '../Components/VerifyOTP/VerifyOTP';

export const routes = [
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/signin",
        element: <SignInPage/>,
      },
      {
        path: "/register",
        element: <RegisterPage/>,
      },
      {
        path: "/events",
        element: <EventsPage/>,
      },
      {
        path: "/services",
        element: <ServicesPage/>,
      },
      {
        path: "/add-event",
        element: <AddEventPage/>,
      },
      {
        path: "/verify-otp",
        element: <VerifyOTP />,
      }
    ],
  },
];