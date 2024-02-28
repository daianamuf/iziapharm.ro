import { Funnel } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [fieldFilter, setFieldFilter] = useState("");
  const [administrationFilter, setAdministrationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [fields, setFields] = useState([]);
  const [administrations, setAdministrations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
        setFilteredProducts(data.result);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch medical fields
    const fieldsQuery = encodeURIComponent(
      '*[_type == "medicalField"]{_id,fieldName}'
    );
    const fieldsUrl = `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${fieldsQuery}`;

    fetch(fieldsUrl)
      .then((res) => res.json())
      .then((data) => {
        setFields(data.result);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching medical fields:", error));

    // Fetch routes of administration
    const administrationsQuery = encodeURIComponent(
      '*[_type == "routeOfAdministration"]{_id,routeName}'
    );
    const administrationsUrl = `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${administrationsQuery}`;

    fetch(administrationsUrl)
      .then((res) => res.json())
      .then((data) => {
        setAdministrations(data.result);
        setIsLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching routes of administration:", error)
      );
  }, []);

  useEffect(() => {
    let tempProducts = products;

    if (fieldFilter) {
      tempProducts = tempProducts.filter(
        (product) => product.field.fieldName === fieldFilter
      );
    }

    if (administrationFilter) {
      tempProducts = tempProducts.filter(
        (product) => product.administration.routeName === administrationFilter
      );
    }

    if (sortOrder === "lowToHigh") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "highToLow") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentFilteredProducts = tempProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setTotalPages(Math.ceil(products.length / productsPerPage));

    setFilteredProducts(currentFilteredProducts);
  }, [
    products,
    fieldFilter,
    administrationFilter,
    sortOrder,
    currentPage,
    productsPerPage,
  ]);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="product__page">
      <h1 className="product__page--heading">Produse</h1>

      <button className="product__page--filter-btn" onClick={toggleFilter}>
        <Funnel />
      </button>
      {isOpen && (
        <div className="product__page--filter">
          <select onChange={(e) => setFieldFilter(e.target.value)}>
            <option value="">Categorie</option>
            {fields.map((field) => (
              <option key={field._id} value={field.fieldName}>
                {field.fieldName}
              </option>
            ))}
          </select>
          <select onChange={(e) => setAdministrationFilter(e.target.value)}>
            <option value="">Cale de administrare</option>
            {administrations.map((admin) => (
              <option key={admin._id} value={admin.routeName}>
                {admin.routeName}
              </option>
            ))}
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Preț</option>
            <option value="lowToHigh">Crescător</option>
            <option value="highToLow">Descrescător</option>
          </select>
        </div>
      )}

      <section className="products">
        {filteredProducts.length === 0 ? (
          <div className="productEl__text">
            <p>
              Momentan, nu există produse care să corespundă criteriilor
              selectate.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div className="productEl" key={product._id}>
              <Link
                to={`/produse/${product.slug}`}
                className="productEl__btn underline_animation_hover--green"
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
                Vezi produs
              </Link>
            </div>
          ))
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
