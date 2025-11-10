import Header from "../components/Header";
import Intro from "../components/Intro";
import Gallery from "../components/Gallery";
import Booking from "../components/Booking";
import Branding from "../components/Branding";
import Banner from "../components/Banner";
import MusicPlayer from "../components/MusicPlayer";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <MusicPlayer />
      <Header />
      <main className="main-layout">
        <div className="container" id="inicio">
          <Intro />
          <Banner />
        </div>

        <section id="galeria">
          <Gallery />
        </section>

        <section id="agendamento">
          <Booking />
        </section>

        <Branding />
      </main>
      <Footer />
    </>
  );
}

export default Home;
