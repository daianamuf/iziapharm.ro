import { Envelope, MapPin, Phone } from "@phosphor-icons/react";
import Map from "../components/Map";

function Contact() {
  return (
    <div className="contact">
      <h1 className="contact__heading">Contact</h1>
      <section className="contact__info">
        <div className="contact__info--el">
          <Phone className="contact__info--icon" />
          <p>0768 070 630</p>
        </div>
        <div className="contact__info--el">
          <Phone className="contact__info--icon" />
          <p>031 420 99 14</p>
        </div>
        <div className="contact__info--el">
          <Envelope className="contact__info--icon" />
          <p>iziapharm@gmail.com</p>
        </div>
        <p>PROGRAM</p>
        <div className="contact__info--el">
          <MapPin className="contact__info--icon" />
          <p>
            Cartier Solar, B-dul Metalurgiei, nr. 132, bl. A, spațiul comercial
            nr. 6{" "}
          </p>
        </div>
      </section>

      <section className="contact__map">
        <Map />
      </section>
    </div>
  );
}

export default Contact;
