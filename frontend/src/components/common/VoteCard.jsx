import './voteCard.css'

const VoteCard = ({ fighter1, fighter2 }) => {

    const totalVotes = fighter1.votes + fighter2.votes;
    const fighter1Percentage = totalVotes > 0 ? (fighter1.votes / totalVotes) * 100 : 50;
    const fighter2Percentage = totalVotes > 0 ? (fighter2.votes / totalVotes) * 100 : 50;

    return (
        <div className="voteCard">
            <div className="voteCard-pics">
                <img src={fighter1.src} alt={fighter1.name} />
                <img src={fighter2.src} alt={fighter2.name} />
                <div className="voteCard--names">
                    <h2>{fighter1.name}</h2>
                    <h2>{fighter2.name}</h2>
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
                            <span>{fighter1.name}</span>
                            {totalVotes > 0 ? `${Math.round(fighter2Percentage)}%` : '50%'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoteCard;