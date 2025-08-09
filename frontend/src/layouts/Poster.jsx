import Yina from '../assets/images/Yina-min.png';
import LaValdiri from '../assets/images/LaValdiri-min.png';
import JHdeLaCruz from '../assets/images/JHdeLaCruz-min.png';
import Cristorata from '../assets/images/Cristorata-min.png';
import Karina from '../assets/images/Karina-min.png';
import Karely from '../assets/images/Karely-min.png';
import Shelao from '../assets/images/Shelao-min.png';
import Belosmaki from '../assets/images/Belosmaki-min.png';
import Milica from '../assets/images/Milica-min.png';
import May from '../assets/images/May-min.png';
import TheNino from '../assets/images/TheNino-min.png';
import Byking from '../assets/images/Byking-min.png';
import './poster.css';

const Poster = () => {
    return (
        <div className="poster__container">
            <div className="poster__left">
                <div className="fighters">
                    <img src={TheNino} alt="" />
                    <img src={Milica} alt="" />
                    <img src={Shelao} alt="" />
                    <img src={Karina} alt="" />
                    <img src={JHdeLaCruz} alt="" />
                    <img src={Yina} alt="" />
                </div>
            </div>
            <div className="poster__right">
                <div className="fighters">
                    <img src={LaValdiri} alt="" />
                    <img src={Cristorata} alt="" />
                    <img src={Karely} alt="" />
                    <img src={Belosmaki} alt="" />
                    <img src={May} alt="" />
                    <img src={Byking} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Poster;