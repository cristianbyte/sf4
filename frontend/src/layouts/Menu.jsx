import { useState } from "react";
import { useUser } from '../context/userCotext';
import { useViewTransitionNavigate } from "../hooks/useViewTransitionNav";
import Button from "../components/common/Button";
import AuthModal from "../components/auth/AuthModal";
import './menu.css';

const Menu = () => {
    const [showAuth, setShowAuth] = useState(false);
    const { user, logout } = useUser();
    const transitionNavigate = useViewTransitionNavigate();


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
                <Button
                    size="sizeS"
                    onClick={() => {
                        document.getElementById('votes').scrollIntoView({ behavior: 'smooth' });
                    }}
                    children={"VOTOS"}
                />
                <Button
                    size="sizeS"
                    onClick={(e) => { transitionNavigate(e, '/') }}
                    children={"COMBATES"}
                />
                <Button
                    size="sizeS"
                    href={"https://www.taquillalive.com/book-performance/?artist=stream-fighters&event=TCL.EVN885.PRF1"}
                    children={"COMPRAR ENTRADAS"}
                />
            </div>
        </div>
    );
};

export default Menu;