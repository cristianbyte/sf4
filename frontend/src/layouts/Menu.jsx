import Button from "../components/common/Button";
import './menu.css';

const Menu = () => {
    return (
        <div className="menu__container">
            <div className="menu">
                <a className="started" href="/combates">Combates</a>
                <div className="access">
                    <Button variant="secondary" size="sizeS">Acceder</Button>
                    <Button variant="primary" size="sizeS">Registrarme</Button>
                </div>
            </div>
        </div>
    )
}

export default Menu;