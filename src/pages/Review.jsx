// import GoogleForm from "../components/GoogleForm";
import { useState } from "react";
// import StarRating from "../components/StarRating";
import { Leaf } from "@phosphor-icons/react";

function Review() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="review">
      <h1 className="review__heading">
        <span>Ai încercat un produs?</span>
        <span>Spune-ne cum ți s-a părut!</span>
      </h1>

      <p className="review__intro">
        La Iziapharm, credem cu tărie că succesul nostru se bazeaza pe
        satisfacția și încrederea pe care ni le acordați, și tocmai de aceea,
        părerea dumneavoastră este esențială pentru noi. Fie că este vorba
        despre o experiență pozitivă, o sugestie de îmbunătățire, sau chiar o
        provocare cu care v-ați confruntat în testarea produselor, fiecare voce
        este auzită.
      </p>

      <form className="review__form" onSubmit={handleSubmit}>
        <p className="review__form--text">
          <span>*</span>
          <span>- câmpuri obligatorii</span>
        </p>
        <label htmlFor="nume" className="review__form--label">
          Nume<span>*</span>
        </label>
        <input
          id="nume"
          type="text"
          className="review__form--input"
          autoComplete="true"
        />

        <label htmlFor="prenume" className="review__form--label">
          Prenume<span>*</span>
        </label>
        <input
          id="prenume"
          type="text"
          className="review__form--input"
          autoComplete="true"
        />

        <label htmlFor="email" className="review__form--label">
          Email<span>*</span>
        </label>
        <input
          id="email"
          type="email"
          className="review__form--input"
          autoComplete="true"
        />

        <label htmlFor="cod" className="review__form--label">
          Codul produsului<span>*</span>
        </label>
        <input id="cod" className="review__form--input" autoComplete="true" />

        <label htmlFor="numeProd" className="review__form--label">
          Numele produsului
        </label>
        <input
          id="numeProd"
          type="text"
          className="review__form--input"
          autoComplete="true"
        />

        <label htmlFor="feedback" className="review__form--label">
          Feedback-ul dumneavoastră
        </label>
        <textarea id="feedback" type="text" className="review__form--input" />

        <div className="review__submit">
          <button className="review__form--btn">Trimite Feedback</button>
          {isSubmitted && <Leaf className="review__leaf" />}
        </div>
      </form>
    </div>
  );
}

export default Review;
