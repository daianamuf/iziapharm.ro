import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, createContext, lazy, useState } from "react";
import Loader from "./components/Loader";
import AppLayout from "./AppLayout";
import Error from "./components/Error";
import { HelmetProvider } from "react-helmet-async";
const Homepage = lazy(() => import("./pages/Homepage"));
const Results = lazy(() => import("./pages/Results"));
const Review = lazy(() => import("./pages/Review"));
const Blog = lazy(() => import("./pages/Blog"));
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ProductPost = lazy(() => import("./pages/ProductPost"));
const OrderForm = lazy(() => import("./pages/OrderForm"));
const OrderSteps = lazy(() => import("./pages/OrderSteps"));

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
        path: "/rezultate",
        element: (
          <Suspense fallback={<Loader />}>
            <Results />,
          </Suspense>
        ),
      },
      {
        path: "/review",
        element: (
          <Suspense fallback={<Loader />}>
            <Review />,
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<Loader />}>
            <Blog />,
          </Suspense>
        ),
      },
      {
        path: "/blog/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <BlogPost />
          </Suspense>
        ),
      },
      {
        path: "/produse",
        element: (
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/produse/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductPost />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/comanda",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderForm />
          </Suspense>
        ),
      },
      {
        path: "/cumcomand",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderSteps />
          </Suspense>
        ),
      },
    ],
  },
]);

export const OrderContext = createContext();

function App() {
  const [vet, setVet] = useState(false);
  const [needsPrescription, setNeedsPrescription] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [choiceOpen, setChoiceOpen] = useState(false);

  const orderContextValue = {
    vet,
    setVet,
    needsPrescription,
    setNeedsPrescription,
    modalOpen,
    setModalOpen,
    choiceOpen,
    setChoiceOpen,
  };
  return (
    <HelmetProvider>
      <OrderContext.Provider value={orderContextValue}>
        <RouterProvider router={router} />
      </OrderContext.Provider>
    </HelmetProvider>
  );
}

export default App;
