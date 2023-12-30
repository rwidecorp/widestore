import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {BsPlus} from 'react-icons/bs';

export default function ProductCard({product}) {
  console.log(product);

  return (
    <>
      <Link style={{textDecoration: 'none'}} to={`/products/${product.handle}`}>
        <div className="collection-card-container">
          <Image
            className="collection-card-image"
            width="300px"
            aspectRatio="3/2"
            data={product.images.nodes[0]}
            alt={product.title}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '90%',
            }}
          >
            <p
              style={{
                fontSize: '1.25em',
                fontWeight: '600',
                marginBottom: '24px',
              }}
            >
              {product.title}
            </p>
            <p
              style={{
                fontSize: '1.15em',
                fontWeight: '400',
                marginBottom: '24px',
              }}
            >
              {`$${product.priceRange.maxVariantPrice.amount} ${product.priceRange.maxVariantPrice.currencyCode}`}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
