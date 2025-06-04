import { Clock, Envelope, MapPin, Phone } from "@phosphor-icons/react";
import Map from "../components/Map";
import { Helmet } from "react-helmet-async";

function Contact() {
  return (
    <>
      <Helmet>
        <title>
          Contactează Farmacia Iziapharm – Tratamente Personalizate și
          Consultanță Farmaceutică
        </title>
        <meta
          name="description"
          content="Contactează Farmacia Iziapharm pentru tratamente personalizate și produse farmaceutice. Suntem aici pentru a răspunde întrebărilor tale și pentru a oferi suport medical și farmaceutic. Echipa noastră este dedicată sănătății pacienților din București și România."
        />
        <meta
          name="keywords"
          content="contact Farmacia Iziapharm, contactează farmacie București, tratamente personalizate, consultanță farmaceutică, suport clienți farmacie, contact farmacie București și România, farmacie cu preparate personalizate, contact farmacist"
        />
      </Helmet>
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
          <div className="contact__info--el">
            <Clock className="contact__info--icon" />
            <div className="contact__program">
              <p>Luni - Vineri: 09:00 - 17:00</p>
              <p>Sâmbătă: 09:00 - 14:00</p>
              <p>Duminică: ÎNCHIS</p>
            </div>
          </div>
          <div className="contact__info--el">
            <MapPin className="contact__info--icon" />
            <p>Strada Nițu Vasile 9, București</p>
          </div>
        </section>

        <section className="contact__map">
          <Map />
        </section>
      </div>
    </>
  );
}

export default Contact;
