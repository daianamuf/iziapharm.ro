import { Pill } from "@phosphor-icons/react";
import useMultipleElementIntersectionObserver from "../useMultipleElementIntersectionObserver";

function About() {
  const { setElementRef, isVisible } = useMultipleElementIntersectionObserver({
    root: null,
    threshold: 0.6,
  });

  const sections = [
    {
      id: 1,
      img: "",
      text: "Am pus toată priceperea și viziunea mea și am dat naștere unui proiect foarte important pentru mine, o farmacie cu laborator modern,specializată în prepararea și formularea tratamentelor și cosmeticelor.",
    },
    {
      id: 2,
      img: "/assets/images/lab.jpeg",
      text: "Cu toții suntem profesioniști în domeniul medical și avem același scop, acela de a aduce în viețile pacientilor noștri tratamentele de care au nevoie. Medicii și farmaciștii au în centrul activității pacientul și actionează dupa principiul 'Primum non nocere'.",
    },
    {
      id: 3,
      img: "/assets/images/lab2.jpeg",
      text: " Beneficiile lucrului în echipa medic - farmacist se reflectă în primul rând în evoluția terapeutică a pacienților. Colaborarea dintre specialiști fiind esențială, iar medicul fiind singurul ce poate recomanda un tratament, urmând ca farmacistul să îl prepare urmărind cu mare atenție indicația medicului.",
    },
    {
      id: 4,
      img: "/assets/images/product3.jpeg",
      text: "La IZIAPHARM respectăm cu strictețe recomandarea medicului specialist în prepararea unui tratament personalizat, ceea ce de fiecare dată duce la succesul terapeutic.",
    },
  ];

  return (
    <div className="about">
      <h1 className="about__heading">Despre Iziapharm</h1>

      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={setElementRef}
          data-index={index}
          className={`about__section ${index % 2 === 0 ? "odd" : "even"}`}
        >
          <div
            className={`about__section--content ${
              isVisible[index] ? "in" : ""
            } ${index % 2 === 0 ? "odd" : "even"}`}
          >
            {section.img && (
              <img
                className="about__section--content--img"
                src={section.img}
                alt=""
              />
            )}
            <p className="about__section--content--text">{section.text}</p>
          </div>
          <Pill className={`pill-icon ${isVisible[index] ? "in" : ""}`} />
        </div>
      ))}
    </div>
  );
}

export default About;
