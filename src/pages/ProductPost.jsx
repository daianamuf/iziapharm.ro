import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import BlockContent from "@sanity/block-content-to-react";

const serializers = {
  types: {
    block: ({ node, children }) => {
      switch (node.style) {
        case "h1":
          return <h1 className="product__heading">{children}</h1>;
        case "h2":
          return <h2 className="product__subheading">{children}</h2>;
        case "blockquote":
          return (
            <blockquote className="product__blockquote">{children}</blockquote>
          );
        default:
          return <p className="product__content">{children}</p>;
      }
    },
    list: ({ children, type }) => {
      if (type === "bullet") {
        return <ul className="product__list">{children}</ul>;
      }
      return <ol className="product__numberedlist">{children}</ol>;
    },
    listItem: ({ children }) => (
      <li className="product__listitem">{children}</li>
    ),
    image: ({ node }) => (
      <img
        className="product__image"
        src={node.mainImageUrl} // Adjust this according to your data structure
        alt={node.alt || ""} // Adjust this according to your data structure
      />
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="product__strong">{children}</strong>
    ),
    em: ({ children }) => <em className="product__em">{children}</em>,
    underline: ({ children }) => (
      <span className="product__underline">{children}</span>
    ),
    strikeThrough: ({ children }) => (
      <span className="product__strike">{children}</span>
    ),
    code: ({ children }) => <code className="product__code">{children}</code>,
    link: ({ mark, children }) => (
      <a
        href={mark.href}
        target={mark.blank ? "_blank" : "_self"}
        rel={mark.blank ? "noopener noreferrer" : ""}
        className="product__link"
      >
        {children}
      </a>
    ),
  },
};

function ProductPost() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const query =
      encodeURIComponent(`*[_type == "product" && slug.current == "${slug}"]{
      _id,
      name,
      description,
      price,
      "slug": slug.current,
      "field":field->{
        fieldName
      },
      "administration":administration->{
        routeName
      },
      "imageUrls": images[].asset->url,
    }`);
    const url = `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.result?.length > 0) {
          setProduct(data.result[0]);
        } else {
          setError("Product not found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Error fetching product");
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <>
      <div className="product__details ">
        {product ? (
          <>
            <h1 className="product__details--heading">{product.name}</h1>
            <img
              className="product__details--img"
              src={product.imageUrls[0]}
              alt={product.name}
            />
            <div className="product__details--content">
              <p className="product__details--text">
                {product.field.fieldName}
              </p>
              <p className="product__details--text">
                Cale de administrare: {product.administration.routeName}
              </p>
              <p className="product__details--text product__details--price">
                Preț: {product.price} RON
              </p>
              <BlockContent
                className="product__details--description"
                blocks={product.description}
                serializers={serializers}
                projectId="c9cs4cyr"
                dataset="production"
              />
            </div>
          </>
        ) : (
          <p className="product__text">Product not found.</p>
        )}
        <Link to={"/produse"} className="product__details--btn ">
          Înapoi
        </Link>
      </div>
    </>
  );
}

export default ProductPost;
