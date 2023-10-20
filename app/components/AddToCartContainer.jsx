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
        <div className="variation-options">
          {/* if colors */}
          <div className="variation-option">
            <label htmlFor="color">Color</label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-aroundnnbge ',
              }}
            >
              <div>
                <input
                  className="add-to-cart-color-radio-input"
                  type="radio"
                  id="grey"
                  name="color"
                  value="grey"
                  checked
                />
                <label for="grey">grey</label>
              </div>
              <div>
                <input
                  className="add-to-cart-color-radio-input"
                  type="radio"
                  id="blue"
                  name="color"
                  value="blue"
                  checked
                />
                <label for="blue">blue</label>
              </div>
              <div>
                <input
                  className="add-to-cart-color-radio-input"
                  type="radio"
                  id="black"
                  name="color"
                  value="black"
                  checked
                />
                <label for="black">black</label>
              </div>
            </div>
          </div>
        </div>
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
