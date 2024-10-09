import { useNavigation } from "react-router-dom";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import Categories from "../components/Categories";
import ReviewSection from "../components/ReviewSection";
import Products from "../components/ProductsSlider";
import { Helmet } from "react-helmet-async";

function Homepage() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Helmet>
        <title>
          Farmacia Iziapharm | Farmacie cu laborator pentru tratamente
          personalizate pentru uz uman sau veterinar în București și România
        </title>
        <meta
          name="description"
          content="Farmacia Iziapharm din București oferă o varietate de tratamente personalizate pentru oameni și animale și o gamă largă de medicamente. Consultanță farmaceutică și soluții variate pentru sănătatea tuturor!"
        />
        <meta
          name="keywords"
          content="Farmacia Iziapharm, tratamente personalizate, opțiuni variate tratamente, farmacie București, farmacie România, medicamente, preparate farmaceutice, rețete personalizate, medicamente pentru animale, tratamente veterinare, farmacie pentru oameni și animale, farmacie cu preparate speciale, farmacie în București și România, tratament animale, tratament, farmacie cu laborator"
        />
      </Helmet>
      <div>
        {isLoading && <Loader />}
        <Hero />
        <Categories />
        <Products />
        <ReviewSection />
      </div>
    </>
  );
}

export default Homepage;
