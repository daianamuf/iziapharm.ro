import { Leaf, List, X } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart } from "../cart/cartSlice";
import OpenCart from "../cart/OpenCart";
import Cart from "../cart/Cart";
import { OrderContext } from "../App";

function Nav({ menuOpen, setMenuOpen, toggleMenu, cartOpen, setCartOpen }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [media, setMedia] = useState(window.innerWidth <= 1110);
  const cart = useSelector(getCart);
  const { setChoiceOpen } = useContext(OrderContext);
  const navigate = useNavigate();

  const handleOrderClick = () => {
    setMenuOpen(false);
    if (cart.length === 0) {
      setChoiceOpen(true);
      navigate("/comanda");
    } else {
      setChoiceOpen(false);
      navigate("/comanda");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTreshold = totalHeight * 0.05;

      setIsScrolling(scrollPosition > scrollTreshold);
    };

    const handleResize = () => {
      setMedia(window.innerWidth <= 1024);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (media)
    return (
      <nav className={`nav ${isScrolling ? "nav-scrolling" : ""}`}>
        <button className="nav__menu--btn" onClick={() => toggleMenu()}>
          <List />
        </button>
        <Link
          to={"/"}
          className={`nav__logo ${isScrolling ? "nav__logo--scrolling" : ""} ${
            menuOpen ? "nav__logo--blur" : ""
          }`}
        >
          <img
            src="/assets/logo/logo2_transparent.png"
            className={`nav__logo--img ${isScrolling ? "hidden" : ""}`}
          />
          <img
            src="/assets/logo/logo3-green-transparent.png"
            className={`nav__logo--img ${!isScrolling ? "hidden" : ""}`}
          />
        </Link>

        <div className={`nav__sidebar ${menuOpen ? "nav__sidebar--open" : ""}`}>
          <button
            className="nav__sidebar--btn"
            onClick={() => setMenuOpen(false)}
          >
            <X />
          </button>
          <Link
            to={"/despre"}
            className="nav__sidebar--link"
            onClick={() => setMenuOpen(false)}
          >
            <Leaf className="nav__sidebar--icon" />
            Despre Iziapharm
          </Link>
          <Link
            className="nav__sidebar--link"
            onClick={() => setMenuOpen(false)}
          >
            <Leaf className="nav__sidebar--icon" />
            Cum comand?
          </Link>
          <button className="nav__sidebar--link" onClick={handleOrderClick}>
            <Leaf className="nav__sidebar--icon" />
            Comandă
          </button>
          <Link
            to={"/produse"}
            className="nav__sidebar--link"
            onClick={() => setMenuOpen(false)}
          >
            <Leaf className="nav__sidebar--icon" />
            Produse
          </Link>
          <Link
            to={"/review"}
            className="nav__sidebar--link"
            onClick={() => setMenuOpen(false)}
          >
            <Leaf className="nav__sidebar--icon" />
            Lasă un review
          </Link>
          <Link
            to={"/blog"}
            className="nav__sidebar--link"
            onClick={() => setMenuOpen(false)}
          >
            <Leaf className="nav__sidebar--icon" />
            Blog
          </Link>
          <Link
            to={"/contact"}
            className="nav__sidebar--link "
            onClick={() => setMenuOpen(false)}
          >
            <Leaf className="nav__sidebar--icon" />
            Contact
          </Link>
        </div>
        {cart.length > 0 && (
          <OpenCart
            cartOpen={cartOpen}
            onClick={() => setCartOpen(true)}
            classname="nav__cart--smallMedia"
          />
        )}
        {cartOpen && <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />}
      </nav>
    );

  return (
    <nav className={`nav ${isScrolling ? "nav-scrolling" : ""}`}>
      {cart.length > 0 && (
        <OpenCart
          onClick={() => setCartOpen(true)}
          classname="nav__cart--bigMedia"
        />
      )}
      {cartOpen && <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />}
      <div className="nav__order">
        <Link
          to={"/despre"}
          className="nav__link underline_animation_hover--green"
        >
          Despre Iziapharm
        </Link>
        <Link className="nav__link underline_animation_hover--green">
          Cum comand?
        </Link>
        <button
          className="nav__link underline_animation_hover--green"
          onClick={handleOrderClick}
        >
          Comandă
        </button>
      </div>

      <Link
        to={"/"}
        className={`nav__logo ${isScrolling ? "nav__logo--scrolling" : ""}`}
      >
        <img
          src="/assets/logo/logo2_transparent.png"
          className={`nav__logo--img ${isScrolling ? "hidden" : ""}`}
        />
        <img
          src="/assets/logo/logo3-green-transparent.png"
          className={`nav__logo--img ${!isScrolling ? "hidden" : ""}`}
        />
      </Link>

      <div className="nav__other">
        <Link
          to={"/produse"}
          className="nav__link underline_animation_hover--green"
        >
          Produse
        </Link>
        <Link
          to={"/review"}
          className="nav__link underline_animation_hover--green"
        >
          Lasă un review
        </Link>
        <Link
          to={"/blog"}
          className="nav__link underline_animation_hover--green"
        >
          Blog
        </Link>
        <Link
          to={"/contact"}
          className="nav__link underline_animation_hover--green"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
Nav.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  cartOpen: PropTypes.bool.isRequired,
  setCartOpen: PropTypes.func.isRequired,
};

export default Nav;
