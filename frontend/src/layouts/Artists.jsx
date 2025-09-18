import Cosculluela from '../assets/images/Cosculluela-pose.png'
import NJ from '../assets/images/NJ-pose.png'
import FK from '../assets/images/FK-pose.png'
import './artists.css'

const Artist = () => {
    return (
        <div className="artist-container">
            <h2 className="artists-title shine-low">
                Artistas Invitados
            </h2>
            <div className="artist" id="artists">
                <div className="artist-left">
                    <img src={Cosculluela} alt="Cosculluela" />
                    <div className="artist-name">Cosculluela</div>
                </div>
                <div className="artists-principal">
                    <img src={NJ} alt="artista" />
                    {/* <div className="artist-name">Cosculluela</div> */}
                </div>
                <div className="artist-right">
                    <img src={FK} alt="artista" />
                    <div className="artist-name">Farruko</div>
                </div>
            </div>
        </div>
    );
}

export default Artist;