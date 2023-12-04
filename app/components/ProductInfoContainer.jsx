import {Money} from '@shopify/hydrogen-react';

function ProductInfoContainer({title, selectedVariant}) {
  return (
    <div className="product-info-container column">
      <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
      <Money
        withoutTrailingZeros
        data={selectedVariant.price}
        className="text-xl font-semibold mb-2"
        style={{marginBottom: '1rem'}}
      />
      <p>
        Widemouse is the ultimate fusion of comfort, performance, and style,
        designed to take your gaming experience to the next level. Say goodbye
        to the limitations of your current mouse and embrace a new era of gaming
        excellence. Elevate your gameplay, seize victory, and become the player
        you've always aspired to be with the Widemouse - your ultimate gaming
        companion.
      </p>
    </div>
  );
}

export default ProductInfoContainer;
