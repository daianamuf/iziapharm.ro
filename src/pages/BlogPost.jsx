import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import FlyingLeaf from "../components/FlyingLeaf";

const serializers = {
  types: {
    block: (props) => {
      switch (props.node.style) {
        case "h1":
          return <h1 className="post__heading">{props.children}</h1>;
        case "h2":
          return <h2 className="post__heading--secondary">{props.children}</h2>;
        case "blockquote":
          return (
            <blockquote className="post__blockquote">
              {props.children}
            </blockquote>
          );
        default:
          return <p className="post__content">{props.children}</p>;
      }
    },
    list: ({ children }) => <ul className="post__list">{children}</ul>,
    listItem: ({ children }) => (
      <li className="post__list--item">{children}</li>
    ),
    image: ({ node }) => (
      <img
        className="post__img"
        src={node.mainImageUrl}
        alt={node.alt || " "}
      />
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="post__strong">{children}</strong>
    ),
    em: ({ children }) => <em className="post__em">{children}</em>,
    underline: ({ children }) => (
      <span
        style={{ textDecoration: "underline" }}
        className="post__span post__span--underline"
      >
        {children}
      </span>
    ),
    strikeThrough: ({ children }) => (
      <span
        style={{ textDecoration: "line-through" }}
        className="post__span post__span--strike"
      >
        {children}
      </span>
    ),
    code: ({ children }) => <code>{children}</code>,
    link: ({ mark, children }) => {
      return (
        <a
          href={mark.href}
          target={mark.blank ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="post__link"
        >
          {children}
        </a>
      );
    },
  },
  list: (props) => {
    if (props.type === "bullet") {
      return <ul className="post__list">{props.children}</ul>;
    }

    return <ol className="post__numberedlist">{props.children}</ol>;
  },
};

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = encodeURIComponent(
      `*[_type == "post" && slug.current == "${slug}"]{
        _id,
        title,
        "slug": slug.current,
        "authorName": author->name,
        "authorImage": author->image.asset->url,
        "mainImageUrl": mainImage.asset->url,
        categories[]->{title},
        publishedAt,
        body
      }`
    );
    const url = `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then(({ result }) => {
        if (result?.length > 0) {
          setPost(result[0]);
        } else {
          setError("Product not found.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching post.");
        setIsLoading(false);
      });
  }, [slug]);

  const formatData = (publishedAt) => {
    const date = new Date(publishedAt);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    if (!publishedAt) {
      return "";
    }

    return `${day}/${month}/${year}`;
  };

  if (isLoading) return <Loader />;
  if (!post) return <Error message={error} />;

  return (
    <>
      <FlyingLeaf className="post__leaf" />
      <article className="post slideFromLeft">
        <img src={post.mainImageUrl} alt={post.title} className="post__img" />
        <h1 className="post__heading">{post.title}</h1>
        <div className="post__text">
          <p className="post__info">
            {post.authorName}, {formatData(post.publishedAt)}
          </p>
          <BlockContent
            blocks={post.body}
            serializers={serializers}
            projectId="c9cs4cyr"
            dataset="production"
            className="post__content"
          />
        </div>
        <Link to={"/blog"} className="product__details--btn post__btn--back">
          Înapoi
        </Link>
      </article>
    </>
  );
}

export default BlogPost;
