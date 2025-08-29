import './voteCard.css'

const VoteCard = ({ fighter1, fighter2 }) => {

    const totalVotes = fighter1.votes + fighter2.votes;
    const fighter1Percentage = totalVotes > 0 ? (fighter1.votes / totalVotes) * 100 : 50;
    const fighter2Percentage = totalVotes > 0 ? (fighter2.votes / totalVotes) * 100 : 50;

    return (
        <div className="voteCard">
            <div className="voteCard-pics">
                <img src={fighter1.img} alt={fighter1.name} />
                <img src={fighter2.img} alt={fighter2.name} />
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