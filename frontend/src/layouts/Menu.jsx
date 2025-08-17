import Button from "../components/common/Button";
import './menu.css';

const Menu = () => {
    return (
        <div className="menu__container">
            <div className="menu">
                <a  href="/combates">Combates</a>
                <Button size="sizeS" className="started" href={"https://www.taquillalive.com/book-performance/?artist=stream-fighters&event=TCL.EVN885.PRF1"} children={"ENTRADAS"} />
                <div className="access">
                    <Button variant="secondary" size="sizeS">Acceder</Button>
                    <Button variant="primary" size="sizeS">Registrarme</Button>
                </div>
            </div>
        </div>
    )
}

export default Menu;