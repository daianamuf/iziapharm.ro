import { useEffect, useState } from "react";
// import BlockContent from "@sanity/block-content-to-react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const query = encodeURIComponent(`*[_type == "post"]{
      _id,
      title,
      "slug": slug.current,
      "authorName": author->name,
      "authorImage": author->image.asset->url,
      "mainImageUrl": mainImage.asset->url,
      categories[]->{title},
      publishedAt,
      body
     }
     `);
    const url = `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setPosts(data.result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (isLoading) return <Loader />;

  return (
    <div className="blog">
      <h1 className="blog__heading">Blog</h1>
      <p className="blog__page">Pagina {currentPage}</p>
      <section className="blog__posts">
        {currentPosts.map((post) => (
          <div key={post._id} className="blog__post">
            <Link to={`/blog/${post.slug}`} className="blog__post--btn">
              <img
                src={post.mainImageUrl}
                alt={post.title}
                className="blog__post--img"
              />

              <h1 className="blog__post--heading">{post.title}</h1>
              <p className="blog__post--publishedAt">
                {post.authorName}, {formatData(post.publishedAt)}
              </p>
            </Link>
          </div>
        ))}
      </section>

      <div className="blog__pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            // className=""
            className={
              currentPage === index + 1
                ? "blog__pagination--btn blog__pagination--active"
                : "blog__pagination--btn"
            }
            key={index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Blog;
