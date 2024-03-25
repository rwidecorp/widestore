import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {ModelViewer} from '@shopify/hydrogen-react';
import ProductInfoContainer from '~/components/ProductInfoContainer';
import AddToCartContainer from '~/components/AddToCartContainer';
import {useState} from 'react';
import {isMobile, isSafari, isFirefox} from 'react-device-detect';
import Carousel from '../components/Carousel.jsx';
import TechSpecs from '~/components/TechSpecs.jsx';

export async function loader({params, context, request}) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // Set a default variant so you always have an "orderable" product selected
  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];
  return json({
    shop,
    product,
    selectedVariant,
  });
}

const seo = ({data}) => ({
  title: data?.product?.title,
  description: data?.product?.description.substr(0, 154),
});
export const handle = {
  seo,
};

export default function ProductHandle() {
  const {product, selectedVariant, shop} = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const isBlacklisted = isMobile || isSafari || isFirefox;

  const media3d = product.media.nodes.find(
    (node) => node.mediaContentType === 'MODEL_3D',
  );
  const images = product.media.nodes.filter(
    (node) => node.mediaContentType === 'IMAGE',
  );

  return (
    <section className="product-section">
      {isBlacklisted || !media3d ? (
        <Carousel images={images} />
      ) : (
        <div className="product-header-container">
          <ModelViewer
            data={media3d}
            style={{
              width: 0,
              height: 0,
            }}
            onLoad={() => setLoading(false)}
            onProgress={(e) => {
              setProgress(e.detail.totalProgress);
            }}
          />
          <model-viewer
            src={media3d.sources.find((source) => source.format === 'glb').url}
            camera-controls
            style={{
              width: '100vw',
              height: '35vh',
              minHeight: '400px',
              maxHeight: '800px',
            }}
            ar
            ar-modes="webxr scene-viewer quick-look"
            environment-image={require('../../public/test-sphere.jpg')}
            skybox-image={require('../../public/test-sphere-3.png')}
          />
        </div>
      )}
      <section className="main-content-container container">
        <ProductInfoContainer
          title={product.title}
          subtitle={product.subtitle}
          description={product.description}
          selectedVariant={selectedVariant}
        />

        <AddToCartContainer shop={shop} selectedVariant={selectedVariant} />
      </section>
      <TechSpecs specsJson={product.metafield.value} />
    </section>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    shop {
      primaryDomain {
        url
      }
    }
    product(handle: $handle) {
      id
      title
      media(first: 100) {
        nodes {
          mediaContentType
          alt
          previewImage {
            altText
            height
            id
            url
            width
          }
          ... on Model3d {
            mediaContentType
            __typename
            id
            alt
            presentation{
              asJson(format: MODEL_VIEWER)
              id
            }
            previewImage{
              altText
              height
              url
              width
            }
            sources{
              __typename
              filesize
              format
              mimeType
              url
            }
          }
        }
      }
      handle
      vendor
      description
      descriptionHtml
      metafield(namespace: "custom", key:"tech_specs" ) {
        value
      }
      subtitle: metafield(namespace: "custom", key:"subtitle" ) {
        value
      }
      featuredImage {
        id
        url
        altText
        width
        height
      }
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
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
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
