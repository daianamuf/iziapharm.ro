import { ArrowCircleRight, ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const productsPerPage = 5;

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
        setDisplayedProducts(data.result.slice(0, productsPerPage));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(displayedProducts.length);

  const handleNextClick = () => {
    setDisplayedProducts((currentProducts) => {
      const newProducts = [...currentProducts];
      newProducts.push(newProducts.shift());
      return newProducts;
    });
  };

  //   const handlePrevClick = () => {
  //     setDisplayedProducts((currentProducts) => {
  //             if (!currentProducts || currentProducts.length <= 1) {
  //         return currentProducts;
  //       }

  //       const newProducts = [
  //         currentProducts[currentProducts.length - 1],
  //         ...currentProducts.slice(0, -1),
  //       ];
  //       return newProducts;
  //     });
  //   };

  return (
    displayedProducts.length === 5 && (
      <div className="productsSliderSection">
        {/* <button
        className="productsSliderSection__btn productsSliderSection__btn--left"
        onClick={handlePrevClick}
      >
        Prev
      </button> */}
        <section className="products__slider">
          {displayedProducts.map((product, index) => (
            <div
              className={`productEl products__slider--item products__slider--item-${
                index + 1
              }`}
              key={product._id}
            >
              <Link
                to={index === 2 ? `/produse/${product.slug}` : "#"}
                className={`productEl__btn ${
                  index === 2 ? "underline_animation_hover--green" : ""
                }`}
                style={
                  index !== 2 ? { cursor: "default" } : { cursor: "pointer" }
                }
              >
                <h2 className="productEl__heading">{product.name}</h2>
                <img
                  className="productEl__img"
                  src={product.image}
                  alt={product.name}
                />
                <div className="productEl__content">
                  <p className="productEl__text field">
                    {product.field.fieldName}
                  </p>
                  <p className="productEl__text administration">
                    {product.administration.routeName}
                  </p>
                  <p className="productEl__text price">{product.price} RON</p>
                </div>
                <p className={`${index === 2 ? "visible" : "hidden"}`}>
                  Vezi produs
                </p>
              </Link>
            </div>
          ))}
        </section>
        <button
          className="productsSliderSection__btn productsSliderSection__btn--right"
          onClick={handleNextClick}
        >
          <ArrowCircleRight weight="fill" />
        </button>
        <Link
          to={"/produse"}
          className="productsSliderSection__link underline_animation_hover--green"
        >
          Mai multe produse <ArrowRight />
        </Link>
      </div>
    )
  );
}

export default Products;
