import X from '../../assets/icons/X-min.png';
import Kick from '../../assets/icons/Kick-min.png';
import Instagram from '../../assets/icons/instagram-min.png';
import Youtube from '../../assets/icons/Youtube-min.png';
import Twitch from '../../assets/icons/Twitch-min.png';
import './infoCard.css';

const socialIcons = {
    x: X,
    kick: Kick,
    instagram: Instagram,
    youtube: Youtube,
    twitch: Twitch,
};

const InfoCard = ({ data }) => {
    const validSocial = Object.entries(data.social).filter(
        ([platform, url]) => url && url !== "null"
    );

    return (
        <div className="infoCard">
            <div className="infoCard--pic">
                <h3 className='infoCard--name' >{data.name}</h3>
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
            <div className="infoCard--data">
                <div className="data">
                    <h3>EDAD</h3>
                    <span>{data.age}</span>
                </div>
                <div className="data">
                    <h3>PESO</h3>
                    <span>{data.weight_kg} KG</span>
                </div>
                    <div className="data">
                    <h3>ESTATURA</h3>
                    <span>{data.height_cm} KG</span>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
