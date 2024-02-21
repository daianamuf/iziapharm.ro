import { useNavigation } from "react-router-dom";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import Categories from "../components/Categories";
import ReviewSection from "../components/ReviewSection";

function Homepage() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading && <Loader />}
      <Hero />
      <Categories />
      <ReviewSection />
    </div>
  );
}

export default Homepage;
