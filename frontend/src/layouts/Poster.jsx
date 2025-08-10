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
                <div className="fighters-left">
                    <img className='fighter-pic' src={JHdeLaCruz} alt="" />
                    <img className='fighter-pic' src={Karina} alt="" />
                    <img className='fighter-pic' src={Shelao} alt="" />
                    <img className='fighter-pic' src={Milica} alt="" />
                    <img className='fighter-pic' src={TheNino} alt="" />
                    <img className='fighter-pic' src={Yina} alt="" /> 
                </div>
            </div>
            <div className="poster__right">
                <div className="fighters-right">
                    <img className='fighter-pic' src={Cristorata} alt="" /> 
                    <img className='fighter-pic' src={Karely} alt="" />
                    <img className='fighter-pic' src={Belosmaki} alt="" />
                    <img className='fighter-pic' src={May} alt="" />
                    <img className='fighter-pic' src={Byking} alt="" />
                    <img className='fighter-pic' src={LaValdiri} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Poster;