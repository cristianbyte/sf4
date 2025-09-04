import { leftFighters, rightFighters } from "../../layouts/Poster";
import countries from "../../assets/data/ISO3166-1.json";
import boxers from '../../assets/data/boxers.json'
import X from '../../assets/icons/X-min.png';
import Kick from '../../assets/icons/Kick-min.png';
import Instagram from '../../assets/icons/instagram-min.png';
import Youtube from '../../assets/icons/Youtube-min.png';
import Twitch from '../../assets/icons/Twitch-min.png';
import Tiktok from '../../assets/icons/Tiktok-min.png'
import Menu from "../../layouts/Menu"
import Partners from "../../layouts/Partners"
import './luchador.css'

function countryCodeToFlagEmoji(code) {
    if (!code) return "🏳️";
    return code
        .toUpperCase()
        .replace(/./g, char =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
        );
}

const Luchador = ({name}) => {

    const images = [...leftFighters, ...rightFighters];

    const data = boxers.filter(boxer => boxer.id === name)[0];
    const countryName = countries[data.country] || data.country;
    const countryFlag = countryCodeToFlagEmoji(data.country);
    const socialIcons = {
        x: X,
        kick: Kick,
        instagram: Instagram,
        youtube: Youtube,
        twitch: Twitch,
        tiktok: Tiktok
    };
    const validSocial = Object.entries(data.social).filter(
        ([platform, url]) => url && url !== "null"
    );
    const myphoto = images.find(e =>e.name == data.id);
    return (
        <>
            <Menu />
            <div className="luchador__container">


                <div className="luchador__fighter">
                    <img src={myphoto.img} alt={data.name} style={{ viewTransitionName: `image-${data.id}` }} />
                </div>

                <div className="luchador-data">
                    <div className="row">
                        <div className="col">
                            <div className="data">
                                <h3>ORIGEN</h3>
                                <span>
                                    {countryName} {countryFlag}
                                </span>
                            </div>
                            <div className="data">
                                <h3>EDAD</h3>
                                <span>{data.age} AÑOS</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="data">
                                <h3 >PESO</h3>
                                <span>{data.weight_kg} KG</span>
                            </div>
                            <div className="data">
                                <h3>ESTATURA</h3>
                                <span>{data.height_cm} CM</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="luchador__info">
                    <p>
                        {data.bio}
                    </p>
                </div>

                <div className="luchador__social">
                    {validSocial.map(([platform, url]) => {
                        const iconSrc = socialIcons[platform.toLowerCase()];
                        return (
                            <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-links"
                                title={platform}
                            >
                                <div className="social-link">
                                    {iconSrc ? (
                                        <img src={iconSrc} alt={platform} />
                                    ) : (
                                        <span>🔗</span>
                                    )}
                                </div>
                            </a>
                        );
                    })}
                </div>


            </div>
            <Partners />
        </>
    )
}

export default Luchador;