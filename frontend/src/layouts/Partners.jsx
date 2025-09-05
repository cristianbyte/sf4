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
        <div className="partners">
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
                <div className="footer">
                    <div className="footer-content">

                        <div className="footer-main">
                            <p>© 2024 Stream Fighters 4 - Propuesta de Diseño</p>

                            <div className="footer-social">
                                <a
                                    href="https://www.instagram.com/stream_fighters/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    @stream_fighters
                                </a>
                            </div>
                        <div className="footer-disclaimer">
                            <p><strong>AVISO:</strong> Este es un sitio web conceptual y no oficial. Es una propuesta de diseño para fines demostrativos.</p>
                        </div>
                        </div>

                        <div className="footer-links">
                            <a href="/TERMS.md">Términos y Condiciones</a>
                            <a href="/PRIVACY.md">Política de Privacidad</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Partners;