import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (menuOpen || cartOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("ScrollBehindOffIOS");
    } else {
      document.body.style.overflow = "visible";
      document.body.classList.remove("ScrollBehindOffIOS");
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [menuOpen, cartOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuOpen &&
        !e.target.closest(".nav__sidebar") &&
        !e.target.closest(".nav__menu--btn")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        cartOpen &&
        !e.target.closest(".cartOverview") &&
        !e.target.closest(".btn__openCart") &&
        !e.target.closest(".cart__message")
      ) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [cartOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={menuOpen || cartOpen ? "wrapper wrapper__blur" : "wrapper"}>
      <Nav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        toggleMenu={toggleMenu}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
      {isLoading && <Loader />}

      <div
        onClick={() => {
          setMenuOpen(false);
          setCartOpen(false);
        }}
        className={menuOpen || cartOpen ? "content blur" : "content"}
      >
        <main>
          <Outlet />
        </main>
      </div>

      <Footer cartOpen={cartOpen} />
    </div>
  );
}

export default AppLayout;
