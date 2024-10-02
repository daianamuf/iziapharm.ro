import {
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  Pill,
} from "@phosphor-icons/react";

import PropTypes from "prop-types";

const documents = [
  {
    id: 1,
    title: "Politica de confidentialitate",
    url: "/assets/documents/Politica de confidentialitate-Iziapharm.pdf",
  },
  {
    id: 2,
    title: "Termeni si conditii",
    url: "/assets/documents/Termeni si conditii-Iziapharm.pdf",
  },
  {
    id: 3,
    title: "Politica de retur",
    url: "/assets/documents/Politica de retur Iziapharm.pdf",
  },
  {
    id: 4,
    title: "Cum se livreaza",
    url: "/assets/documents/Cum se livreaza-Iziapharm.pdf",
  },
];

function Footer({ cartOpen }) {
  return (
    <footer className={`footer ${cartOpen ? "blur content" : ""}`}>
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
        <p className="footer__contact">
          Autorizatie de functionare: MS 3588/IM4891/02.07.2021, CUI: 43125750
        </p>
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

      <ul className="footer__documents">
        {documents.map((doc) => (
          <li key={doc.id}>
            <Pill />
            <a href={doc.url} target="_blanck" rel="noopener noreferrer">
              {doc.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="footer__links">
        <a
          href="https://anpc.ro/ce-este-sal/"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0525/7248/7863/files/sigla-anpc-1024x483_480x480.png?v=1612802439"
            alt="Autoritatea Nationala pentru Protectia Consumatorului"
          />
        </a>
        <a
          href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          <img
            src="https://www.deplast-ambalaje.ro/wp-content/uploads/anpc-SOL.png"
            alt="Autoritatea Nationala pentru Protectia Consumatorului"
          />
        </a>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  cartOpen: PropTypes.bool.isRequired,
};

export default Footer;
