import { useNavigation } from "react-router-dom";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import Categories from "../components/Categories";
import ReviewSection from "../components/ReviewSection";
import Products from "../components/ProductsSlider";

function Homepage() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading && <Loader />}
      <Hero />
      <Categories />
      <Products />
      <ReviewSection />
    </div>
  );
}

export default Homepage;
