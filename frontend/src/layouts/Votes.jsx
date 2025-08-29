import { useState, useEffect } from 'react'
import { leftFighters, rightFighters } from '../layouts/Poster'
import { apiRequest } from '../services/request'
import VoteCard from '../components/common/VoteCard'
import './votes.css'

const Votes = () => {
    const [leftFightersList, setLeftFightersList] = useState(leftFighters.map(f => ({ ...f, votes: 0 })));
    const [rightFightersList, setRightFightersList] = useState(rightFighters.map(f => ({ ...f, votes: 0 })));

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const votes = await apiRequest('/vote', 'GET');
                console.log(votes);
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
        <div className='votes'>
            <h2 className='shine-low' >Vota por tu favorito</h2>
            <div className="votes-container">
                <VoteCard
                    fighter1={leftFightersList[0]}
                    fighter2={rightFightersList[0]}
                />
                                <VoteCard
                    fighter1={leftFightersList[1]}
                    fighter2={rightFightersList[1]}
                />
                                <VoteCard
                    fighter1={leftFightersList[2]}
                    fighter2={rightFightersList[2]}
                />
                                <VoteCard
                    fighter1={leftFightersList[3]}
                    fighter2={rightFightersList[3]}
                />
                                <VoteCard
                    fighter1={leftFightersList[4]}
                    fighter2={rightFightersList[4]}
                />
                                <VoteCard
                    fighter1={leftFightersList[5]}
                    fighter2={rightFightersList[5]}
                />
            </div>
        </div>
    );
};

export default Votes;