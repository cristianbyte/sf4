import { useState } from "react";
import { useUser } from '../context/userCotext';
import Button from "../components/common/Button";
import AuthModal from "../components/auth/AuthModal";
import './menu.css';

const Menu = () => {
    const [showAuth, setShowAuth] = useState(false);
    const { user, logout } = useUser();

    return (
        <div className="menu__container">
            {showAuth && (
                <AuthModal
                    isOpen={showAuth}
                    onClose={() => setShowAuth(false)}
                    setIsOpen={setShowAuth}
                />
            )}
            <div className="menu">
                <a href="/combates">Combates</a>
                <Button
                    size="sizeS"
                    className="started"
                    href={"https://www.taquillalive.com/book-performance/?artist=stream-fighters&event=TCL.EVN885.PRF1"}
                    children={"ENTRADAS"}
                />

                {user ? (
                    <div className="user-menu">
                        <Button variant="secondary" size="sizeS">{user.name}</Button>
                        <Button variant="secondary" size="sizeS" onClick={() => logout()} >{
                            <svg className="user-logOut" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>}
                        </Button>
                    </div>
                ) : (
                    <div className="access">
                        <Button variant="primary" onClick={() => setShowAuth("login")} size="sizeS">
                            Acceder
                        </Button>
                        <Button variant="primary" onClick={() => setShowAuth("enroll")} size="sizeS">
                            Registrarme
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;