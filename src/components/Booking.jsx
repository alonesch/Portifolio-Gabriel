import BookingModal from "./BookingModal";
import { useState } from "react";

function Booking() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="booking">
      <h2>Marque seu horário</h2>
      <p>
        Escolha o melhor momento pra cuidar do seu visual — rápido, prático e direto pelo WhatsApp ou Instagram.
      </p>

      <div className="booking-buttons">
        <a
          href="https://wa.link/tyi17g"
          target="_blank"
          rel="noopener noreferrer"
          className="booking-btn"
        >
          <img src="/wpp.png" alt="WhatsApp" className="wpp_logo" />
          WhatsApp
        </a>

        <a
          href="https://www.instagram.com/rodrigues_gabriel051/"
          target="_blank"
          rel="noopener noreferrer"
          className="booking-btn"
        >
          <img src="/insta.png" alt="Instagram" className="insta_logo" />
          Instagram
        </a>

        <button className="booking-btn" onClick={() => setIsModalOpen(true)}>
          <img src="/clock.png" alt="Relógio" className="clock_logo" />
          Agendar
        </button>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default Booking;
