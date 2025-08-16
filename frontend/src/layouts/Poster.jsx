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

const leftFighters = [
    { name: "JHdeLaCruz", img: JHdeLaCruz },
    { name: "Karina", img: Karina },
    { name: "Shelao", img: Shelao },
    { name: "Milica", img: Milica },
    { name: "TheNino", img: TheNino },
    { name: "Yina", img: Yina }
];

const rightFighters = [
    { name: "Cristorata", img: Cristorata },
    { name: "Karely", img: Karely },
    { name: "Belosmaki", img: Belosmaki },
    { name: "May", img: May },
    { name: "Byking", img: Byking },
    { name: "La Valdiri", img: LaValdiri }
];


const Poster = ({slide, setSlide}) => {
    const handleFighterHover = (index, isEntering) => {
        const leftFighter = document.querySelector(`.fighters-left .fighter-pic:nth-child(${index + 1})`);
        const rightFighter = document.querySelector(`.fighters-right .fighter-pic:nth-child(${index + 1})`);

        if (isEntering) {
            leftFighter?.classList.add('hovered');
            rightFighter?.classList.add('hovered');
        } else {
            leftFighter?.classList.remove('hovered');
            rightFighter?.classList.remove('hovered');
        }
    };
    return (
        <div className="poster__container">
            
            <div className="poster__left">
                <div className="fighters-left">
                    {leftFighters.map((fighter, index) => (
                        <a key={index}
                        onClick={() => {
                            setSlide(((index)*2)+1);
                            document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' });
                        }} className="fighter-pic">
                            <div
                                
                                onMouseEnter={() => handleFighterHover(index, true)}
                                onMouseLeave={() => handleFighterHover(index, false)}
                            >
                                <p className='fighter-name'>{fighter.name}</p>
                                <img src={fighter.img} alt={fighter.name} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="poster__right">
                <div className="fighters-right">
                    {rightFighters.map((fighter, index) => (
                        <a key={index} 
                        onClick={() => {
                            setSlide((index)*2);
                            document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' });
                        }} className="fighter-pic">
                            <div
                                
                                onMouseEnter={() => handleFighterHover(index, true)}
                                onMouseLeave={() => handleFighterHover(index, false)}
                            >
                                <p className='fighter-name'>{fighter.name}</p>
                                <img src={fighter.img} alt={fighter.name} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Poster;