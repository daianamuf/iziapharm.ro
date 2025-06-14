import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SANITY_PROJECT_ID = "c9cs4cyr";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "v1";
const SANITY_QUERY = `*[_type == "post"]{ "slug": slug.current }`;

const BASE_URL = "https://farmacia-iziapharm.ro";
const sitemapPath = path.join(__dirname, "public", "sitemap.xml");

const fetchBlogPosts = async () => {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(
    SANITY_QUERY
  )}`;
  try {
    console.log("Fetching blog posts from Sanity...");
    const response = await axios.get(url);
    console.log("Blog posts fetched:", response.data.result);
    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
};

const generateSitemap = (pages) => {
  console.log("Generating sitemap...");
  const urls = pages
    .map((page) => `<url><loc>${BASE_URL}${page}</loc></url>`)
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  console.log("Sitemap generated:", sitemap);
  return sitemap;
};

const main = async () => {
  try {
    const blogPosts = await fetchBlogPosts();
    const dynamicPaths = blogPosts.map((post) => `/blog/${post.slug}`);

    const staticPaths = [
      "/",
      "/rezultate",
      "/cumcomand",
      "/comanda",
      "/produse",
      "/review",
      "/blog",
      "/contact",
    ];

    const allPaths = [...staticPaths, ...dynamicPaths];
    console.log("All paths:", allPaths);

    const sitemap = generateSitemap(allPaths);

    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Sitemap saved at ${sitemapPath}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

main();
