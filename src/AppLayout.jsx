import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="wrapper">
      <Nav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        toggleMenu={toggleMenu}
      />
      {isLoading && <Loader />}

      <div className={menuOpen ? "content blur" : "content"}>
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;
