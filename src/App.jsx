import Footer from "./Components/Footer";
import Hompage from "./Components/Homepage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-5 py-10">
        {/* Your page content */}
        <Hompage />
      </main>
      
      <Footer />
    </>
  );
}

export default App;