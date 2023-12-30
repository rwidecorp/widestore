import ProductCard from './ProductCard';

export default function ProductGrid({collection, url}) {
  return (
    <section>
      <div>
        {collection.nodes.map((node) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1 style={{marginBottom: '48px', marginTop: '12px'}}>
              {node.title}
            </h1>
            {node.products.nodes.length > 0 ? (
              <div className="collection-grid">
                {node.products.nodes.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p>Coming Soon!</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
