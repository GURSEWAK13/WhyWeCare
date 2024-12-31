import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/elements/Header";
import Footer from "../components/elements/Footer";

export function Layout(props) {
  const location = useLocation();

  // Check if the current path is '/auth'
  const isAuthPage = location.pathname === "/auth";

  return (
    <>
      {/* Render Header and Footer only if it's not the /auth route */}
      {!isAuthPage && <Header />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </>
  );
}
