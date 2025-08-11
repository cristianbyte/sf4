import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import Poster from "../layouts/Poster";
import Info from "../layouts/Info";
import Videos from "../layouts/Videos";
import './main.css';

const main = () => {
    return (
    <>
        <div className="main__container">
            <Menu />
            <Poster />
            <Header />
            <Info />
            <Videos />
        </div>
    </>
    )
}

export default main;