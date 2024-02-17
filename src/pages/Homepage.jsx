import { useNavigation } from "react-router-dom";
import Hero from "../components/Hero";
import Loader from "../components/Loader";

import Nav from "../components/Nav";
import Categories from "../components/Categories";

function Homepage() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading && <Loader />}
      <Nav />
      <Hero />
      <Categories />
    </div>
  );
}

export default Homepage;
