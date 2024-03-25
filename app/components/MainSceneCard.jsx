import {BsCaretRightFill} from 'react-icons/bs';
import {BsCaretLeftFill} from 'react-icons/bs';
import {CartForm} from '@shopify/hydrogen';

const handleDescriptionText = (description) => {
  return `${description.split('.')[0]}.`;
};

function MainSceneCard({
  selectedData,
  handlePreviousClick,
  handleNextClick,
  navigate,
}) {
  return (
    selectedData && (
      <div className="main-card-column">
        <div className="main-card">
          <h1>{selectedData.title}</h1>
          <p style={{marginBottom: '24px'}}>
            {handleDescriptionText(selectedData.description)}
          </p>
          <div className="main-card-button-container">
            <div
              style={{
                display: 'flex',
                marginRight: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <button
                onClick={() => handlePreviousClick()}
                className="button-reset main-card-prev main-card-button"
              >
                <BsCaretLeftFill />
                previous
              </button>
              <button
                onClick={() => navigate(`products/${selectedData.handle}`)}
                className="button-reset main-card-quick main-card-button"
              >
                learn more
              </button>
              <button
                onClick={() => handleNextClick()}
                className="button-reset main-card-next main-card-button"
              >
                next
                <BsCaretRightFill />
              </button>
            </div>
            <CartForm
              route="/cart"
              inputs={{
                lines: [
                  {
                    merchandiseId: selectedData.variants.nodes[0].id,
                  },
                ],
              }}
              action={CartForm.ACTIONS.LinesAdd}
            >
              <button
                className="button-reset main-card-quick main-card-button cta-button"
                type="submit"
              >
                <strong>add to cart</strong>
              </button>
            </CartForm>
          </div>
        </div>
      </div>
    )
  );
}

export default MainSceneCard;
