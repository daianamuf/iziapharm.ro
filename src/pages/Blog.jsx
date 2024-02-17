import { useEffect, useState } from "react";
// import BlockContent from "@sanity/block-content-to-react";
import { Link } from "react-router-dom";

function Blog() {
  const [posts, setPosts] = useState([]);
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
      })
      .catch((error) => console.error("Error fetching data:", error));
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

  return (
    <div className="blog">
      <h1 className="blog__heading">Blog</h1>
      <section className="blog__posts">
        {posts.map((post) => (
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
    </div>
  );
}

export default Blog;
