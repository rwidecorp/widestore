import {
  Image,
  Money,
  ShopPayButton,
  MediaFile,
  ModelViewer,
} from '@shopify/hydrogen-react';

function AddToCartContainer({selectedVariant, shop}) {
  return (
    <div className="customize-and-add-to-cart-container column">
      <form className="customize-and-add-to-cart-form">
        <div className="action-buttons">
          <ShopPayButton
            storeDomain={shop.primaryDomain.url}
            variantIds={[selectedVariant?.id]}
            width={'100%'}
          />
          <button
            className="button-reset add-to-cart-button "
            type="submit"
            onClick={() => {
              window.location.href = window.location.href + '#cart-aside';
            }}
            disabled={
              !selectedVariant.availableForSale ?? fetcher.state !== 'idle'
            }
          >
            {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddToCartContainer;
