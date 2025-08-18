import W from '../assets/partners/W-min.png'
import SPONG from '../assets/partners/SPONG-min.png'
import Stake from '../assets/partners/stake-min.png'
import Kick from '../assets/partners/Kick-min.png'
import Everlast from '../assets/partners/Everlast-min.png'
import Dulcinea from '../assets/partners/Dulcinea-min.png'
import FuegoB from '../assets/partners/Fuego-burger-min.png'
import Honda from '../assets/partners/Honda-min.png'
import Driko from '../assets/partners/Drinko-min.png'
import './partners.css'

const Partners = () => {
    return (
        <>
            <div className="partners-container">
                <div className="partners-section">
                    <h4 className='partners-title'>UN EVENTO DE</h4>
                    <div className="partners-logo">
                        <a className='partners-pic' href="https://www.instagram.com/spoongg.media/" target="_blank" rel="noopener noreferrer">
                            <img src={SPONG} alt="sp" />
                        </a>
                        <a className='partners-pic' href="https://www.instagram.com/westcol/" target="_blank" rel="noopener noreferrer">
                            <img src={W} alt="" />
                        </a>
                    </div>
                </div>
                <div className="partners-section">
                    <h4 className='partners-title'>PATROCINADOR OFICIAL</h4>
                    <div className="partners-logo">
                        <a className='partners-pic' href="https://stake.com.co/es/bienvenida?btag=westcol" target="_blank" rel="noopener ">
                            <img src={Stake} alt="" />
                        </a>
                        <a className='partners-pic' href="https://kick.com/" target="_blank" rel="noopener ">
                            <img src={Kick} alt="sp" />
                        </a>
                    </div>
                </div>
                <div className="partners-section">
                    <h4 className='partners-title'>CON APOYO DE</h4>
                    <div className="partners-logo">
                        <a className='partners-pic' href="https://domicilios.fuegoburger.co/" target="_blank" rel="noopener">
                            <img src={FuegoB} alt="sp" />
                        </a>
                        <a className='partners-pic' href="https://motos.honda.com.co/" target="_blank" rel="noopener">
                            <img src={Honda} alt="sp" />
                        </a>
                        <a className='partners-pic' href="https://www.instagram.com/dulcinea.medellin/" target="_blank" rel="noopener">
                            <img src={Dulcinea} alt="sp" />
                        </a>
                        <a className='partners-pic' href="https://www.instagram.com/drinkomode/" target="_blank" rel="noopener">
                            <img src={Driko} alt="sp" />
                        </a>
                        <a className='partners-pic' href="https://everlast.com.co/" target="_blank" rel="noopener">
                            <img src={Everlast} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Partners;