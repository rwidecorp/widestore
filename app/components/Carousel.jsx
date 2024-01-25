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

  const carouselContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const carouselSlide = {
    width: '100%',
    backgroundImage: `url(${images[currentSlide]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 0.5s ease-in-out',
  };

  const carouselImage = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  };

  const carouselButton = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '25px',
  };

  const carouselPrevButton = {
    ...carouselButton,
    left: '10px',
  };

  const carouselNextButton = {
    ...carouselButton,
    right: '10px',
  };

  return (
    <div style={carouselContainer} className="carousel-container">
      <button
        onClick={prevSlide}
        className="button-reset carousel-button carousel-prev-button "
      >
        <BsCaretLeftFill />
      </button>
      <div className="carousel-slide">
        <img
          src={images[currentSlide].previewImage.url}
          alt={images[currentSlide].alt}
          className="carousel-image"
        />
      </div>
      <button
        onClick={nextSlide}
        className="button-reset carousel-button carousel-next-button"
      >
        <BsCaretRightFill />
      </button>
    </div>
  );
};

export default Carousel;
