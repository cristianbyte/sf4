import {createPortal} from 'react-dom';
import Button from "../common/Button";
import './authModal.css'

const AuthModal = ({ isOpen, onClose }) => {

    return createPortal(
        <div className="auth-container" onClick={()=> onClose()}>
            <div className="auth">
                <div className="auth-header">
                    <Button onClick={() => onClose()} children={"x"} />
                </div>
                <div className="auth-buttons">

                </div>
                <div className="auth-form">
                    {isOpen === "login" ? (
                        <div className="auth-login">

                        </div>
                    ) :
                        <div className="auth-enroll">

                        </div>
                    }
                </div>
            </div>
        </div>
    , document.body)
}

export default AuthModal;