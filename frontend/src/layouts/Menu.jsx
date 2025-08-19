import { useState } from "react";
import Button from "../components/common/Button";
import AuthModal from "../components/auth/AuthModal";
import './menu.css';

const Menu = () => {
    const [showAuth, setShowAuth] = useState(false);
    return (
        <div className="menu__container">
            {showAuth && (
                <AuthModal 
                    isOpen={showAuth} 
                    onClose={() => setShowAuth(false)} 
                />
            )}
            <div className="menu">
                <a href="/combates">Combates</a>
                <Button size="sizeS" className="started" href={"https://www.taquillalive.com/book-performance/?artist=stream-fighters&event=TCL.EVN885.PRF1"} children={"ENTRADAS"} />
                <div className="access">
                    <Button variant="primary" onClick={() => setShowAuth("login")} size="sizeS">Acceder</Button>
                    <Button variant="primary" onClick={() => setShowAuth("enroll")} size="sizeS">Registrarme</Button>
                </div>
            </div>
        </div>
    )
}

export default Menu;