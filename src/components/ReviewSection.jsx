import { Leaf, Quotes } from "@phosphor-icons/react";

const reviews = [
  {
    id: 1,
    name: "Andreea Bogîldea",
    review:
      "Produsele preparate în această farmacie sunt excepționale. Ce am cumpărat a fost chiar peste măsura așteptărilor. Recomand cu încredere!",
  },
  {
    id: 2,
    name: "Gina Neculaes",
    review:
      "Prin prisma profesiei iau des contact cu farmacii, insa aici am gasit mult mai mult decat partea comerciala. Profesionalism, empatie, promptitudine, incredere si comunicare sunt cuvinte ce definesc real staff'ul farmaciei. Daca as locui in Bucuresti as veni si de drag in vizita, nu doar la nevoie.😊",
  },
  {
    id: 3,
    name: "Carpen Daniela",
    review:
      "Nu doar ca am gasit aici preparatul de care aveam nevoie, pentru care ar fi trebuit sa alerg tot Bucureștiul poate si nu  e sigur ca as fi reusit sa il gasesc, dar suportul Izabelei, zambetul si prietenia pe care le da bonus impreuna cu tratamentele eliberate nu pot fi achizitionate de niciunde altundeva. Multumim, Iza!",
  },
];

function ReviewSection() {
  return (
    <section className="reviews">
      {reviews.map((rev) => {
        return (
          <div key={rev.id} className="rev">
            <p className="rev__name">
              <Leaf className="rev__name--icon" />
              {rev.name}
            </p>
            <div className="rev__review">
              <p className="rev__review--text">
                <Quotes weight="fill" className="rev__review--quotes" />
                {rev.review}
                <Quotes weight="fill" className="rev__review--quotes" />
              </p>
            </div>
          </div>
        );
      })}
      <a
        className="reviews__link underline_animation_hover--green"
        href="https://www.facebook.com/Iziapharm/reviews"
        target="_blank"
        rel="noreferrer"
      >
        Mai multe recenzii
      </a>
    </section>
  );
}

export default ReviewSection;
