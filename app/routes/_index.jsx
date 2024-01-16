import {Canvas} from '@react-three/fiber';
import {useLoaderData} from '@remix-run/react';
import {Model} from '../assets/Main_menu_scene_with_mice.jsx';
import {SoftShadows, Loader} from '@react-three/drei';
import {useEffect, useState} from 'react';
import {BsCaretRightFill} from 'react-icons/bs';
import {BsCaretLeftFill} from 'react-icons/bs';
import {useNavigate} from '@remix-run/react';
import MainSceneAside from '../components/MainSceneAside.jsx';

// loader fetches data before rendering the page
export async function loader({context}) {
  const miceData = await context.storefront.query(MICE_QUERY);

  return miceData;
}

export default function Index() {
  const {collection} = useLoaderData();
  const navigate = useNavigate();

  const [selected, setSelected] = useState();
  const [brightness, setBrightness] = useState(600);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);

  useEffect(() => {
    switch (selected) {
      case 'FLIK':
        setIsPrevious('SLEEK');
        setIsNext('TRAK');
        break;
      case 'TRAK':
        setIsPrevious('FLIK');
        setIsNext('BRIK');
        break;
      case 'BRIK':
        setIsPrevious('TRAK');
        setIsNext('SLEEK');
        break;
      case 'SLEEK':
        setIsPrevious('BRIK');
        setIsNext('FLIK');
        break;
      default:
        break;
    }
  }, [selected]);

  const selectedData =
    selected &&
    collection.products.nodes.find(
      (obj) => obj.handle === selected.toLowerCase(),
    );

  const handleNextClick = () => {
    setIsNext(true);
    setIsPrevious(false);
    setSelected(isNext);
  };
  const handlePreviousClick = () => {
    setIsPrevious(true);
    setIsNext(false);
    setSelected(isPrevious);
  };

  useEffect(() => {
    if (selectedData) {
      console.log(selectedData);
    }
  }, [selectedData]);

  return (
    <div className="index-container">
      <Canvas shadows>
        <ambientLight intensity={2.4} />
        {selected === 'FLIK' && (
          <>
            <pointLight
              position={[7, 10, 14]}
              intensity={brightness}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight
              position={[-7, 10, 14]}
              intensity={brightness}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
          </>
        )}
        {selected === 'TRAK' && (
          <>
            <pointLight
              position={[14, 10, -7]}
              intensity={1000}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight
              position={[14, 10, 7]}
              intensity={2000}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
          </>
        )}
        {selected === 'BRIK' && (
          <>
            <pointLight
              position={[-7, 10, -14]}
              intensity={1000}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight
              position={[7, 10, -14]}
              intensity={2000}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
          </>
        )}
        {selected === 'SLEEK' && (
          <>
            <pointLight
              position={[-14, 10, 7]}
              intensity={1000}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight
              position={[-14, 10, -7]}
              intensity={2000}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
          </>
        )}

        <SoftShadows />
        <Model
          collection={collection}
          selected={selected}
          setSelected={setSelected}
          isNext={isNext}
          isPrevious={isPrevious}
          setIsNext={setIsNext}
          setIsPrevious={setIsPrevious}
        />
      </Canvas>
      <Loader />
      {selectedData && (
        <div className="main-card-column">
          <div className="main-card">
            <h1>{selectedData.title}</h1>
            <p style={{marginBottom: '24px'}}>{selectedData.description}</p>
            <div className="main-card-button-container">
              <button className="button-reset main-card-quick main-card-button cta-button">
                <strong>add to cart</strong>
              </button>
              <button
                onClick={() => handlePreviousClick()}
                className="button-reset main-card-prev main-card-button"
              >
                <BsCaretLeftFill />
                previous
              </button>
              <button
                onClick={() => navigate(`products/${selectedData.handle}`)}
                className="button-reset main-card-quick main-card-button"
              >
                learn more
              </button>
              <button
                onClick={() => handleNextClick()}
                className="button-reset main-card-next main-card-button"
              >
                next
                <BsCaretRightFill />
              </button>
            </div>
          </div>
        </div>
      )}
      <MainSceneAside setBrightness={setBrightness} />
    </div>
  );
}

const MICE_QUERY = `
query Collection {
  collection(handle: "complete-mice") {
    description
    handle
    products(first: 100) {
      nodes {
        id
        title
        description
        handle
        variants(first: 1) {
          nodes {
            id
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
}`;
