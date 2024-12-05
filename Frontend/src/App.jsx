import Header from "./Components/Header";
import Hero from "./Components/Hero";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Hero/>
    </main>
    {/* <Footer /> */}
  </div>
  )
}