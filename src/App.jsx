import Header from "./components/Header";
import Intro from "./components/Intro";
import Banner from "./components/Banner";
import Actions from "./components/Actions";
import Footer from "./components/Footer";

function App() {
  return(
    <>
      <Header />
      <main className="container">
        <Intro />
        <Banner />
      </main>
      <Footer />
    </>
  );
}
export default App
