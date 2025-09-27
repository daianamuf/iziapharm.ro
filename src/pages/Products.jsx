import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [fieldFilter, setFieldFilter] = useState("");
  const [administrationFilter, setAdministrationFilter] = useState("");
  const [sortOrder] = useState("");
  const [fields, setFields] = useState([]);
  const [administrations, setAdministrations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const query = encodeURIComponent(`*[_type == "product"]{
      _id,
      name,
      "slug": slug.current,
      description,
      field->{ fieldName },
      administration->{ routeName },
      "image": images[].asset->url
    }`);
    const url = `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.result || []);
        setFilteredProducts(data.result || []);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setIsLoading(false));

    const fieldsQuery = encodeURIComponent(
      '*[_type == "medicalField"]{_id,fieldName}'
    );
    fetch(
      `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${fieldsQuery}`
    )
      .then((res) => res.json())
      .then((data) => setFields(data.result || []))
      .catch((error) => console.error("Error fetching medical fields:", error));

    const administrationsQuery = encodeURIComponent(
      '*[_type == "routeOfAdministration"]{_id,routeName}'
    );
    fetch(
      `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${administrationsQuery}`
    )
      .then((res) => res.json())
      .then((data) => setAdministrations(data.result || []))
      .catch((error) =>
        console.error("Error fetching routes of administration:", error)
      );
  }, []);

  useEffect(() => {
    let temp = products;

    if (fieldFilter) {
      temp = temp.filter((p) => p.field?.fieldName === fieldFilter);
    }
    if (administrationFilter) {
      temp = temp.filter(
        (p) => p.administration?.routeName === administrationFilter
      );
    }

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const pageSlice = temp.slice(indexOfFirst, indexOfLast);

    setTotalPages(Math.max(1, Math.ceil(temp.length / productsPerPage)));
    setFilteredProducts(pageSlice);
  }, [
    products,
    fieldFilter,
    administrationFilter,
    sortOrder,
    currentPage,
    productsPerPage,
  ]);

  if (isLoading) return <Loader />;

  return (
    <div className="product__page">
      <h1 className="product__page--heading">Produse</h1>

      <div className="product__page--filter">
        <select
          value={fieldFilter}
          onChange={(e) => setFieldFilter(e.target.value)}
        >
          <option value="">Categorie</option>
          {fields.map((field) => (
            <option
              key={field._id}
              value={field.fieldName}
            >
              {field.fieldName}
            </option>
          ))}
        </select>

        <select
          value={administrationFilter}
          onChange={(e) => setAdministrationFilter(e.target.value)}
        >
          <option value="">Cale de administrare</option>
          {administrations.map((admin) => (
            <option
              key={admin._id}
              value={admin.routeName}
            >
              {admin.routeName}
            </option>
          ))}
        </select>
      </div>

      <section className="products">
        {filteredProducts.length === 0 ? (
          <div className="productEl__text">
            <p>
              Momentan, nu există produse care să corespundă criteriilor
              selectate.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const imgSrc = Array.isArray(product.image)
              ? product.image[0]
              : product.image;

            return (
              <div
                className="productEl"
                key={product._id}
              >
                <Link
                  to={`/produse/${product.slug}`}
                  className="productEl__btn"
                >
                  <h2 className="productEl__heading">{product.name}</h2>

                  {imgSrc && (
                    <img
                      className="productEl__img"
                      src={imgSrc}
                      alt={product.name}
                    />
                  )}

                  <div className="productEl__content">
                    <p className="productEl__text field">
                      {product.field?.fieldName}
                    </p>
                    <p className="productEl__text administration">
                      {product.administration?.routeName}
                    </p>
                  </div>
                  <span className="productEl__overlay">Vezi detalii</span>
                </Link>
              </div>
            );
          })
        )}
      </section>

      <div className="pagination">
        <p className="pagination__currentpage">Pagina {currentPage}</p>
        <div className="pagination__pages">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={
                currentPage === index + 1
                  ? "pagination__btn pagination__active"
                  : "pagination__btn"
              }
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
