import Header from "./Components/Header";
import Hero from "./Components/Hero";
import ServicesSection from "./Components/ServicesSection";
import Footer from "./Components/Footer";
import DonationPage from "./Components/DonationPage"
import SignInPage from "./Components/SignInPage/SignInPage"
import EventsPage from "./Components/Events/Events";
import RegisterPage from "./Components/register/register";
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      {/* <Hero/>
      <ServicesSection/> */}
      {/* <DonationPage/> */}
      {/* <SignInPage/> */}
      <EventsPage/>
      {/* <RegisterPage/> */}
    </main>
    <Footer/>
  </div>
  )
}