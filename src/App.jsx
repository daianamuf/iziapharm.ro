import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
// import Homepage from "./pages/Homepage";
const Homepage = lazy(() => import("./pages/Homepage"));
import Loader from "./components/Loader";
import About from "./pages/About";
import AppLayout from "./AppLayout";
import Error from "./components/Error";
import Review from "./pages/Review";
import Blog from "./pages/Blog";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import BlogPost from "./pages/BlogPost";
import ProductPost from "./pages/ProductPost";
import OrderForm from "./pages/OrderForm";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Homepage />,
          </Suspense>
        ),
      },
      {
        path: "/despre",
        element: <About />,
      },
      {
        path: "/review",
        element: <Review />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      { path: "/blog/:slug", element: <BlogPost /> },
      {
        path: "/produse",
        element: <Products />,
      },
      {
        path: "/produse/:slug",
        element: <ProductPost />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/comanda",
        element: <OrderForm />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
