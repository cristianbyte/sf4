import { useState, useEffect } from 'react'
import { leftFighters, rightFighters } from '../layouts/Poster'
import { apiRequest } from '../services/request'
import VoteCard from '../components/common/VoteCard'
import { useUser } from '../context/userCotext'
import './votes.css'

const Votes = () => {
    const { user } = useUser();
    const [leftFightersList, setLeftFightersList] = useState(leftFighters.map(f => ({ ...f, votes: 0 })));
    const [rightFightersList, setRightFightersList] = useState(rightFighters.map(f => ({ ...f, votes: 0 })));

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const votes = await apiRequest('/vote', 'GET');
                setLeftFightersList(leftFighters.map(f => ({
                    ...f,
                    votes: (votes?.total && votes.total[f.name]) || 0
                })));

                setRightFightersList(rightFighters.map(f => ({
                    ...f,
                    votes: (votes?.total && votes.total[f.name]) || 0
                })));

            } catch (error) {
                console.error('Error fetching votes:', error);
            }
        };

        fetchVotes();
    }, []);

    return (
        <div className='votes' id='votes'>
            <h2 className='shine-low' >Vota por tu favorito</h2>
            <div className="votes-container">
            <div className="votes-principal">
                <VoteCard
                    fighter1={leftFightersList[0]}
                    fighter2={rightFightersList[0]}
                />
            </div>
            <div className="votes-secondary">
                <VoteCard
                    fighter1={leftFightersList[1]}
                    fighter2={rightFightersList[1]}
                />
                <VoteCard
                    fighter1={leftFightersList[2]}
                    fighter2={rightFightersList[2]}
                />
            </div>
            <div className="votes-secondary">
                <VoteCard
                    fighter1={leftFightersList[3]}
                    fighter2={rightFightersList[3]}
                />
                <VoteCard
                    fighter1={leftFightersList[4]}
                    fighter2={rightFightersList[4]}
                />
            </div>
                <VoteCard
                    fighter1={leftFightersList[5]}
                    fighter2={rightFightersList[5]}
                />
            </div>
        </div>
    );
};

export default Votes;