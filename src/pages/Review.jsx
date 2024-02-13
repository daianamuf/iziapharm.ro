// import GoogleForm from "../components/GoogleForm";
import StarRating from "../components/StarRating";

function Review() {
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

      <form className="review__form">
        <p className="review__form--text">
          <span>*</span>
          <span>- câmpuri obligatorii</span>
        </p>
        <label htmlFor="nume" className="review__form--label">
          Nume<span>*</span>
        </label>
        <input name="nume" type="text" className="review__form--input" />

        <label htmlFor="prenume" className="review__form--label">
          Prenume<span>*</span>
        </label>
        <input name="prenume" type="text" className="review__form--input" />

        <label htmlFor="email" className="review__form--label">
          Email<span>*</span>
        </label>
        <input name="email" type="email" className="review__form--input" />

        <label htmlFor="cod" className="review__form--label">
          Codul produsului<span>*</span>
        </label>
        <input name="cod" className="review__form--input" />

        <label htmlFor="numeProd" className="review__form--label">
          Numele produsului
        </label>
        <input name="numeProd" type="text" className="review__form--input" />

        <label className="review__form--label">
          Acordați un calificativ<span>*</span>
        </label>
        <StarRating />

        <label htmlFor="numeProd" className="review__form--label">
          Feedback-ul dumneavoastră
        </label>
        <textarea name="numeProd" type="text" className="review__form--input" />

        <button className="review__form--btn">Trimite Feedback</button>
      </form>

      {/* <GoogleForm /> */}
    </div>
  );
}

export default Review;
