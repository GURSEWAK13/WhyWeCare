import Home from "../Components/Home/Home.jsx";
import SignInPage from "../Components/SignInPage/SignInPage.jsx";
import RegisterPage from "../Components/register/register.jsx";
import EventsPage from "../Components/Events/Events.jsx"
import { Layout } from "../Layout/Layout.jsx";

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
      
    ],
  },
];