import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTreshold = totalHeight * 0.05;

      setIsScrolling(scrollPosition > scrollTreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav ${isScrolling ? "nav-fixed" : ""}`}>
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
        className={`nav__logo ${isScrolling ? "nav__logo-fixed" : ""}`}
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
          to={"/produse"}
          className="nav__link underline_animation_hover--green"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
