import {
  Image,
  ShopPayButton,
  MediaFile,
  ModelViewer,
} from '@shopify/hydrogen-react';
import {CartForm} from '@shopify/hydrogen';

function AddToCartContainer({selectedVariant, shop}) {
  return (
    <div className="customize-and-add-to-cart-container column">
      <div className="action-buttons">
        <ShopPayButton
          storeDomain={shop.primaryDomain.url}
          variantIds={[selectedVariant?.id]}
          width={'100%'}
        />

        <CartForm
          route="/cart"
          inputs={{
            lines: [
              {
                merchandiseId: selectedVariant.id,
              },
            ],
          }}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher) => (
            <>
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
            </>
          )}
        </CartForm>
        {/* <button
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
          </button> */}
      </div>
    </div>
  );
}

export default AddToCartContainer;
