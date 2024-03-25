import {ShopPayButton, Money} from '@shopify/hydrogen-react';
import {CartForm} from '@shopify/hydrogen';
import {FaShippingFast} from 'react-icons/fa';

function AddToCartContainer({selectedVariant, shop}) {
  return (
    <div className="customize-and-add-to-cart-container column">
      <Money
        withoutTrailingZeros
        data={selectedVariant.price}
        style={{
          marginBottom: '1rem',
          fontSize: '1.25rem',
          fontWeight: 'bolder',
          marginBottom: '4px',
        }}
      />
      <p
        style={{
          fontSize: '0.9rem',
          marginBottom: '24px',
          color: '#c0c0c0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaShippingFast style={{marginRight: '0.5em'}} />
        Typically ships in 1-3 business days.
      </p>
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
