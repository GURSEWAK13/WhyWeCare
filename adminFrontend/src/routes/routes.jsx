import Home from "../components/Home.jsx";
// import SignInPage from "../Components/SignInPage/SignInPage.jsx";
// import RegisterPage from "../Components/register/register.jsx";
import EventsPage from "../components/Events/Events.jsx";
// import ServicesPage from "../Components/Services/Services.jsx";
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
        path: "/events",
        element: <EventsPage/>,
      },
      
    ],
  },
];