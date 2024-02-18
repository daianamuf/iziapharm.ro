import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const query = encodeURIComponent(`*[_type == "product"]{
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      field->{
        fieldName
      },
      administration->{
        routeName
      },
      "image": images[].asset->url, 
    }`);
    const url = `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${query}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setProducts(data.result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="products">
      <h1 className="products__heading">Produse</h1>
      {products.map((product) => (
        <div className="product" key={product._id}>
          <Link className="product__btn underline_animation_hover--green">
            <h2 className="product__heading">{product.name}</h2>
            <img className="product__img" src={product.image} />
            <div className="product__content">
              <p className="product__text field">{product.field.fieldName}</p>
              <p className="product__text administration">
                {product.administration.routeName}
              </p>
              <p className="product__text price">{product.price} RON</p>
            </div>
            Vezi produs
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Products;
