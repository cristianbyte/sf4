import './modalVote.css';
// import { useUser } from '../../context/userCotext';

const ModalVote = ({ onClose, figther1, figther2, func }) => {
    //const { reloadUser } = useUser();

    const handleVote = async (fighterName) => {
        try {
            await func(fighterName);
            onClose();
        } catch (error) {
            console.error("Error registering vote:", error);
        }
    };

    return (
        <div className="modal-vote" onClick={(e) => {
            onClose();
        }}>
            <div className="modal-vote-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='modal-title shine-low'>¿Quién se lleva tu apoyo?</h2>
                <div className="modal-vote-options">
                    <div className="modal-vote-option" onClick={() => { handleVote(figther1.name) }} >
                        <img src={figther1.img} alt={figther1.name} />
                        <p className='shine-low' >{figther1.name}</p>
                    </div>
                    <div className="modal-vote-option" onClick={() => { handleVote(figther2.name) }} >
                        <img src={figther2.img} alt={figther2.name} />
                        <p className='shine-low' >{figther2.name}</p>
                    </div>
                </div>
            </div>
        </div>);
}

export default ModalVote;