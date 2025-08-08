import './header.css';
import bgVideo from '../assets/vid/playback.webm';
import bgVideoAlt from '../assets/vid/playback.mp4';
import SF4 from '../assets/svg/sf4.svg';
import Stake from '../assets/svg/stake.svg'
import Kick from '../assets/svg/kick-logo.svg'

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
            BOGOTÁ <span>|</span>
            <a href="https://maps.app.goo.gl/z6PTXYKcfWGWX9y4A" target="_blank" rel="noopener">COLISEO MEDPLUS</a>
          </div>
        </div>

        <div className="logo-section">
          <img src={SF4} alt="Event Logo" className="logo" />
        </div>

        <div className="event-streaming">
          <a href="https://kick.com/westcol" target="_blank" rel="noopener">
            kick.com/westcol
          </a>
        </div>

        <div className="event-info-bottom">
          <a href="https://stake.com.co/es/bienvenida?btag=westcol" target="_blank" rel="noopener">
            <img src={Stake} alt="stake logo" />
          </a>
          <span>x</span>
          <a href="https://kick.com/westcol" target="_blank" rel="noopener">
            <img src={Kick} alt="kick logo" />
          </a>
        </div>

        <div className="event-info-left">
          
        </div>

        {/*<div className="event-info-right"></div> */}

      </div>
    </header>
  );
};

export default Header;