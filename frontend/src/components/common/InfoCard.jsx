import countries from "../../assets/data/ISO3166-1.json";
import X from '../../assets/icons/X-min.png';
import Kick from '../../assets/icons/Kick-min.png';
import Instagram from '../../assets/icons/instagram-min.png';
import Youtube from '../../assets/icons/Youtube-min.png';
import Twitch from '../../assets/icons/Twitch-min.png';
import Tiktok from '../../assets/icons/Tiktok-min.png'
import './infoCard.css';

const socialIcons = {
    x: X,
    kick: Kick,
    instagram: Instagram,
    youtube: Youtube,
    twitch: Twitch,
    tiktok: Tiktok
};

function countryCodeToFlagEmoji(code) {
    if (!code) return "🏳️";
    return code
        .toUpperCase()
        .replace(/./g, char =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
        );
}

const InfoCard = ({ data, set = () => { } }) => {
    const countryName = countries[data.country] || data.country;
    const countryFlag = countryCodeToFlagEmoji(data.country);
    const validSocial = Object.entries(data.social).filter(
        ([platform, url]) => url && url !== "null"
    );

    return (
        <div className="infoCard">

            <div className="infoCard--pic">
                <div className='infoCard--name' >
                    <h3>{data.name}</h3>
                    <h5>{data.category}</h5>
                </div>
                <img className="infoCard--img" src={data.src} alt={data.name} />
                <div className="infoCard--social">
                    {validSocial.map(([platform, url]) => {
                        const iconSrc = socialIcons[platform.toLowerCase()];

                        return (
                            <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-links__item"
                                title={platform}
                            >
                                <div className="social-links__icon">
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
            <div className="infoCard--stats">
                <div onClick={() => set(data.rival.slide)} className="infoCard--vs">
                    <h5>{data.rival.name}</h5>
                    <img src={data.rival.src} alt={data.rival.name} />
                </div>
                <div className="infoCard--data">
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
                    <div className="data-bio">
                        <p>
                            {data.bio}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InfoCard;
