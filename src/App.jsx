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
      {
        path: "/produse",
        element: <Products />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
