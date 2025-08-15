import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import Poster from "../layouts/Poster";
import Info from "../layouts/Info";
import Videos from "../layouts/Videos";
import { useState } from 'react';
import './main.css';

const main = () => {
    const [slide, setSlide] = useState(0);
    return (
    <>
        <div className="main__container">
            <Menu />
            <Poster                 slide={slide}
                setSlide={setSlide} />
            <Header />
            <Info   slide={slide}
                setSlide={setSlide}/>
            <Videos />
        </div>
    </>
    )
}

export default main;