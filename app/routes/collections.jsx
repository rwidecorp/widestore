import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import ProductGrid from '../components/ProductGrid';

export async function loader({context}) {
  const {collections} = await context.storefront.query(COLLECTION_QUERY);
  // Handle 404s
  if (!collections) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    collections,
  });
}

export default function Collection() {
  const {collections} = useLoaderData();

  useEffect(() => {
    console.log(collections);
  }, [collections]);

  return (
    <>
      {/* {collections.nodes.map((node) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1 style={{fontSize: '2em', marginBottom: '100px'}}>{node.title}</h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'start',
              width: '80dvw',
              // backgroundColor: 'red',
            }}
          > */}
      <ProductGrid
        collection={collections}
        // url={`/collections/${product.handle}`}
      />
      {/* </div>
        </div>
      ))} */}
      {/* <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {collections.title}
        </h1>

        {collections.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {collections.description}
              </p>
            </div>
          </div>
        )}
      </header> */}
    </>
  );
}

const COLLECTION_QUERY = `#graphql
query FeaturedCollections {
  collections(first: 3, reverse: true, query: "collection_type:smart") {
    nodes {
      id
      title
      handle
      description
      products(first:10, sortKey: TITLE){
        nodes{
          priceRange{
            maxVariantPrice{
              amount
              currencyCode
            }
          }
          title
          description
          handle
          images(first:3){
            nodes{url}
          }
        }
      }
    }
  }
}
`;
