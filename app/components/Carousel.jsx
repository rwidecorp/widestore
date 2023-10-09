import ItemCarousel from 'react-multi-carousel';
import {useState, useEffect} from 'react';

const CustomButtonGroup = ({
  next,
  previous,
  goToSlide,
  setCurrentIndex,
  ...rest
}) => {
  const {
    carouselState: {currentSlide, totalItems, slidesToShow},
  } = rest;

  useEffect(() => {
    next();
  }, []);

  useEffect(() => {
    console.log(currentSlide % totalItems);
    setCurrentIndex(currentSlide % totalItems);
  }, [currentSlide]);
  return (
    <div className="carousel-button-group">
      <button
        onClick={() => {
          if (currentSlide > 1) previous();
        }}
      >
        {'<'}
      </button>
      <button
        onClick={() => {
          next();
        }}
      >
        {'>'}
      </button>
    </div>
  );
};

export default function Carousel({items}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ItemCarousel
        responsive={responsive}
        centerMode
        arrows={false}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        renderButtonGroupOutside={true}
        customButtonGroup={
          <CustomButtonGroup setCurrentIndex={setCurrentIndex} />
        }
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {' '}
            {item.variants.nodes[0].image.url !== '' && (
              <img
                src={item.variants.nodes[0].image.url}
                style={{
                  width: currentIndex === index ? 400 : 300,
                  height: currentIndex === index ? 400 : 300,
                  objectFit: 'contain',
                }}
              />
            )}
          </div>
        ))}
      </ItemCarousel>
    </div>
  );
}
