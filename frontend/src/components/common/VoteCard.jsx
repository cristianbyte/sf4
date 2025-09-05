import { apiRequest } from '../../services/request';
import { useState } from 'react';
import { useUser } from '../../context/userCotext'
import ModalVote from './ModalVote';
import './voteCard.css'

const VoteCard = ({ fighter1, fighter2 }) => {
    const { user, setUser } = useUser();
    const [locationError, setLocationError] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const getLocation = async () => {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.status !== 'success') {
            throw new Error('Failed to get location');
        }

        const locationData = {
            location: data.country_code === "CO" ? `${data.country_code}-${data.region_code}` : data.country_code,
            countryCode: data.country_code,
        };

        setUser({
            ...user,
            ...locationData,
            hasLocation: true
        });

        return locationData;
    };

    const voteFor = async (fighterName) => {
        try {
            let locationData;

            if (!user?.hasLocation) {
                locationData = await getLocation();
            } else {
                locationData = {
                    location: user.location,
                    countryCode: user.countryCode
                };
            }

            await apiRequest('/vote', 'POST', {
                fighterName: fighterName,
                isForeign: locationData.countryCode !== 'CO',
                location: locationData.location,
                userId: user.userId
            }).then((res) => {
                setUser({ res });
            }
            );

        } catch (error) {
            console.error('Error voting:', error);
            setLocationError(true);
        }
    };

    const totalVotes = fighter1.votes + fighter2.votes;
    const fighter1Percentage = totalVotes > 0 ? (fighter1.votes / totalVotes) * 100 : 50;
    const fighter2Percentage = totalVotes > 0 ? (fighter2.votes / totalVotes) * 100 : 50;

    return (
        <div className="voteCard">
            {showModal && <ModalVote onClose={() => setShowModal(false)} figther1={fighter1} figther2={fighter2} func={voteFor} />}
            <div className="voteCard-pics">
                <div className={user?.votes?.some(f => f.fighter == fighter1.name) ? `isFavorite` : ""}>
                    <img onClick={() => setShowModal(true)} src={fighter1.img} alt={fighter1.name} />
                </div>
                <div className={user?.votes?.some(f => f.fighter == fighter2.name) ? `isFavorite` : ""}>
                    <img onClick={() => setShowModal(true)} src={fighter2.img} alt={fighter2.name} />
                </div>
                <div className="voteCard--names">
                    <h3 className='shine-high'>{fighter1.name}</h3>
                    <h3 className='shine-high'>{fighter2.name}</h3>
                </div>
            </div>
            <div className="popularity-bar">
                <div className="popularity-bar__container">
                    <div
                        className="popularity-bar__fill popularity-bar__fill--fighter1"
                        style={{ width: `${fighter1Percentage}%` }}
                    >
                        <div className="popularity-bar__percentage">
                            <span>{fighter1.name}</span>
                            {totalVotes > 0 ? `${Math.round(fighter1Percentage)}%` : '50%'}
                        </div>
                    </div>
                    <div
                        className="popularity-bar__fill popularity-bar__fill--fighter2"
                        style={{ width: `${fighter2Percentage}%` }}
                    >
                        <div className="popularity-bar__percentage">
                            <span>{fighter2.name}</span>
                            {totalVotes > 0 ? `${Math.round(fighter2Percentage)}%` : '50%'}
                        </div>
                    </div>
                </div>
                <h4>Total de votos: {totalVotes}</h4>
            </div>
        </div>
    )
}

export default VoteCard;