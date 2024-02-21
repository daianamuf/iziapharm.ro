import {
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react";

function Footer() {
  return (
    <footer className="footer">
      <img
        src="/assets/logo/logo3-gold-transparent.png"
        alt="Logo"
        className="footer__logo"
      />

      <div className="footer__info">
        <div className="footer__contact">
          <MapPin className="footer__contact--icon" />
          <p className="footer__contact--adress">
            Cartier Solar, B-dul Metalurgiei, nr. 132, bl. A, spațiul comercial
            nr. 6{" "}
          </p>
        </div>
        <div className="footer__contact">
          <Phone className="footer__contact--icon" />
          <p className="footer__contact--adress">
            0768 070 630 / 031 420 99 14
          </p>
        </div>
      </div>

      <div className="footer__media">
        <a
          href="https://www.instagram.com/iziapharm?igsh=YXc1ZGV3amFqazli"
          target="_blank"
          rel="noreferrer"
          className="footer__media--link"
        >
          <InstagramLogo className="footer__media--icon" />
        </a>
        <a
          href="https://www.facebook.com/Iziapharm"
          target="_blank"
          rel="noreferrer"
          className="footer__media--link"
        >
          <FacebookLogo className="footer__media--icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
