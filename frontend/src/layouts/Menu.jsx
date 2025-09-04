import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from '../context/userCotext';
import { useViewTransitionNavigate } from "../hooks/useViewTransitionNav";
import Button from "../components/common/Button";
import SF4 from "../assets/images/SF4-logo.webp";
import AuthModal from "../components/auth/AuthModal";
import './menu.css';

const Menu = () => {
    const [showAuth, setShowAuth] = useState(false);
    const { user, logout } = useUser();
    const transitionNavigate = useViewTransitionNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function useOnPrincipalPage() {
        const location = useLocation();
        return location.pathname === "/";
    }

    const onPrincipalPage = useOnPrincipalPage();


    return (
        <div className={scrolled ? "scrolled menu__container" : "menu__container"}>
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
                {!onPrincipalPage && (<div
                    onClick={(e) => { transitionNavigate(e, '/') }}
                    className="menu__logo-container"
                >
                    <img src={SF4} alt="Stream Fighters 4" className="menu__logo" />
                </div>)}
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