import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("ScrollBehindOffIOS");
    } else {
      document.body.style.overflow = "visibile";
      document.body.classList.remove("ScrollBehindOffIOS");
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuOpen &&
        !event.target.closest(".nav__sidebar") &&
        !event.target.closest(".nav__menu--btn")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={menuOpen ? "wrapper wrapper__blur" : "wrapper"}>
      <Nav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        toggleMenu={toggleMenu}
      />
      {isLoading && <Loader />}

      <div
        onClick={() => setMenuOpen(false)}
        className={menuOpen ? "content blur" : "content"}
      >
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;
