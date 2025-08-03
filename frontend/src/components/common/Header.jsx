// Import video assets - primary (webm) and fallback (mp4)
import bgVideo from '../../assets/vid/playback.webm';
import bgVideoAlt from '../../assets/vid/playback.mp4';
import SF4 from '../../assets/svg/sf4.svg';
import Stake from '../../assets/svg/stake.svg'
import Kick from '../../assets/svg/kick-logo.svg'

import './header.css';

const Header = () => {
  return (
    <header className="header-container">
      <video className="video-bg" autoPlay muted loop playsInline >
        <source src={bgVideo} type="video/webm" />
        <source src={bgVideoAlt} type="video/mp4" />
        Your browser does not support video playback.
      </video>

      <div className="content-overlay">

        <div className="event-info-top">
          <div className="event-date">
            18 OCTUBRE
          </div>
          <div className="event-info">
            BOGOTÁ <span>|</span> COLISEO MEDPLUS
          </div>
        </div>

        <div className="logo-section">
          <img src={SF4} alt="Event Logo" className="logo" />
        </div>

        <div className="event-info-bottom">
          <img src={Stake} alt="stake logo" /> 
          <span>x</span>
          <img src={Kick} alt="kick logo" />
        </div>

        {/* <div className="event-info-left"></div>

        <div className="event-info-right"></div> */}

      </div>
    </header>
  );
};

export default Header;