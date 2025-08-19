import {createPortal} from 'react-dom';
import Button from "../common/Button";
import SF4 from "../../assets/images/SF4-logo.webp"
import './authModal.css'

const AuthModal = ({ isOpen, onClose }) => {

    return createPortal(
        <div className="auth-container" onClick={()=> onClose()}>
            <div className="auth">
                <div className="auth-header">
                    <Button variant='cancel' onClick={() => onClose()} className='authCloseWindow-btn' />
                    <img src={SF4} className="auth-header-img" alt="strem figthers 4 logo" />
                </div>
                <div className="auth-buttons">
                    <Button children={"ACCEDER"} size='sizeM' />
                    <Button children={"REGISTRARME"} size='sizeM' />
                </div>
                <div className="auth-form">
                    {isOpen === "login" ? (
                        <div className="auth-login">
                            <form >
                                <input type="text" name="name" id="name" />
                                <input type="password" name="pass" id="pass" />
                                <input type="button" value="Entrar" />
                            </form>
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