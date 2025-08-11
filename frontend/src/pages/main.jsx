import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import Poster from "../layouts/Poster";
import Info from "../layouts/Info";
import './main.css';

const main = () => {
    return (
    <>
        <div className="main__container">
            <Menu />
            <Poster />
            <Header />
            <Info />
        </div>
    </>
    )
}

export default main;