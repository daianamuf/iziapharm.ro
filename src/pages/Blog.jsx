import { useEffect, useState } from "react";
import BlockContent from "@sanity/block-content-to-react";

function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const query = encodeURIComponent('*[_type == "post"]');
    const url = `https://c9cs4cyr.api.sanity.io/v1/data/query/production?query=${query}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setPosts(data.result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.publishedAt}</p>
          <BlockContent
            className="blog"
            blocks={post.body}
            projectId="c9cs4cyr"
            dataset="production"
          ></BlockContent>
        </div>
      ))}
    </div>
  );
}

export default Blog;
