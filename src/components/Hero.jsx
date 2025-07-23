import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <img
        src="/assets/images/hero.jpeg"
        className="hero__img  "
      />
      <div className="hero__content">
        <h4 className="hero__heading">
          Din pasiune pentru prepararea farmaceutică
        </h4>
        <p className="hero__text">
          <span>Bună ziua,</span>
          <br></br>
          <span>
            Numele meu este Izabela și sunt farmacist. Din pasiune pentru
            această profesie și pentru valorile acesteia am creat IZIAPHARM, o
            farmacie cu suflet.
          </span>
        </p>
      </div>
    </section>
  );
}

export default Hero;
