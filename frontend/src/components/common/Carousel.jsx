import React from 'react';
import Button from './Button'; // Assuming Button is a custom component for buttons
import './carousel.css';

const Carousel = ({ 
  currentSlide = 0, 
  onSlideChange = () => {},
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
    <div className="fighter__carousel">
      <Button onClick={handlePrev} className="fighter-carousel__btn">‹</Button>
      
      <div className="fighter-carousel__viewport">
        <div 
          className="fighter-carousel__track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} className="fighter-carousel__slide">
              {child}
            </div>
          ))}
        </div>
      </div>
      
      <Button onClick={handleNext} className="fighter-carousel__btn">›</Button>
    </div>
  );
};

export default Carousel;