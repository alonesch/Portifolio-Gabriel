import Wpp from '../assets/wpp.png';
import Insta from '../assets/insta.png';

function Actions() {
  return (
    <div className="actions">
      <a className="btn" href="https://www.instagram.com/rodrigues_gabriel051/" target="_blank">
        <img src={Insta} alt="Instagram" className="icon" />
        Instagram
      </a>
      <a className="btn" href="https://wa.link/tyi17g" target="_blank">
        <img src={Wpp} alt="WhatsApp" className="icon" />
        WhatsApp
      </a>
    </div>
  );
}

export default Actions;
