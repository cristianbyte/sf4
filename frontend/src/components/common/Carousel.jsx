import React from 'react';
import Button from './Button';
import './carousel.css';

const Carousel = ({
  currentSlide = 0,
  onSlideChange = () => { },
  children
}) => {
  const slideCount = React.Children.count(children);

  const handlePrev = () => {
    const newIndex = currentSlide === 0 ? slideCount - 1 : currentSlide - 1;
    onSlideChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentSlide === slideCount - 1 ? 0 : currentSlide + 1;
    onSlideChange(newIndex);
  };

  return (
    <div className="fighter-carousel">
      <div className="carousel__view">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} className="carousel__slide">
              {child}
            </div>
          ))}
        </div>

        <div className="carousel__btns">
          <Button onClick={handlePrev} className="chevron-left" size='sizeXL'/>
          <Button onClick={handleNext} className="chevron-right" size='sizeXL'/>
        </div>
      </div>


    </div>
  );
};

export default Carousel;