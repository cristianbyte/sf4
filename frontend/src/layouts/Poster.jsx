import { useViewTransitionNavigate } from '../hooks/useViewTransitionNav';
import {useNavigate} from 'react-router-dom';
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

export const leftFighters = [
    { name: "Yina", img: Yina, url: "/luchador/yina" },
    { name: "JHdelaCruz", img: JHdeLaCruz, url: "/luchador/jhdelacruz"  },
    { name: "Karina", img: Karina, url: "/luchador/karina"  },
    { name: "Shelao", img: Shelao, url: "/luchador/shelao"  },
    { name: "Milica", img: Milica, url: "/luchador/milica"  },
    { name: "TheNino", img: TheNino, url: "/luchador/thenino"  },
];

export const rightFighters = [
    { name: "LaValdiri", img: LaValdiri, url: "luchador/lavaldiri" },
    { name: "Cristorata", img: Cristorata, url: "/luchador/cristorata"  },
    { name: "Karely", img: Karely, url: "/luchador/karely"  },
    { name: "Belosmaki", img: Belosmaki, url: "/luchador/belosmaki"  },
    { name: "May", img: May, url: "/luchador/may"  },
    { name: "Byking", img: Byking, url: "/luchador/byking"  }
];

const Poster = ({ slide, setSlide }) => {

    // const transitionNavigate = useViewTransitionNavigate();
      const navigate = useNavigate();

  const handleClick = ( to) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(to);
      });
    } else {
      navigate(to);
    }
  };

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
                        <div key={index}
                            onClick={() => handleClick( fighter.url)}
                            className="fighter-pic">
                            <div
                                onMouseEnter={() => handleFighterHover(index, true)}
                                onMouseLeave={() => handleFighterHover(index, false)}
                            >
                                <p className='fighter-name'>{fighter.name}</p>
                                <img src={fighter.img} alt={fighter.name} style={{ viewTransitionName: `image-${fighter.name}` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="poster__right">
                <div className="fighters-right">
                    {rightFighters.map((fighter, index) => (
                        <div key={index}
                            onClick={() => transitionNavigate(null, fighter.url)}
                            className="fighter-pic">
                            <div
                                onMouseEnter={() => handleFighterHover(index, true)}
                                onMouseLeave={() => handleFighterHover(index, false)}
                            >
                                <p className='fighter-name'>{fighter.name}</p>
                                <img src={fighter.img} alt={fighter.name} style={{ viewTransitionName: `img-${fighter.name}` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Poster;