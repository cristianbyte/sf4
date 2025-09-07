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
        const cached = localStorage.getItem("locationData");
        if (cached) {
            return JSON.parse(cached);
        }

        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (!data.country_code) {
            throw new Error("Failed to get location");
        }

        const locationData = {
            location: data.country_code === "CO"
                ? `${data.country_code}-${data.region_code}`
                : data.country_code,
            countryCode: data.country_code,
            hasLocation: true
        };

        localStorage.setItem("locationData", JSON.stringify(locationData));
        setUser(prev => ({ ...prev, ...locationData }));
        return locationData;
    };

    const voteFor = async (fighterName) => {
        let currentUser = user;
        // valitade if user has already voted for this fighter
        if (user?.votes?.some(f => f.fighter == fighterName)) {
            return;
        }
        try {

            if (!user?.hasLocation) {
                const locationData = await getLocation();
                currentUser = { ...user, ...locationData, hasLocation: true };
            }

            const payload = {
                fighterName,
                isForeign: currentUser.countryCode !== 'CO',
                location: currentUser.location,
                userId: currentUser.userId,
            };

            const res = await apiRequest('/vote', 'POST', payload);
            let updatedVotes;

            if (res.message === 'Vote updated') {
                updatedVotes = (currentUser.votes || []).map(v =>
                    v.voteId === res.id ? { ...v, fighter: res.fighterName } : v
                );
            } else {
                updatedVotes = [...(currentUser.votes || []), { voteId: res.id, fighter: res.fighterName }];
            }

            setUser({
                ...currentUser,
                votes: updatedVotes
            });

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