import Wpp from '../assets/Wpp.png';
import Insta from '../assets/Insta.png'
function Actions() {
    

    return (

  <div className="actions">
      <a class="btn" href="https://www.instagram.com/rodrigues_gabriel051/" target="_blank">
          <img src={Insta} alt="Instagram" className="icon" />
          Instagram
      </a>
      <a class="btn" href="https://wa.link/tyi17g" target="_blank">
          <img src={Wpp} alt="WhatsApp" className="icon" />
          WhatsApp
      </a>

    </div>
    );
}

export default Actions;