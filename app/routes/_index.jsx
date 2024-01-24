import {Canvas} from '@react-three/fiber';
import {useLoaderData} from '@remix-run/react';
import {Model} from '../assets/Main_menu_scene_with_mice.jsx';
import {SoftShadows, Loader} from '@react-three/drei';
import {useEffect, useState} from 'react';
import {useNavigate} from '@remix-run/react';
import MainSceneAside from '../components/MainSceneAside.jsx';
import MainSceneCard from '~/components/MainSceneCard.jsx';

// loader fetches data before rendering the page
export async function loader({context}) {
  const miceData = await context.storefront.query(MICE_QUERY);

  return miceData;
}

export default function Index() {
  const {collection} = useLoaderData();
  const navigate = useNavigate();

  const [selected, setSelected] = useState();
  const [brightness, setBrightness] = useState(1000);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);

  console.log('deploy success');

  useEffect(() => {
    switch (selected) {
      case 'Cumulus':
        setIsPrevious('Nimbus');
        setIsNext('Stratus');
        break;
      case 'Stratus':
        setIsPrevious('Cumulus');
        setIsNext('Cirrus');
        break;
      case 'Cirrus':
        setIsPrevious('Stratus');
        setIsNext('Nimbus');
        break;
      case 'Nimbus':
        setIsPrevious('Cirrus');
        setIsNext('Cumulus');
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

  return (
    <div className="index-container">
      <Canvas shadows>
        <ambientLight intensity={2.4} />
        {selected === 'Cumulus' && (
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
        {selected === 'Stratus' && (
          <>
            <pointLight
              position={[14, 10, -7]}
              intensity={brightness}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight
              position={[14, 10, 7]}
              intensity={brightness}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
          </>
        )}
        {selected === 'Cirrus' && (
          <>
            <pointLight
              position={[-7, 10, -14]}
              intensity={brightness}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight
              position={[7, 10, -14]}
              intensity={brightness}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
          </>
        )}
        {selected === 'Nimbus' && (
          <>
            <pointLight
              position={[-14, 10, 7]}
              intensity={brightness}
              castShadow
              color={'white'}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight
              position={[-14, 10, -7]}
              intensity={brightness}
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
      <MainSceneCard
        selectedData={selectedData}
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
        navigate={navigate}
      />

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
