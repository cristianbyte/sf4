import { createPortal } from 'react-dom';
import Button from "../common/Button";
import SF4 from "../../assets/images/SF4-logo.webp"
import './authModal.css'

const AuthModal = ({ isOpen, setIsOpen, onClose }) => {

    return createPortal(
        <div className="auth-container" onClick={() => onClose()}>
            <div className="auth" onClick={(e) => e.stopPropagation()}>
                <div className="auth-header">
                    <Button variant='cancel' children={"X"} onClick={() => onClose()} className='authCloseWindow-btn' />
                    <img src={SF4} className="auth-header-img" alt="strem figthers 4 logo" />
                </div>
                <div className="auth-form">
                    {isOpen === "login" ? (
                        <div>
                            <form className="auth-login">
                                <div className="auth-buttons">
                                    <Button children={"ACCEDER"} className='active' size='sizeM' onClick={() => setIsOpen("login")} />
                                    <Button children={"REGISTRARME"} size='sizeM' onClick={() => setIsOpen("enroll")} />
                                </div>
                                <label htmlFor="login-email">email</label>
                                <input type="email" required name="email" id="login-email" />
                                <label htmlFor="login-pass">password</label>
                                <input type="password" required name="password" id="login-pass" />
                                <input type="submit" value="Entrar" />
                            </form>
                        </div>
                    ) : (
                        <div>
                            <form className="auth-enroll">
                                <div className="auth-buttons">
                                    <Button children={"ACCEDER"} size='sizeM' onClick={() => setIsOpen("login")} />
                                    <Button children={"REGISTRARME"} className='active' size='sizeM' onClick={() => setIsOpen("enroll")} />
                                </div>
                                <label htmlFor="enroll-email">email</label>
                                <input type="email" required name="email" placeholder='nombre@email.com' id="enroll-email" />
                                <label htmlFor="enroll-username">username</label>
                                <input type="text" required name="username" id="enroll-username" />
                                <label htmlFor="enroll-pass">password</label>
                                <input type="password" required name="password" id="enroll-pass" />
                                <input type="submit" value="Registrarme" />
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
        , document.body)
}

export default AuthModal;