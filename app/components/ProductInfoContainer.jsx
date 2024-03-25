function ProductInfoContainer({title, subtitle, description}) {
  return (
    <div className="product-info-container column">
      <h1 style={{fontSize: '2.5rem', marginBottom: 0}}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h1>
      <h3 style={{marginTop: 0}}>{subtitle.value}</h3>

      <p>{description}</p>
    </div>
  );
}

export default ProductInfoContainer;
