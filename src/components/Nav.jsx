import { Leaf, List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Nav({ menuOpen, setMenuOpen, toggleMenu }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [media, setMedia] = useState(window.innerWidth <= 1040);

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
          <Link
            className="nav__sidebar--link"
            onClick={() => setMenuOpen(false)}
          >
            <Leaf className="nav__sidebar--icon" />
            Comandă
          </Link>
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
      </nav>
    );

  return (
    <nav className={`nav ${isScrolling ? "nav-scrolling" : ""}`}>
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
        <Link className="nav__link underline_animation_hover--green">
          Comandă
        </Link>
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
};

export default Nav;
