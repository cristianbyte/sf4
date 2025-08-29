import { useState } from 'react';
import Header from "../layouts/Header";
import Partners from "../layouts/Partners"
import Info from "../layouts/Info";
import Videos from "../layouts/Videos";
import Votes from "../layouts/Votes";
import './main.css';

const main = () => {
    const [slide, setSlide] = useState(0);
    return (
    <>
        <div className="main__container">

            <Header slide={slide}
                setSlide={setSlide}  />
            <Info   slide={slide}
                setSlide={setSlide}/>
            <Votes />
            {/* <Videos /> */}
            <Partners />
        </div>
    </>
    )
}

export default main;