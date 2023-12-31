import {Canvas} from '@react-three/fiber';
import {useLoaderData} from '@remix-run/react';
import {Model} from '../assets/Main_menu_scene_with_mice.jsx';
import {SoftShadows} from '@react-three/drei';

// loader fetches data before rendering the page
export async function loader({context}) {
  const miceData = await context.storefront.query(MICE_QUERY);

  return miceData;
}

export default function Index() {
  const {collection} = useLoaderData();

  return (
    <div className="index-container">
      <Canvas shadows camera={{position: [24, 7, 10]}}>
        <pointLight
          position={[0, 6, 0]}
          intensity={400}
          castShadow
          color={'white'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[0, 6, 15]}
          intensity={200}
          castShadow
          color={'white'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[0, 6, -15]}
          intensity={200}
          castShadow
          color={'white'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[15, 6, 0]}
          intensity={200}
          castShadow
          color={'white'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[15, 6, 5]}
          intensity={400}
          castShadow
          color={'#4361ee'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[15, 6, -5]}
          intensity={400}
          castShadow
          color={'#f72585'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[-15, 6, 0]}
          intensity={200}
          castShadow
          color={'white'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <SoftShadows />
        <Model collection={collection} />
      </Canvas>
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
