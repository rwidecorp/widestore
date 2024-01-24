import {useState} from 'react';
import {BsCaretRightFill} from 'react-icons/bs';
import {BsCaretLeftFill} from 'react-icons/bs';
const Carousel = ({images}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const carouselStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const slideStyle = {
    width: '100%',
    backgroundImage: `url(${images[currentSlide]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 0.5s ease-in-out',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  };

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '25px',
  };

  const prevButtonStyle = {
    ...buttonStyle,
    left: '10px',
  };

  const nextButtonStyle = {
    ...buttonStyle,
    right: '10px',
  };

  return (
    <div style={carouselStyle}>
      <button
        style={prevButtonStyle}
        onClick={prevSlide}
        className="button-reset main-card-next main-card-button"
      >
        <BsCaretLeftFill />
      </button>
      <div style={slideStyle}>
        <img
          src={images[currentSlide].previewImage.url}
          alt={images[currentSlide].alt}
          style={imageStyle}
        />
      </div>
      <button
        style={nextButtonStyle}
        onClick={nextSlide}
        className="button-reset main-card-next main-card-button"
      >
        <BsCaretRightFill />
      </button>
    </div>
  );
};

export default Carousel;
