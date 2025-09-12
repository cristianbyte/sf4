import './artists.css'
import Cosculluela from '../assets/images/Cosculluela-pose.png'
import NJ from '../assets/images/NJ-pose.png'
import F from '../assets/images/F-pose.png'

const Artist = () => {
    return (
        <div className="artist-container">
            <div className="artist" id="artists">
                <div className="artist-left">
                    <img src={NJ} alt="artista" />
                </div>
                <div className="artists-principal">
                    <img src={Cosculluela} alt="Cosculluela" />
                    <div className="artist-name"></div>
                </div>
                <div className="artist-right">
                    <img src={F} alt="artista" />
                </div>
            </div>
        </div>
    );
}

export default Artist;