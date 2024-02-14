import { Outlet, useNavigation } from "react-router-dom";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="wrapper">
      <Nav />
      {isLoading && <Loader />}

      <div>
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;
