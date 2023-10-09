import Carousel from '../components/Carousel';
import {useLoaderData} from '@remix-run/react';

// loader fetches data before rendering the page
export async function loader({context}) {
  const miceData = await context.storefront.query(MICE_QUERY);

  return miceData;
}

export default function Index() {
  const {collection} = useLoaderData();
  console.log(collection);
  return <Carousel items={collection.products.nodes} />;
}

const MICE_QUERY = `
query Collection {
  collection(handle: "mice") {
    description
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
