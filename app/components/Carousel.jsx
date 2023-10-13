import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Link} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';

export default function Carousel({items, collection}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trigger, setTrigger] = useState(false);

  console.log(items);

  const prevItem = () => {
    if (currentIndex === 0) {
      setTrigger(true);
      setTimeout(() => {
        setTrigger(false);
        setCurrentIndex(items.length - 1);
      }, 200);
    } else {
      setTrigger(true);
      setTimeout(() => {
        setTrigger(false);
        setCurrentIndex(currentIndex - 1);
      }, 200);
    }
  };

  const nextItem = () => {
    if (currentIndex === items.length - 1) {
      setTrigger(true);
      setTimeout(() => {
        setTrigger(false);
        setCurrentIndex(0);
      }, 200);
    } else {
      setTrigger(true);
      setTimeout(() => {
        setTrigger(false);

        setCurrentIndex(currentIndex + 1);
      }, 200);
    }
  };

  return (
    <div className="carousel-container">
      <button className="prev-button" onClick={() => prevItem()}>
        {'<'}
      </button>
      <button className="next-button" onClick={() => nextItem()}>
        {'>'}
      </button>
      <div>
        <h1>{items[currentIndex].title}</h1>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <AnimatePresence>
          <motion.div
            animate={{opacity: trigger ? 0 : [0, 1], y: trigger ? -200 : 0}}
            key={currentIndex - 1}
            style={{width: 300, height: 300, opacity: 1, y: 200}}
          >
            <img
              src={
                items[currentIndex === 0 ? items.length - 1 : currentIndex - 1]
                  .variants.nodes[0].image.url
              }
              style={{width: 240, height: 240}}
            />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            animate={{opacity: trigger ? 0 : 1, y: trigger ? 200 : 0}}
            style={{
              width: 400,
              height: 400,
              opacity: 0,
              y: -200,
            }}
          >
            <img
              src={items[currentIndex].variants.nodes[0].image.url}
              style={{width: 400, height: 400}}
            />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            key={currentIndex + 1}
            animate={{opacity: trigger ? 0 : [0, 1], y: trigger ? -200 : 0}}
            style={{
              width: 300,
              height: 300,
              opacity: 1,
              y: 200,
              position: 'relative',
            }}
          >
            <img
              src={
                items[currentIndex === items.length - 1 ? 0 : currentIndex + 1]
                  .variants.nodes[0].image.url
              }
              style={{width: 240, height: 240}}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <a>learn more</a>
        <Link to={`/products/${items[currentIndex].handle}`}>
          View Collection
        </Link>
        <CartForm
          route="/cart"
          inputs={{
            lines: [
              {
                merchandiseId: items[currentIndex].variants.nodes[0].id,
              },
            ],
          }}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher) => (
            <>
              <button
                type="submit"
                onClick={() => {
                  window.location.href = window.location.href + '#cart-aside';
                }}
                className="border border-black rounded-sm w-full px-4 py-2 text-white bg-black uppercase hover:bg-white hover:text-black transition-colors duration-150"
              >
                'Add to cart'
              </button>
            </>
          )}
        </CartForm>
      </div>
    </div>
  );
}
